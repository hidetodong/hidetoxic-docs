<template><div><h1 id="网易云信sdk-h5使用" tabindex="-1"><a class="header-anchor" href="#网易云信sdk-h5使用" aria-hidden="true">#</a> 网易云信SDK H5使用</h1>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>其实作为标准化产品来说，网易云信的demo已经给的比较完整了，基本项目中的IM功能都包括了。但我们公司使用kbone作为小程序和h5的跨端方案，导致不管使用小程序的demo还是h5的demo都没法很好的兼容，无奈只能使用SDK全部重写了。</p>
<h2 id="项目建立" tabindex="-1"><a class="header-anchor" href="#项目建立" aria-hidden="true">#</a> 项目建立</h2>
<h3 id="_1-git仓库建立" tabindex="-1"><a class="header-anchor" href="#_1-git仓库建立" aria-hidden="true">#</a> 1.git仓库建立</h3>
<p>常规空白仓库建立流程，不赘述</p>
<h3 id="_2-vue项目建立" tabindex="-1"><a class="header-anchor" href="#_2-vue项目建立" aria-hidden="true">#</a> 2.vue项目建立</h3>
<p>使用vue-cli3建立常规项目</p>
<h2 id="准备工作" tabindex="-1"><a class="header-anchor" href="#准备工作" aria-hidden="true">#</a> 准备工作</h2>
<h3 id="_1-sdk准备" tabindex="-1"><a class="header-anchor" href="#_1-sdk准备" aria-hidden="true">#</a> 1.SDK准备</h3>
<p>前往链接 <a href="https://yunxin.163.com/im-sdk-demo" target="_blank" rel="noopener noreferrer">网易云信SDK下载<ExternalLinkIcon/></a></p>
<p>将获取的SDK存放至<code v-pre>src/utils</code>文件夹</p>
<h3 id="_2-工具函数准备" tabindex="-1"><a class="header-anchor" href="#_2-工具函数准备" aria-hidden="true">#</a> 2.工具函数准备</h3>
<p>建立<code v-pre>src/utils/NIM_related.js</code></p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> getUserInfo<span class="token punctuation">,</span> getShopInfo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../api/index"</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">getServiceParams</span><span class="token punctuation">(</span><span class="token parameter">params</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token function">getUserInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>params<span class="token punctuation">.</span>shop_id<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">let</span> shop <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token function">getShopInfo</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
        <span class="token literal-property property">shop_id</span><span class="token operator">:</span> params<span class="token punctuation">.</span>shop_id<span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">resolve</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>user<span class="token punctuation">,</span>shop<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>user<span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>getServiceParams()</code></p>
</div></template>


