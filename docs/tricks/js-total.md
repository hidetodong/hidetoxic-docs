# Javascript知识点整理

## 变量

### 变量类型

原始类型
- String
- Number
- Null
- Undefined
- Symbol
- Boolean

引用类型
- Object
- Array
- Function
- Date
- RegExp

### 变量特点

#### Null和Undefined

```javascript
typeof null  // object
```
这实际上是 JavaScript 最初实现中的一个错误，然后被 ECMAScript 沿用了。现在，null 被认为是对象的占位符，从而解释了这一矛盾，但从技术上来说，它仍然是原始值。

```javascript
undefined == null // true
```
undefined 是声明了变量但未对其初始化时赋予该变量的值

null 则用于表示尚未存在的对象




## IIFE 

### IIFE定义

Immediately-Invoked Function Expression / 立即调用表达式

```javascript

(function (){
  //...
})()

```
### IIFE细节

1.IIFE的函数只会执行一次，且无法再次调用
2.可以使用IIFE的函数作用域来防止局部变量泄漏造成的全局变量污染

### 为什么IIFE这么定义

会被认为是没有名称的函数声明 不符合函数声明的语法规则

```javascript
function () {
    
}

```

所以在此基础上加一对括号


```javascript
(function () {

})
```
即IIFE的FE部分

这样js的解析器就会认为括号内的是一个函数表达式，而函数表达式不用命名，所以这就成为了一段符合规则的js代码

这样只是成功定义了一个函数，如果要直接执行他，则应该

```javascript

(function (){
  //...
})()；

```

即IIFE的II部分

### IIFE的语法

```javascript
(function(){})()

(funciton(){} () )
```
函数后的括号在整体的括号内或括号外都可以

### 为什么要在IIFE前加 ;

防止出现

```javascript
var a = b
(function(){})
```
这时解析器会认为```b```是```b()```

```javascript
var a = b
;(function(){})
```
加上```;```后则断绝了和前文的联系，这可以防止在打包时造成意料之外的副作用


