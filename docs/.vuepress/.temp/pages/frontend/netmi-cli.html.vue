<template><div><h1 id="cli工具搭建实录——netmi-cli开发" tabindex="-1"><a class="header-anchor" href="#cli工具搭建实录——netmi-cli开发" aria-hidden="true">#</a> CLI工具搭建实录——NETMI-CLI开发</h1>
<h2 id="项目准备-与-启动" tabindex="-1"><a class="header-anchor" href="#项目准备-与-启动" aria-hidden="true">#</a> 项目准备 与 启动</h2>
<p>1.建立并进入项目文件夹<code v-pre>mkdir netmi-cli &amp;&amp; cd netmi-cli</code></p>
<p>2.初始化npm包 <code v-pre>npm init -y</code></p>
<p>3.建立文件夹结构</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── bin
│   └── netmi-cli.js // 入口文件
├── lib //功能封装和工具函数lib
├── node_modules
├── package-lock.json
└── package.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打印hello-world" tabindex="-1"><a class="header-anchor" href="#打印hello-world" aria-hidden="true">#</a> 打印Hello World</h3>
<p>在<code v-pre>/bin/netmi-cli.js</code>的第一行指定命令行执行环境,然后直接打印</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token hashbang comment">#! /usr/bin/env node</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时可以命令行内使用<code v-pre>node ./bin/netmi-cli.js</code>执行这个脚本</p>
<h3 id="创建自定义命令行指令" tabindex="-1"><a class="header-anchor" href="#创建自定义命令行指令" aria-hidden="true">#</a> 创建自定义命令行指令</h3>
<p>每次使用<code v-pre>node ./bin/netmi-cli.js</code>很不方便，路径改变也会直接失效，所以可以在<code v-pre>package.json</code>中创建如下字段</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    ...
    <span class="token property">"bin"</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token property">"netmi-cli"</span><span class="token operator">:</span><span class="token string">"./bin/netmi-cli.js"</span>
    <span class="token punctuation">}</span>
    ...
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并使用<code v-pre>npm link</code>在全局创建链接，使自定义命令生效</p>
<p>现在就可以使用在命令行中使用<code v-pre>netmi-cli</code>了</p>
<h3 id="引入commander" tabindex="-1"><a class="header-anchor" href="#引入commander" aria-hidden="true">#</a> 引入commander</h3>
<p>为了更方便的组织指令以及选项，现在引入commander插件</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span>Command<span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'commander'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> program <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Command</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

program
    <span class="token punctuation">.</span><span class="token function">command</span><span class="token punctuation">(</span><span class="token string">'init &lt;project>'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">description</span><span class="token punctuation">(</span><span class="token string">'Init new project'</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">action</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">project</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体的API在<a href="#%E5%BC%95%E7%94%A8npm%E5%8C%85%E8%AF%A6%E8%A7%A3">## 引用npm包详解</a>中的文档</p>
<h3 id="第一次发布到npm" tabindex="-1"><a class="header-anchor" href="#第一次发布到npm" aria-hidden="true">#</a> 第一次发布到NPM</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm adduser
npm login
npm publish
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于npm的配置在此不赘述，google即可。</p>
<p>注意在发布前，配置好我们的版本号。</p>
<p>在<code v-pre>./bin/netmi-cli.js</code>中增加获取版本的代码</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>program<span class="token punctuation">.</span><span class="token function">version</span><span class="token punctuation">(</span><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'../package.json'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>version<span class="token punctuation">,</span><span class="token string">'-v,--version'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>直接使用<code v-pre>package.json</code>中的版本号作为我们命令行工具的版本，第二个参数将在命令行中增加两个选项用于获取版本</p>
<h2 id="开发功能" tabindex="-1"><a class="header-anchor" href="#开发功能" aria-hidden="true">#</a> 开发功能</h2>
<p>现在可以正式开始开发命令行功能了</p>
<h3 id="init命令" tabindex="-1"><a class="header-anchor" href="#init命令" aria-hidden="true">#</a> init命令</h3>
<p>第一个要实现的功能就是初始化命令<code v-pre>netmi-cli init</code></p>
<h2 id="netmi-cli-功能开发计划-roadmap" tabindex="-1"><a class="header-anchor" href="#netmi-cli-功能开发计划-roadmap" aria-hidden="true">#</a> NETMI-CLI 功能开发计划 / Roadmap</h2>
<h3 id="init" tabindex="-1"><a class="header-anchor" href="#init" aria-hidden="true">#</a> init</h3>
<p>我希望通过这个指令实现NETMI约定下前端VUE项目的初始化</p>
<p>包括</p>
<ul>
<li>客制化的项目结构同步</li>
<li>参数的初始化填充</li>
<li>基于json的项目模块自动引入*</li>
</ul>
<h3 id="待更新" tabindex="-1"><a class="header-anchor" href="#待更新" aria-hidden="true">#</a> 待更新</h3>
<h2 id="引用npm包详解" tabindex="-1"><a class="header-anchor" href="#引用npm包详解" aria-hidden="true">#</a> 引用npm包详解</h2>
<table>
<thead>
<tr>
<th>包名</th>
<th>用途</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>chalk</td>
<td>用于在命令行打印彩色输出</td>
<td></td>
</tr>
<tr>
<td>clear</td>
<td>用于清空命令行输出</td>
<td></td>
</tr>
<tr>
<td>commander</td>
<td>用于创建格式化的命令行</td>
<td><a href="https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>download-git-repo</td>
<td>用于下载git仓库中的文件</td>
<td></td>
</tr>
<tr>
<td>figlet</td>
<td>用于将输出的文字变成字符画</td>
<td></td>
</tr>
<tr>
<td>ora</td>
<td>用于在命令行前提示命令状态</td>
<td></td>
</tr>
</tbody>
</table>
</div></template>


