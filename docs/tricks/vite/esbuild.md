# 关于Esbuild

## 为什么Esbuild性能高的离谱？
1. 使用Golang开发
 > Javascript:  源代码 => 字节码 => 机器码
 > Golang:   源代码 => 机器码
 
少一步转换

2. 多核参与，得益于Go的多线程共享内存模型
3. 构建始末共享同一份AST数据，避免重复解析带来的性能开销

## 使用

### Build API

#### build
```javascript
const { build, buildSync, serve } = require("esbuild");

async function runBuild() {
	// 异步方法，返回一个 Promise
	const result = await build({
		// ---- 如下是一些常见的配置 ---
		// 当前项目根目录
		absWorkingDir: process.cwd(),
		// 入口文件列表，为一个数组
		entryPoints: ["./src/index.jsx"],
		// 打包产物目录
		outdir: "dist",
		// 是否需要打包，一般设为 true
		bundle: true,
		// 模块格式，包括`esm`、`commonjs`和`iife`
		format: "esm",
		// 需要排除打包的依赖列表
		external: [],
		// 是否开启自动拆包
		splitting: true,
		// 是否生成 SourceMap 文件
		sourcemap: true,
		// 是否生成打包的信息文件
		metafile: true,
		// 是否进行代码压缩
		minify: false,
		// 是否开启 watch 模式，在 watch 模式下代码变动则会触发重新打包
		watch: false,
		// 是否将产物写入磁盘
		write: true,
		// Esbuild 内置了一系列的 loader，包括 base64、binary、css、dataurl、file、js(x)、ts(x)、text、json
		// 针对一些特殊的文件，调用不同的 loader 进行加载
		loader: {
			".png": "base64",
		},
	});
	console.log(result);
}

```
#### buildSync

build的同步方法，不是很推荐使用，同步的方法丧失了并发的优势，也让插件开发失去了一部分灵活度

#### serve

一个比nodejs性能更好的静态文件服务，文件放在内存中，请求到来时重新构建

### Transform API
#### transform
```javascript
function runBuild() {
	serve(
		{
			port: 8000,
			// 静态资源目录
			servedir: "./dist",
		},
		{
			absWorkingDir: process.cwd(),
			entryPoints: ["./src/index.jsx"],
			bundle: true,
			format: "esm",
			splitting: true,
			sourcemap: true,
			ignoreAnnotations: true,
			metafile: true,
		}
	).then((server) => {
		console.log("HTTP Server starts at port", server.port);
	});
}
```
#### transformSync
transform的同步api


### Esbuild 插件开发