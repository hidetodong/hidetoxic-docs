<template><div><h1 id="记录一些随便遇到的技巧" tabindex="-1"><a class="header-anchor" href="#记录一些随便遇到的技巧" aria-hidden="true">#</a> 记录一些随便遇到的技巧</h1>
<h2 id="立即执行函数" tabindex="-1"><a class="header-anchor" href="#立即执行函数" aria-hidden="true">#</a> 立即执行函数</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//TODO</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip">
<p class="custom-container-title">问：上面的；号作用是什么？</p>
<p>答：前端页面脚本压缩可减少脚本数量和脚本大小，为了避免压缩时前一个脚本没有写最后一个分号而导致压缩后脚本不能使用，所以要在开始加一个分号</p>
<p>增补原因：
(<img src="https://hidetoxic01.oss-cn-hangzhou.aliyuncs.com/docs/20210306172336.png" alt="原因">)</p>
</div>
<h2 id="filename-d-ts的作用" tabindex="-1"><a class="header-anchor" href="#filename-d-ts的作用" aria-hidden="true">#</a> [fileName].d.ts的作用</h2>
<div class="custom-container tip">
<p class="custom-container-title">问：为什么很多包都有.d.ts文件</p>
<p>答：用 ts 写的模块在发布的时候仍然是用 js 发布，这就导致一个问题：ts 那么多类型数据都没了，所以需要一个 d.ts 文件来标记某个 js 库里面对象的类型
然后 typings 就是一个网络上的 d.ts 数据库</p>
<p>定义了一些接口，使得你用typescript编程的时候调用此模块，IDE有提示</p>
</div>
<!-- 
## import 和 require
属于两种不同的模块引入规范 在webpack内不可混用 不然打包会报错
export 和  -->
<h2 id="vue中设置scrolltop无效" tabindex="-1"><a class="header-anchor" href="#vue中设置scrolltop无效" aria-hidden="true">#</a> vue中设置scrollTop无效</h2>
<p>可以使用</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code> <span class="token function">scrollToBottom</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">$nextTick</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token keyword">var</span> element <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>$el<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#scrollDiv'</span><span class="token punctuation">)</span>
          element<span class="token punctuation">.</span>scrollTop <span class="token operator">=</span> element<span class="token punctuation">.</span>scrollHeight
        <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">)</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于use-strict" tabindex="-1"><a class="header-anchor" href="#关于use-strict" aria-hidden="true">#</a> 关于use strict</h2>
<p>1.开启use strict后 禁止自定义函数的this指向window</p>
<h2 id="如何判断一个变量为数组-对象" tabindex="-1"><a class="header-anchor" href="#如何判断一个变量为数组-对象" aria-hidden="true">#</a> 如何判断一个变量为数组/对象</h2>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>1.（ES6） Array.isArray(var)</p>
<ol start="2">
<li>
<p>Object.prototype.toString.call(arr)</p>
</li>
<li>
<p>arr.constructor === Array</p>
</li>
</ol>
<h3 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h3>
<p>1.Object.prototype.toString.call(var)</p>
<p>2.obj.constructor === Object</p>
<h3 id="关于typeof-instanceof" tabindex="-1"><a class="header-anchor" href="#关于typeof-instanceof" aria-hidden="true">#</a> 关于typeof / instanceof</h3>
<div class="custom-container warning">
<p class="custom-container-title">非常不推荐使用</p>
<p>typeof / instanceof</p>
</div>
<p>利用typeof完全无法正确判断变量类型</p>
<p>1.null</p>
<p>2.{}</p>
<p>3.[]</p>
<p>最终都会被判断成object，区分·直接失效</p>
<h2 id="javascript中new做了什么操作" tabindex="-1"><a class="header-anchor" href="#javascript中new做了什么操作" aria-hidden="true">#</a> Javascript中new做了什么操作</h2>
<h2 id="javascript中-something-0-是什么" tabindex="-1"><a class="header-anchor" href="#javascript中-something-0-是什么" aria-hidden="true">#</a> Javascript中 something &gt;&gt;&gt; 0 是什么</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Operators_7c8eb9475d97a4a734c5991857698560#Unsigned_right_shift" target="_blank" rel="noopener noreferrer">MDN相关解释<ExternalLinkIcon/></a></p>
</div></template>


