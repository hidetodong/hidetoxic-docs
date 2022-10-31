<template><div><h1 id="husky5-lint-staged-推进项目代码规范" tabindex="-1"><a class="header-anchor" href="#husky5-lint-staged-推进项目代码规范" aria-hidden="true">#</a> Husky5 + lint-staged 推进项目代码规范</h1>
<h2 id="老版本升级" tabindex="-1"><a class="header-anchor" href="#老版本升级" aria-hidden="true">#</a> 老版本升级</h2>
<p>husky4 =&gt; husky5</p>
<div class="custom-container tip">
<p class="custom-container-title">v4 v5配置区别</p>
<p>因为 v5 之前的版本，husky 也会在 .git/hooks 内安装钩子，这样就会导致 husky 安装的钩子把 yorkie 的钩子覆盖掉，最终运行了 husky 的钩子配置。</p>
<p>v5 版本的一个特性就是不在安装钩子，取而代之的是在根目录创建 .husky 文件夹，并在内部进行钩子的按需配置。可以理解为自己圈了一个地方不跟你抢 .git/hooks 了，这样在按照原来项目的配置在 package.json 内写 husky 字段，自然而然就不会再生效了。</p>
<p>所以记得 husky 配置已经变了，要么手动指定 4.3.8 老版本，并且继续使用老版本配置字段，要么就使用全新的配置方式来进行配置。</p>
</div>
<h2 id="husky安装" tabindex="-1"><a class="header-anchor" href="#husky安装" aria-hidden="true">#</a> husky安装</h2>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>npm install <span class="token operator">-</span><span class="token constant">D</span> husky
npm install <span class="token operator">-</span><span class="token constant">D</span> lint<span class="token operator">-</span>staged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code></code></pre><div class="line-numbers" aria-hidden="true"></div></div></div></template>


