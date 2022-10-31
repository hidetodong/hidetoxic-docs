# Javascript 相关知识

## ES6 

### import 与 export

ES6中导入导出




#### 需要研究

```javascript

function importAll(r) {
	let modules = {}
	r.keys().forEach(key =
    > (modules[key] = r(key)))
	return modules
}
const modules = importAll(require.context("./", true, /\.js$/))

const api = Object.assign.apply(null, Object.values(modules))

export default api

```