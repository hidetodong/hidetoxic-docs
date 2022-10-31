<template><div><h1 id="日历组件开发" tabindex="-1"><a class="header-anchor" href="#日历组件开发" aria-hidden="true">#</a> 日历组件开发</h1>
<h2 id="功能点" tabindex="-1"><a class="header-anchor" href="#功能点" aria-hidden="true">#</a> 功能点</h2>
<p><img src="https://hidetoxic01.oss-cn-hangzhou.aliyuncs.com/docs/4BD83367-6338-4287-9A49-C2FDB20ABB17.png" alt=""></p>
<h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构" aria-hidden="true">#</a> 数据结构</h2>
<h2 id="设计思路" tabindex="-1"><a class="header-anchor" href="#设计思路" aria-hidden="true">#</a> 设计思路</h2>
<p>因为要按月展示</p>
<p>所以 在一维数组上操作数据</p>
<p>在二维数组上进行渲染</p>
<p>点击选择后 首先操作一维数组中的数据</p>
<p>然后通过重新计算二维数组触发重绘</p>
<h2 id="点击逻辑" tabindex="-1"><a class="header-anchor" href="#点击逻辑" aria-hidden="true">#</a> 点击逻辑</h2>
<p>1.过去的日期直接禁用 无法点击</p>
<p>2.被冻结的日期直接禁用 无法点击</p>
<p>3.可点击的日期 点击后选中</p>
<p>4.只选中一个日期 显示端点</p>
<p>5.选中两个日期 显示端点以及0.5背景</p>
<p>6.选中三个以上日期  中间的日子不显示端点的样式</p>
</div></template>


