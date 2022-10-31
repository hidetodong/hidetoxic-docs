# CLI工具搭建实录——NETMI-CLI开发

## 项目准备 与 启动
1.建立并进入项目文件夹```mkdir netmi-cli && cd netmi-cli```

2.初始化npm包 ```npm init -y```

3.建立文件夹结构
```shell
.
├── bin
│   └── netmi-cli.js // 入口文件
├── lib //功能封装和工具函数lib
├── node_modules
├── package-lock.json
└── package.json
``` 

### 打印Hello World
在```/bin/netmi-cli.js```的第一行指定命令行执行环境,然后直接打印

```javascript
#! /usr/bin/env node

console.log('Hello World')
```

此时可以命令行内使用```node ./bin/netmi-cli.js```执行这个脚本

### 创建自定义命令行指令
每次使用```node ./bin/netmi-cli.js```很不方便，路径改变也会直接失效，所以可以在```package.json```中创建如下字段

```json
{
    ...
    "bin":{
        "netmi-cli":"./bin/netmi-cli.js"
    }
    ...
}

```

并使用```npm link```在全局创建链接，使自定义命令生效

现在就可以使用在命令行中使用```netmi-cli```了

### 引入commander
为了更方便的组织指令以及选项，现在引入commander插件

```javascript
const {Command} = require('commander')

const program = new Command()

program
    .command('init <project>')
    .description('Init new project')
    .action((project)=>{
        console.log('Hello World')
    })
```

具体的API在[## 引用npm包详解](#引用npm包详解)中的文档

### 第一次发布到NPM

```javascript
npm adduser
npm login
npm publish
```
关于npm的配置在此不赘述，google即可。

注意在发布前，配置好我们的版本号。

在```./bin/netmi-cli.js```中增加获取版本的代码

```javascript
program.version(require('../package.json').version,'-v,--version')
```

直接使用```package.json```中的版本号作为我们命令行工具的版本，第二个参数将在命令行中增加两个选项用于获取版本

## 开发功能

现在可以正式开始开发命令行功能了
### init命令

第一个要实现的功能就是初始化命令```netmi-cli init```



## NETMI-CLI 功能开发计划 / Roadmap

### init 

我希望通过这个指令实现NETMI约定下前端VUE项目的初始化

包括

- 客制化的项目结构同步
- 参数的初始化填充
- 基于json的项目模块自动引入*

### 待更新

## 引用npm包详解

| 包名              | 用途                       | 备注 |
| ----------------- | -------------------------- | ---- |
| chalk             | 用于在命令行打印彩色输出   |      |
| clear             | 用于清空命令行输出         |      |
| commander         | 用于创建格式化的命令行     | [文档](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)     |
| download-git-repo | 用于下载git仓库中的文件    |      |
| figlet            | 用于将输出的文字变成字符画 |      |
| ora               | 用于在命令行前提示命令状态 |      |
