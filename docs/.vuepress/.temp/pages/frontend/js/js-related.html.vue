<template><div><h1 id="javascript-相关知识" tabindex="-1"><a class="header-anchor" href="#javascript-相关知识" aria-hidden="true">#</a> Javascript 相关知识</h1>
<h2 id="es6" tabindex="-1"><a class="header-anchor" href="#es6" aria-hidden="true">#</a> ES6</h2>
<h3 id="import-与-export" tabindex="-1"><a class="header-anchor" href="#import-与-export" aria-hidden="true">#</a> import 与 export</h3>
<p>ES6中导入导出</p>
<h4 id="需要研究" tabindex="-1"><a class="header-anchor" href="#需要研究" aria-hidden="true">#</a> 需要研究</h4>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token keyword">function</span> <span class="token function">importAll</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">let</span> modules <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
	r<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span>key <span class="token operator">=</span>
    <span class="token operator">></span> <span class="token punctuation">(</span>modules<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token function">r</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> modules
<span class="token punctuation">}</span>
<span class="token keyword">const</span> modules <span class="token operator">=</span> <span class="token function">importAll</span><span class="token punctuation">(</span>require<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token string">"./"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\.js$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> api <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">assign</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">,</span> Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>modules<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> api

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


