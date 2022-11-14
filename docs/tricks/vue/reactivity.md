# 响应式原理

## 核心思想

通过`proxy`来代理原本的对象，拦截对象的`get`和`set`方法，并且在取值时收集`effect`函数，当修改值触发`effect`时重新执行，除此以外的操作都是在此基础上进行的拓展。

### 0.Object.defineProperty

#### 0.1 直接添加属性

```javascript
const obj = {
  name: "hide",
};

console.log(obj); // { name:'hide' }
/** 在对象上定义属性 */
Object.defineProperty(obj, "p1", {
  value: 3, // 定义的值
  writable: true, // 是否可被修改
  configurable: true, // 是否可被配置
  enumerable: true, // 是否可被枚举
});

console.log(obj); // { name:'hide', p1: 3 }
```

#### 0.2 使用 getter/setter 添加属性

```javascript
const obj = {
  name: "hide",
};
console.log(obj); // { name:'hide' }
/** 在对象上定义属性 */
Object.defineProperty(obj, "p1", {
  get() {
    return 3;
  },
  set(v) {},
});
console.log(obj); // { name:'hide' }
```

使用 getter/setter 设置的属性并不会直接展示，而是需要在访问或者修改属性值的时候才会出现

```javascript
console.log(obj.p1); // 3
```

#### 0.3 使用 Object.defineProperty 有什么问题？

当定义的值不为简单属性时，没有办法直接直接对深层对象触发监听，必须要进入下一层

```javascript
const obj = { name: "hide" }; // 假设date是作为某个参数传递进来的(因此我们不能直接在date字面量中使用getter与setter)
const date = { value: 25 };

Object.defineProperty(obj, "age", {
  get() {
    console.log("obj.age被访问了");
    return date;
  },
  set(v) {
    console.log(`obj.age被修改了，要想修改的值为：${v}`);
  },
});
```

此时如果访问`obj.age.value`则无法触发`obj.age`的监听，必须再次对`obj.age`执行 Object.defineProperty。这也是 Vue2 中不直接处理数组的监听的原因，会比较消耗性能

```javascript
Object.defineProperty(obj.age,'xxx',{
 ...
})
```

### 1.Proxy 和 Reflect

#### 1.1 Proxy

> **Proxy**  对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。--- MDN

语法

```javascript
/**
 target:源对象
 handler:捕获器
*/
const p = new Proxy(target, {
  /** 
  target: 被代理的目标
  property: 被获取的属性
  value: 获取的属性的值
  receiver: Proxy或者继承Proxy的对象
 */
  get(target, property, receiver) {
    return target[property];
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});
```

Proxy 用于给源对象设置一层代理，所有通过代理对象发起的操作都会被捕获器`handler`捕获，将操作行为映射到源对象上，【局限】**直接操作源对象是不会触发 Proxy 的捕获的**。

> 此外
> 1.Proxy 也可以对数组、函数进行代理，handler 写法略有不同但总体相似。 2.可以对代理创建代理

Proxy 存在的问题，源对象如果依赖 this 作为标志，则返回的结果不一样，proxy 会返回 proxy 对
象。所以在访问一些依赖 this 的属性或方法时，可能出现错误

```javascript
const obj = {
  a: 1,
  b: 2,
  c() {
    return this;
  },
};
const proxy = new Proxy(obj, {});
console.log(obj.c()); // { a:1,b:2,c:f() }
// @TODO 待考证
// 浏览器环境
console.log(proxy.c()); // Proxy({ a:1,b:2,c:f() })
// node环境
console.log(proxy.c()); // { a:1,b:2,c:f() }
```

#### 1.2 Reflect

`Proxy`可以捕获 13 种不同的操作，而每种操作都会有一个所对应的`ReflectApi`，这就使`Proxy`对象可以方便的调用对应的`Reflect`方法来完成默认行为。

#### 1.3 Proxy 结合 Reflect

```javascript
/**
 target:源对象
 handler:捕获器
*/
const p = new Proxy(target, {
  /** 
  target: 被代理的目标
  property: 被获取的属性
  value: 获取的属性的值
  receiver: Proxy或者继承Proxy的对象
 */
  get(target, property, receiver) {
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    return Reflect.set(target, property, value, receiver);
  },
});
```

一般会通过这样的方式来结合使用，保证 proxy 操作的是源对象。

### 2. 副作用函数和响应式数据

#### 2.1 副作用函数

副作用函数就是会产生副作用的函数

