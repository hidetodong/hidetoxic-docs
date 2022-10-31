# Husky5 + lint-staged 推进项目代码规范


## 老版本升级

husky4 => husky5

:::tip v4 v5配置区别
因为 v5 之前的版本，husky 也会在 .git/hooks 内安装钩子，这样就会导致 husky 安装的钩子把 yorkie 的钩子覆盖掉，最终运行了 husky 的钩子配置。

v5 版本的一个特性就是不在安装钩子，取而代之的是在根目录创建 .husky 文件夹，并在内部进行钩子的按需配置。可以理解为自己圈了一个地方不跟你抢 .git/hooks 了，这样在按照原来项目的配置在 package.json 内写 husky 字段，自然而然就不会再生效了。

所以记得 husky 配置已经变了，要么手动指定 4.3.8 老版本，并且继续使用老版本配置字段，要么就使用全新的配置方式来进行配置。
:::
## husky安装

```javascript
npm install -D husky
npm install -D lint-staged
```

``````