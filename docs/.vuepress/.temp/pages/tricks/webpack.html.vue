<template><div><h1 id="webpack-使用记录" tabindex="-1"><a class="header-anchor" href="#webpack-使用记录" aria-hidden="true">#</a> Webpack 使用记录</h1>
<h2 id="npm包" tabindex="-1"><a class="header-anchor" href="#npm包" aria-hidden="true">#</a> NPM包</h2>
<ul>
<li>webpack</li>
<li>webpack-cli</li>
</ul>
<h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2>
<h3 id="entry" tabindex="-1"><a class="header-anchor" href="#entry" aria-hidden="true">#</a> entry</h3>
<h4 id="单入口" tabindex="-1"><a class="header-anchor" href="#单入口" aria-hidden="true">#</a> 单入口</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>
<span class="token punctuation">{</span>
    entry<span class="token operator">:</span>'./index.js'
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="多入口" tabindex="-1"><a class="header-anchor" href="#多入口" aria-hidden="true">#</a> 多入口</h4>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    entry<span class="token operator">:</span><span class="token punctuation">{</span>
        index<span class="token operator">:</span>'./index.js'<span class="token punctuation">,</span>
        index2<span class="token operator">:</span>'./index2.js'
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> output</h2>
<h2 id="loader" tabindex="-1"><a class="header-anchor" href="#loader" aria-hidden="true">#</a> loader</h2>
<h3 id="babel-loader" tabindex="-1"><a class="header-anchor" href="#babel-loader" aria-hidden="true">#</a> babel-loader</h3>
<p>将ES6及以上语法转译为ES6以下</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
            <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'babel-loader'</span><span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css-loader-style-loader" tabindex="-1"><a class="header-anchor" href="#css-loader-style-loader" aria-hidden="true">#</a> css-loader / style-loader</h3>
<p>webpack的loader中的use遵循从右到左 链式调用的原则</p>
<p>所以要将<code v-pre>css-loader</code>写在右边，先导入css文件进行处理后，交给<code v-pre>style-loader</code>在页面中插入<code v-pre>&lt;style&gt;</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.css$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'style-loader'</span><span class="token punctuation">,</span><span class="token string">'css-loader'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="预编译器-less-sass-等" tabindex="-1"><a class="header-anchor" href="#预编译器-less-sass-等" aria-hidden="true">#</a> 预编译器 Less Sass 等</h4>
<p>1.引入对应的包 less或sass
2.引入loader less-loader</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span>
    <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">{</span>
        <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">.(css|less)$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
        <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">'style-loader'</span><span class="token punctuation">,</span><span class="token string">'css-loader'</span><span class="token punctuation">,</span><span class="token string">'less-loader'</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="url-loader-file-loader" tabindex="-1"><a class="header-anchor" href="#url-loader-file-loader" aria-hidden="true">#</a> url-loader / file-loader</h3>
<p>url-loader对未设置或者小于limit设置的图片进行转换，以base64的格式被img的src所使用；而对于大于limit byte的图片用file-loader进行解析。</p>
<h2 id="watch" tabindex="-1"><a class="header-anchor" href="#watch" aria-hidden="true">#</a> watch</h2>
<p>默认false，开启后可以监听文件修改</p>
<p>可以设置<code v-pre>watchOptions</code></p>
<h2 id="文件hash" tabindex="-1"><a class="header-anchor" href="#文件hash" aria-hidden="true">#</a> 文件hash</h2>
<h3 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h3>
<p>与整个项目的构建有关，只要项目文件有修改，整个项目的hash就会改变</p>
<h3 id="chunkhash" tabindex="-1"><a class="header-anchor" href="#chunkhash" aria-hidden="true">#</a> Chunkhash</h3>
<p>和webpack打包的chunk有关，不同功能的entry会生成不同的chunkhash</p>
<h3 id="contenthash" tabindex="-1"><a class="header-anchor" href="#contenthash" aria-hidden="true">#</a> Contenthash</h3>
<p>根据文件内容来定义hash，文件内容不变，则contenthash不变</p>
<h2 id="treeshaking" tabindex="-1"><a class="header-anchor" href="#treeshaking" aria-hidden="true">#</a> treeshaking</h2>
<p>使用UglifyJsPlugin，可以将代码uglify，实现treeshaking</p>
</div></template>