```javascript
function effect() {
  document.body.innerText = "hello world";
}
```

这个函数中会去设置`document.body.innerText`，但是除了`effect`函数之外，在文档的另外地方，任何的操作都可能修改到这个值，所以`effect`函数的执行其实会**直接或间接的影响到其他函数的执行**，这就叫做副作用。

#### 2.2 响应式数据

```javascript
const obj = { text: "123" };

function effect() {
  document.body.innerText = obj.text;
}
```

如果在`obj.text`被修改时，`effect`函数自动执行，那么`obj`就是一个响应式数据

#### 2.3 实现简单响应式数据

实现一个最简单的响应式数据

```javascript
// 初始化对象
let document = "start";
const origin = {
  text: "a",
};

// 初始化一个依赖函数收集的桶，目前暂时是set
const bucket = new Set();

// 通过proxy代理源对象
const proxy = new Proxy(origin, {
  get(target, key, receiver) {
    console.log(`访问了${key}`);
    // 在访问值时触发依赖收集
    bucket.add(effect);
    return target[key];
  },
  set(target, key, newVal, receiver) {
    target[key] = newVal;
    // 设置值之后触发已经收集的依赖函数
    bucket.forEach((fn) => {
      fn();
    });
    return true;
  },
});

// 副作用函数，通过proxy.a的值操作document的值
function effect() {
  console.log("执行effect");
  document = proxy.a;
}

// 先执行一次effect，触发proxy的依赖收集机制
effect();
// 一秒通过
setTimeout(() => {
  proxy.a = 1000;
  console.log(document);
}, 1000);

// ‘执行effect’
// ’访问了text‘
// '执行effect'
// ’访问了text‘
// 1000
```

通过代理源对象`origin`,在代理对象`proxy`上添加捕获器，在`get`执行时，收集副作用函数`effect`，并在`set`执行，这样就可以实现在`proxy.text`重新赋值时触发 effect 函数，从而改变 document 的值。

#### 2.4 添加 activeEffect 用于接收函数

改写`effect`，增加`activeEffect`用于接受当前函数，可以是具名或者时匿名的（其实就是一个函数的指针）

```javascript
// 用于存放当前需要收集的effect函数

let activeEffect;
const bucket = new Set();
const proxy = new Proxy(origin, {
  get(target, key, receiver) {
    console.log(`访问了${key}`);
    bucket.add(activeEffect);
    return target[key];
  },

  set(target, key, newVal, receiver) {
    target[key] = newVal;
    bucket.forEach((fn) => {
      fn();
    });
    return true;
  },
});

function effect(fn) {
  // 将当前的激活effect设置为fn
  activeEffect = fn;
  // 执行一次fn触发依赖收集
  fn();
}

effect(() => {
  document = proxy.a;
});
```

#### 2.5 针对对象的 key 做收集

目前的系统里，因为`bucket`是 set 的缘故，无法在依赖触发时将粒度细化到具体属性，`proxy.a`被收集时，设置`proxy.b`也会触发依赖，所以要对`bucket`的结构进行修改

```javascript
// 用于存放当前需要收集的effect函数

let activeEffect;

const bucket = new WeakMap(); // 用WeakMap方便gc

const proxy = new Proxy(origin, {
  get(target, key, receiver) {
    let depsMap = bucket.get(target); // 先在总bucket中获取当前访问target的依赖map

    if (!depsMap) {
      // 如果没有map 说明当前对象没有被收集过，就创建一个新的map

      bucket.set(target, (depsMap = new Map()));
    }

    let deps = depsMap.get(key); // 针对key维度做依赖收集

    if (!deps) {
      depsMap.set(key, (deps = new Set()));
    }

    deps.add(activeEffect);

    return target[key];
  },

  set(target, key, newVal, receiver) {
    target[key] = newVal;

    const depsMap = bucket.get(target); // 从桶中获取当前target的依赖集合

    if (!depsMap) return; // 没依赖就不触发了

    const effects = depsMap.get(key);

    effects &&
      effects.forEach((effect) => {
        effect();
      });

    return true;
  },
});
```

#### 2.6 拆分函数track/trigger

