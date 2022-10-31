<template><div><h1 id="javascript知识点整理" tabindex="-1"><a class="header-anchor" href="#javascript知识点整理" aria-hidden="true">#</a> Javascript知识点整理</h1>
<h2 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h2>
<h3 id="变量类型" tabindex="-1"><a class="header-anchor" href="#变量类型" aria-hidden="true">#</a> 变量类型</h3>
<p>原始类型</p>
<ul>
<li>String</li>
<li>Number</li>
<li>Null</li>
<li>Undefined</li>
<li>Symbol</li>
<li>Boolean</li>
</ul>
<p>引用类型</p>
<ul>
<li>Object</li>
<li>Array</li>
<li>Function</li>
<li>Date</li>
<li>RegExp</li>
</ul>
<h3 id="变量特点" tabindex="-1"><a class="header-anchor" href="#变量特点" aria-hidden="true">#</a> 变量特点</h3>
<h4 id="null和undefined" tabindex="-1"><a class="header-anchor" href="#null和undefined" aria-hidden="true">#</a> Null和Undefined</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">typeof</span> <span class="token keyword">null</span>  <span class="token comment">// object</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这实际上是 JavaScript 最初实现中的一个错误，然后被 ECMAScript 沿用了。现在，null 被认为是对象的占位符，从而解释了这一矛盾，但从技术上来说，它仍然是原始值。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">undefined</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token comment">// true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>undefined 是声明了变量但未对其初始化时赋予该变量的值</p>
<p>null 则用于表示尚未存在的对象</p>
<h2 id="iife" tabindex="-1"><a class="header-anchor" href="#iife" aria-hidden="true">#</a> IIFE</h2>
<h3 id="iife定义" tabindex="-1"><a class="header-anchor" href="#iife定义" aria-hidden="true">#</a> IIFE定义</h3>
<p>Immediately-Invoked Function Expression / 立即调用表达式</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="iife细节" tabindex="-1"><a class="header-anchor" href="#iife细节" aria-hidden="true">#</a> IIFE细节</h3>
<p>1.IIFE的函数只会执行一次，且无法再次调用
2.可以使用IIFE的函数作用域来防止局部变量泄漏造成的全局变量污染</p>
<h3 id="为什么iife这么定义" tabindex="-1"><a class="header-anchor" href="#为什么iife这么定义" aria-hidden="true">#</a> 为什么IIFE这么定义</h3>
<p>会被认为是没有名称的函数声明 不符合函数声明的语法规则</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以在此基础上加一对括号</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即IIFE的FE部分</p>
<p>这样js的解析器就会认为括号内的是一个函数表达式，而函数表达式不用命名，所以这就成为了一段符合规则的js代码</p>
<p>这样只是成功定义了一个函数，如果要直接执行他，则应该</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">//...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>；

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>即IIFE的II部分</p>
<h3 id="iife的语法" tabindex="-1"><a class="header-anchor" href="#iife的语法" aria-hidden="true">#</a> IIFE的语法</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token punctuation">(</span><span class="token function">funciton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数后的括号在整体的括号内或括号外都可以</p>
<h3 id="为什么要在iife前加" tabindex="-1"><a class="header-anchor" href="#为什么要在iife前加" aria-hidden="true">#</a> 为什么要在IIFE前加 ;</h3>
<p>防止出现</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">b</span>
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这时解析器会认为<code v-pre>b</code>是<code v-pre>b()</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> b
<span class="token punctuation">;</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>加上<code v-pre>;</code>后则断绝了和前文的联系，这可以防止在打包时造成意料之外的副作用</p>
</div></template>


