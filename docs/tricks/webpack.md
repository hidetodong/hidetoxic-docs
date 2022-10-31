# Webpack 使用记录


## NPM包

- webpack
- webpack-cli


## 配置文件

### entry

#### 单入口 
```json

{
    entry:'./index.js'
}

```

#### 多入口

```json
{
    entry:{
        index:'./index.js',
        index2:'./index2.js'
    }
}
```
## output


## loader

### babel-loader

将ES6及以上语法转译为ES6以下
```javascript
module:{
    rules:[
        {
            test:/.js$/,
            use:['babel-loader']
        }
    ]
}
```

### css-loader / style-loader

webpack的loader中的use遵循从右到左 链式调用的原则

所以要将```css-loader```写在右边，先导入css文件进行处理后，交给```style-loader```在页面中插入```<style>```

```javascript
module:{
    rules:[{
        test:/.css$/,
        use:['style-loader','css-loader']
    }]
}
```

#### 预编译器 Less Sass 等

1.引入对应的包 less或sass
2.引入loader less-loader 

```javascript
module:{
    rules:[{
        test:/.(css|less)$/,
        use:['style-loader','css-loader','less-loader']
    }]
}
```
### url-loader / file-loader

url-loader对未设置或者小于limit设置的图片进行转换，以base64的格式被img的src所使用；而对于大于limit byte的图片用file-loader进行解析。






## watch

默认false，开启后可以监听文件修改

可以设置```watchOptions```


## 文件hash

### Hash

与整个项目的构建有关，只要项目文件有修改，整个项目的hash就会改变

### Chunkhash

和webpack打包的chunk有关，不同功能的entry会生成不同的chunkhash

### Contenthash

根据文件内容来定义hash，文件内容不变，则contenthash不变




## treeshaking

使用UglifyJsPlugin，可以将代码uglify，实现treeshaking