```javascript
const proxy = new Proxy(origin, {
    get(target, key, receiver) {

        track(target,key)
        
        return target[key]
    },
    set(target, key, newVal, receiver) {
        target[key] = newVal

        trigger(target,key)

        return true
    }
})

function track(target, key) {
    let depsMap = bucket.get(target) // 先在总bucket中获取当前访问target的依赖map
    if (!depsMap) { // 如果没有map 说明当前对象没有被收集过，就创建一个新的map
        bucket.set(target, (depsMap = new Map()))
    }

    let deps = depsMap.get(key) // 针对key维度做依赖收集
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
}

function trigger(target,key){
    const depsMap = bucket.get(target) // 从桶中获取当前target的依赖集合
        if (!depsMap) return // 没依赖就不触发了

        const effects = depsMap.get(key)

        effects && effects.forEach((effect) => {
            effect()
        })
}
```

将依赖收集和依赖触发的函数拆成两个，方便维护。

#### 2.7 副作用清理

```javascript
/** 收集副作用函数依赖 */
function track(target, key) {
    let depsMap = bucket.get(target) // 先在总bucket中获取当前访问target的依赖map
    if (!depsMap) { // 如果没有map 说明当前对象没有被收集过，就创建一个新的map
        bucket.set(target, (depsMap = new Map()))
    }

    let deps = depsMap.get(key) // 针对key维度做依赖收集
    if (!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    // 在依赖中添加当前的副作用函数
    deps.add(activeEffect)
    // 在当前的副作用函数的依赖关系中添加 当前target[key] 已经存在的依赖关系
    // 之后在cleanEffect函数中可以通过这个关系去反向删除对应target[key]的响应依赖
    activeEffect.deps.push(deps)
}
/** 触发副作用函数 */
function trigger(target,key){
    const depsMap = bucket.get(target) // 从桶中获取当前target的依赖集合
        if (!depsMap) return // 没依赖就不触发了

        const effects = depsMap.get(key)

        effects && effects.forEach((effect) => {
            effect()
        })
}
/** 清理副作用函数 */
function cleanEffect(effectFn){
    for(let i=0;i<effectFn.deps.length;i++){
        // deps 是依赖集合
        const deps = effectFn.deps[i]
        // 删除effectFn
        deps.delete(effectFn)
    }
    // 重置deps数组
    effectFn.deps.length = 0
}

function effect(fn) {
    // 包装副作用函数
    const effectFn = () => {
        // 将当前的激活effect设置为fn
        activeEffect = effectFn
        // 执行一次fn触发依赖收集
        fn()
    }
    // 初始化副作用函数的依赖
    effectFn.deps = []
    // 初次执行副作用函数
    effectFn()
}
```

在副作用函数执行前，先通过它的依赖集合把他自己删除，执行后，```proxy```中的```get```会自动将最新的依赖自动收集回来。
此处有一个问题，在```trigger```执行时，我们对当前```target[key]```的依赖Set，实际上在遍历的时候会边删边加，这就导致副作用函数会无限触发，所以需要使用另一个Set做实际运行

```javascript
/** 触发副作用函数 */
function trigger(target,key){
    const depsMap = bucket.get(target) // 从桶中获取当前target的依赖集合
        if (!depsMap) {
   return
  } // 没依赖就不触发了

        const effects = depsMap.get(key)

    const effectToRun = new Set(effects)

        effectToRun && effectToRun.forEach((effectFn) => {
            effectFn()
        })
}
```

#### 2.8 如何解决effect嵌套执行的问题？解决自我执行时无限递归问题

##### 2.8.1 嵌套执行

```javascript
import { reactive ,effect} from "./index.js";

let document = '123123'
let document2 = '12312'

const obj = reactive({
    text:'1',
    ok:true
})

effect(()=>{
    console.log('effect1触发')
    effect(()=>{
        console.log('effect2触发')
        document2 = obj.ok
    })
    document = obj.text
})

obj.text = 100
// effect1触发
// effect2触发
// effect2触发 
```

理想中执行顺序应该是在```obj.text```被赋值后，先触发```effect1```再触发```effect2```，但是实际上由于没有操作activeEffect，所以当前激活的effect函数被锁死在了2上。
所以需要在effectFn执行时把它压入执行栈中。

```javascript
let effectStack = []
// 重写effect函数
export function effect(fn) {
    // 包装副作用函数
    const effectFn = () => {
        cleanEffect(effectFn)
        // 将当前的激活effect设置为fn
        activeEffect = effectFn
        // 把当前函数入栈
        effectStack.push(effectFn)
        // 执行一次fn触发依赖收集
        fn()
        // 执行完就出栈
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]// 把激活的effect函数重置到上一层
    }
    // 初始化副作用函数的依赖
    effectFn.deps = []
    // 初次执行副作用函数
    effectFn()
}
```

