<template><div><h1 id="javascript位操作以及实际用例探索" tabindex="-1"><a class="header-anchor" href="#javascript位操作以及实际用例探索" aria-hidden="true">#</a> Javascript位操作以及实际用例探索</h1>
<h2 id="javascript位操作" tabindex="-1"><a class="header-anchor" href="#javascript位操作" aria-hidden="true">#</a> Javascript位操作</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Operators_7c8eb9475d97a4a734c5991857698560#Unsigned_right_shift" target="_blank" rel="noopener noreferrer">MDN相关解释<ExternalLinkIcon/></a></p>
<p>按位操作符（Bitwise operators） 将其操作数（operands）当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值。例如，十进制数9，用二进制表示则为1001。按位操作符操作数字的二进制形式，但是返回值依然是标准的JavaScript数值。</p>
<p>表格中Javascript中的按位操作符</p>
<table>
<thead>
<tr>
<th>运算符</th>
<th>用法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>按位与（AND）</td>
<td>a &amp; b</td>
<td>结果：同1为1，有0为0</td>
</tr>
<tr>
<td>按位或（OR）</td>
<td>a |  b</td>
<td>结果：有1为1，其余为0</td>
</tr>
<tr>
<td>按位异或（XOR）</td>
<td>a ^  b</td>
<td>结果：相同为0，相反为1</td>
</tr>
<tr>
<td>按位非（NOT）</td>
<td>~a</td>
<td>结果：每一位取反</td>
</tr>
<tr>
<td>-</td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td>左移</td>
<td>a &lt;&lt; b</td>
<td>将a的二进制数左移b位（b&lt;32），右边填0</td>
</tr>
<tr>
<td>有符号右移</td>
<td>a &gt;&gt; b</td>
<td>将a的二进制数右移b位（b&lt;32），丢弃移出位</td>
</tr>
<tr>
<td>无符号右移</td>
<td>a &gt;&gt; b</td>
<td>将a的二进制数右移b位（b&lt;32），丢弃移出位，并在左侧填0</td>
</tr>
</tbody>
</table>
<h2 id="位操作使用" tabindex="-1"><a class="header-anchor" href="#位操作使用" aria-hidden="true">#</a> 位操作使用</h2>
<h3 id="从基础开始" tabindex="-1"><a class="header-anchor" href="#从基础开始" aria-hidden="true">#</a> 从基础开始</h3>
<p>我们定义一个操作数<code v-pre>status</code>，以四位为例。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> status <span class="token operator">=</span> <span class="token number">0b0000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以通过上述的操作符对status进行位操作</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 目标位置1</span>
status <span class="token operator">=</span> status <span class="token operator">|</span> <span class="token number">0b0010</span> <span class="token comment">// status = 0b0010</span>
<span class="token comment">// 目标位检测</span>
status <span class="token operator">=</span> status <span class="token operator">&amp;</span> <span class="token number">0b0110</span> <span class="token comment">// status = 0b0000</span>
<span class="token comment">// 目标位置反</span>
status <span class="token operator">=</span> status <span class="token operator">^</span> <span class="token number">0b0110</span> <span class="token comment">// status = 0b0110</span>
<span class="token comment">// 目标位取反</span>
status <span class="token operator">=</span> <span class="token operator">~</span>status         <span class="token comment">// status = -0b1011</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="操作规范化" tabindex="-1"><a class="header-anchor" href="#操作规范化" aria-hidden="true">#</a> 操作规范化</h3>
<p>为了让上面的操作更加具有可读性，我们可以封装几个处理函数</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>
<span class="token comment">//校验状态包上是否存在目标状态</span>
<span class="token keyword">function</span> <span class="token function">hasStatus</span><span class="token punctuation">(</span><span class="token parameter">status<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> status <span class="token operator">&amp;</span> key
<span class="token punctuation">}</span>
<span class="token comment">//对状态包设置目标状态</span>
<span class="token keyword">function</span> <span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token parameter">status<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> status <span class="token operator">|</span> key
<span class="token punctuation">}</span>
<span class="token comment">//反转状态包上的目标状态</span>
<span class="token keyword">function</span> <span class="token function">reverseStatus</span><span class="token punctuation">(</span><span class="token parameter">status<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> status <span class="token operator">^</span> key
<span class="token punctuation">}</span>
<span class="token comment">//清除状态包上的目标状态</span>
<span class="token keyword">function</span> <span class="token function">clearStatus</span><span class="token punctuation">(</span><span class="token parameter">status<span class="token punctuation">,</span>key</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> status <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token operator">~</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们就完成了对目标位的读（<code v-pre>hasStatus</code>）、写(<code v-pre>setStatus</code>、<code v-pre>reverseStatus</code>、<code v-pre>clearStatus·</code>)操作</p>
<p>于是我们可以改写上述的操作得到</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> status <span class="token operator">=</span> <span class="token number">0b0010</span>

<span class="token comment">// 校验</span>
<span class="token keyword">if</span><span class="token punctuation">(</span><span class="token function">hasStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">,</span><span class="token number">0b1111</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// true</span>
    <span class="token comment">// do something</span>
<span class="token punctuation">}</span>
<span class="token comment">// 置位</span>
status <span class="token operator">=</span> <span class="token function">setStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">,</span><span class="token number">0b0001</span><span class="token punctuation">)</span> <span class="token comment">// status = 0b0011</span>

<span class="token comment">// 置反</span>
status <span class="token operator">=</span> <span class="token function">reverseStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">,</span><span class="token number">0b0010</span><span class="token punctuation">)</span> <span class="token comment">// status = 0b0000</span>

<span class="token comment">// 清除</span>
status <span class="token operator">=</span> <span class="token function">clearStatus</span><span class="token punctuation">(</span>status<span class="token punctuation">,</span><span class="token number">0b0010</span><span class="token punctuation">)</span> <span class="token comment">// status = 0b0000</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实际用例探索" tabindex="-1"><a class="header-anchor" href="#实际用例探索" aria-hidden="true">#</a> 实际用例探索</h2>
<!-- 


我们可以使用位操作来操作权限
```javascript
const statusEnum = {
    FRESHMAN:/** 大一 */0b0001,
    SOPHOMORE:/** 大二*/0b0010,
    JUNIOR:/**大三*/0b0100,
    SENIOR:/**大四*/0b1000
}

``` -->
</div></template>


