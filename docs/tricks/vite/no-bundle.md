# 无打包 / No-bundle

## Vite中对待代码的策略

### 对业务代码：no-bundle

在开发时通过```import```ESM的方式直接请求源码

### 对第三方库：使用```esbuild```进行打包

#### 为什么需要预构建？
1. 并不是所有库都导出了ESM格式的文件
2. 有些库（比如lodash），递归依赖的文件很多，容易在dev时造成请求瀑布流（并发依赖）的情况，导致响应过慢。

#### 依赖预构建做了什么？
1. 将其他格式（UMD / CJS）转化为 ESM，让其可以在```<script type="module"></script>```正常加载
2. 将第三方库的代码打包到一起，减少HTTP请求数量，避免加载过慢

#### 构建后的文件在哪里？
 ```node_modules/.vite```文件夹下

#### 对于预构建产物的缓存策略？
Dev Server会设置```max-age=31536000```也就是一年的强缓存，直到以下部分改动：
1. ```package.json```中的```dependencies```
2.  ```*.lock```文件
3. ```optimizeDeps```配置

#### 如果不想使用本地缓存，怎么处理？
1. 删除```node_modules/.vite```
2. ```vite.config.ts``` 中设置```server.force```为true（3.x为中```optimizeDeps.force```）
3. ```npx vite --force``` / ```npx vite optimize```
- 
- 