##### 2.8.2 递归

```javascript
const obj = reactive({a:1})
effect(()=>{
 obj.a = obj.a + 1
})
```

当这样既触发```get```又触发```set```时，就会在还没执行完effect函数时又开始执行自己，导致递归。

```javascript

/** 触发副作用函数 */
export function trigger(target,key){
    const depsMap = bucket.get(target) // 从桶中获取当前target的依赖集合
        if (!depsMap) return // 没依赖就不触发了

        const effects = depsMap.get(key)

        const effectToRun = new Set(effects)

        effects && effects.forEach((effectFn)=>{
            if(effectFn !== activeEffect){
                effectToRun.add(effectFn)
            }
        })

        effectToRun && effectToRun.forEach((effectFn) => {
            effectFn()
        })
}
```

修改trigger函数，去除当前在执行的函数

#### 2.9 调度器

给effect函数增加参数

```javascript

/** 副作用函数 */
export function effect(fn,option = {}) {
    // 包装副作用函数
    const effectFn = () => {
        cleanEffect(effectFn)
        // 将当前的激活effect设置为fn
        activeEffect = effectFn
        // 把当前函数入栈
        effectStack.push(effectFn)
        // 执行一次fn触发依赖收集
        fn()
        // 执行完就出栈
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]// 把激活的effect函数重置到上一层
    }
    // 把多余的参数挂载到effectFn上
    effectFn.option = option
    // 初始化副作用函数的依赖
    effectFn.deps = []
    // 初次执行副作用函数
    effectFn()
}

/** 触发副作用函数 */
export function trigger(target,key){
    const depsMap = bucket.get(target) // 从桶中获取当前target的依赖集合
        if (!depsMap) return // 没依赖就不触发了

        const effects = depsMap.get(key)

        const effectToRun = new Set(effects)

        effects && effects.forEach((effectFn)=>{
            if(effectFn !== activeEffect){
                effectToRun.add(effectFn)
            }
        })

        effectToRun && effectToRun.forEach((effectFn) => {
            if(effectFn.option.scheduler){
                effectFn.option.scheduler(effectFn)
            }else{
                effectFn()
            }
        })
}

```

通过判断是否有```scheduler```来决定是否通过scheduler执行


#### 2.10 lazy

```javascript
/** 副作用函数 */

export function effect(fn, option = {}) {

// 包装副作用函数

const effectFn = () => {

cleanEffect(effectFn);

// 将当前的激活effect设置为fn

activeEffect = effectFn;

// 把当前函数入栈

effectStack.push(effectFn);

// 执行一次fn触发依赖收集

const res = fn();

// 执行完就出栈

effectStack.pop();

activeEffect = effectStack[effectStack.length - 1]; // 把激活的effect函数重置到上一层

  

// 返回fn函数的返回值

return res;

};

// 把多余的参数挂载到effectFn上

effectFn.option = option;

// 初始化副作用函数的依赖

effectFn.deps = [];

// 增加lazy属性用于表示副作用函数是否立即执行

if (!option.lazy) {

// 初次执行副作用函数

effectFn();

}

  

// 将副作用函数返回出去以供调用

return effectFn;

}
```

增加lazy属性可以控制副作用函数是否即刻执行，返回副作用函数本身，可以让用户控制什么时候执行。

#### 2.11 computed实现
```javascript
export function computed(getter) {

let value; // 用来缓存计算值

let dirty; // 用来标志是否需要重新计算

const effectFn = effect(getter,

{

lazy: true,

scheduler(){

dirty = true // 在scheduler内把dirty设为true

}

}

);

  

return {

get value() {

value = effectFn();

dirty = false;

return value;

},

};

}
```
value用来缓存计算值
dirty用来标志是否需要重新计算
scheduler函数执行，说明原先的依赖值触发了 trigger，值改变需要重新计算
这样就实现了computed的缓存

但computed嵌套在effect函数内时，有一个问题，就是外层的effect函数并不会被内部的effect收集。
所以需要手动进行track和trigger

```javascript
export function computed(getter) {

let value; // 用来缓存计算值

let dirty; // 用来标志是否需要重新计算

const effectFn = effect(getter,

{

lazy: true,

scheduler(){

if(!dirty){

dirty = true // 在scheduler内把dirty设为true

trigger(obj,'value') // 手动触发更新

}

}

}

);

let obj = {

get value() {

value = effectFn();

dirty = false;

track(obj,'value') // 手动触发收集

return value;

},

};

  

return obj

}
```



