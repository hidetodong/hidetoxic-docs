<template><div><h1 id="前端-leader-的从零成长" tabindex="-1"><a class="header-anchor" href="#前端-leader-的从零成长" aria-hidden="true">#</a> 前端“leader”的从零成长</h1>
<h2 id="序言" tabindex="-1"><a class="header-anchor" href="#序言" aria-hidden="true">#</a> 序言</h2>
<p>开这篇文章的一个理由是，想记录自己在小公司从一名基础的前端开发，向一个TL角色进阶的过程。复盘也好，分享也罢，其中会有很多值得写和探究的东西。</p>
<p>严格意义上说，我并不觉得自己已经有能力成为一个前端的技术leader。能够在目前这家公司成为Web组的组长，实属机缘巧合，有各种运气的成分在，也有被迫上位的意思。但是既然已经被带上了这个位置，那么必要的学习和挫折肯定是不会少的了。在我原来的boss一段时间的带领之后，在新项目伊始，我觉得重新建立规范的机会应该来了。</p>
<h2 id="目前的困境" tabindex="-1"><a class="header-anchor" href="#目前的困境" aria-hidden="true">#</a> 目前的困境</h2>
<p>先说一下公司的现状。我所在的公司是一家典型的外包项目制公司。心态上和能力上，大家的基本目标几乎都是以完成项目为第一要义，再有少部分的时间才去做沉淀。</p>
<p><strong>也许对于其他公司来说，这些根本就已经不能算是问题，不过对于没有建立起好的规范的小公司，这绝对是扩张路上的绊脚石。我不认为自己现在做的全是对的，但实践才是检验真理的唯一标准。</strong></p>
<p>就以我所在的Web组来说，有几个让人难以忍受的痛点：</p>
<p>第一，组内的文档库几乎是无效的。以前积攒的文档，时效性不好，而且价值已经大打折扣了，吸取不到什么营养。组里也几乎没有人定期分享知识。从开源的视角看，其实非常不利于组员的共同发展。不仅是技术型的文档，就算是项目内的项目文档，也非常的不完善，新人上手成本很高，下文中也会提到还有一个致命问题。</p>
<p>第二，组内的工作流非常混乱，基本上就是小打小闹的。对于git仓库的使用很扁平化，公司的半定制项目的基础代码，在一个仓库内。同时每一个新建项目为了方便，直接在原项目上拉分支，这种做法小而美，在没有体量的时候可以接受。但是很快就变得无法承受了，因为可能几个月就有十个项目。每个项目都有功能分支以及版本分支，这样原仓库上塞满了不按照取名规范的各种奇怪分支，包括但不限于<code v-pre>xxx-develop-1.0/xxx-dev/xxx-release-1.5/xxx-live-1.8</code>，造成了阅读困难和管理困难。源码交付时也没法剥离分支，可能就泄露了不该给出去的代码。<s>（虽然老板可能不太在乎)</s></p>
<p>第三，组内的日报体系过于简单，出现了人力调度上的难题。在前一段时间的管理真空期，出现了一个人三个项目，一个人无事干的情况。承接上文的致命问题，其中一个原因是文档不完善，没法迅速交接，另一个原因就是因为组内没有很好的交流出现的人力调度事故。这基本上可以看成是无法接受的，只要一个人请假，基本上这个项目的那一端进度就停滞了，所以这也是一个必须改变的问题。</p>
<p>第四，组内的代码物料库的严重不足。全定制化项目另算，但半定制化项目，在拥有公司统一风格的UI设计下，新写页面还需要去老页面拷贝或者索性全部重写，这样的开发模式太不健康了。需要构建的有以下几部分，公司设计规范下的UI库，公司前后端约定下的工具函数插件，公司项目的命令行工具，组内自动构建的脚本库等。</p>
<blockquote>
<p>某大佬曾经说过：“一件事重复干三次就该自动化。”</p>
</blockquote>
<p>分析完上述的点，就是时候着手解决了。</p>
<h2 id="从最急迫的事入手-工作流重构" tabindex="-1"><a class="header-anchor" href="#从最急迫的事入手-工作流重构" aria-hidden="true">#</a> 从最急迫的事入手 - 工作流重构</h2>
<h3 id="_1-项目维度的策略" tabindex="-1"><a class="header-anchor" href="#_1-项目维度的策略" aria-hidden="true">#</a> 1.项目维度的策略</h3>
<p>我们公司的开发工作流都是基于git的，所以工作流的重构也是从git开始构思的。眼前最急迫的问题就是要对新项目进行剥离，老项目的拆分只能逐步进行。我的构想里，首先解决的就是乱建新分支。所以所有新项目，都采用了fork的方式从基础代码库做拷贝。</p>
<p>参照各种开源社区的做法，这样做有几个好处：</p>
<ul>
<li>与直接建立拷贝到新仓库相比，可以建立和基础代码库之间的联系，后续可以在维护基础代码时，把修复的bug同步分发到各个fork上。</li>
<li>各个fork上产生的提交，也可以有效的通过pull request反哺到基础代码上。</li>
<li>将项目干净的剥离出来，交付时不产生额外的开销</li>
</ul>
<p><img src="https://hidetoxic01.oss-cn-hangzhou.aliyuncs.com/docs/20210127213345.png" alt="工作流图解"></p>
<h3 id="_2-分支维度的策略" tabindex="-1"><a class="header-anchor" href="#_2-分支维度的策略" aria-hidden="true">#</a> 2.分支维度的策略</h3>
<p>之前的分支，基本上只分开发，测试，线上以及他们对应的版本分支。这样其实很不利于协作，两个人以上同时修改一个分支，后续的推送和合并代码基本上就是噩梦，每天都会活在冲突中，解决冲突掉了无数的头发。</p>
<p>虽然大部分时候都是一个人在开发一个项目，但是也会有项目时间紧产生的协作。往常的做法基本上是新开一个包括所有模块的分支，然后口头约定不要修改到共同的文件来防止冲突，不过沟通成本太高了，也常常会改乱。</p>
<p>新的做法是，按照功能模块进行拆分并且新建分支。电商软件为例，就可以拆分为商城模块，直播模块等。（看起来很符合逻辑，但从日常的实践上来看，其实执行的并不好。）这样不同的功能模块就可以交付给不同的人进行开发，开发阶段所有都只对自己分支的功能负责，很方便纠错和协作。在一阶段开发结束后，由项目负责人在develop分支上进行功能模块的合并，之后提供版本进行测试，无误后合并入master分支提交正式版。
<img src="https://hidetoxic01.oss-cn-hangzhou.aliyuncs.com/docs/20210127220744.png" alt="功能分支提交记录"></p>
<blockquote>
<p>这样的做法比较依赖git操作，主要有</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> merge <span class="token punctuation">{</span>target-branch<span class="token punctuation">}</span>
<span class="token function">git</span> cherry-pick <span class="token punctuation">{</span>commit-hash<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>git merge</code>将目标分支的所有不同合并到本分支</p>
<p><code v-pre>git cherry-pick</code>将目标提交给“剪”到本分支</p>
<p>git操作不是本文重点，不做赘述</p>
</blockquote>
<h3 id="_3-项目目录维度的策略" tabindex="-1"><a class="header-anchor" href="#_3-项目目录维度的策略" aria-hidden="true">#</a> 3.项目目录维度的策略</h3>
<p>按照之前的项目目录，所有的api定义，前端路由表的定义，各模块组建定义，几乎都放在各自的总和文件和文件夹中，难以拆分。所以新项目中，我直接按照模块进行了拆分。</p>
<blockquote>
<p>目前这部分只做了简单的拆分，计划中将把单模块的所有文件都拆出来做成插件，这一步的思考量比较大，等比较完整后再写</p>
</blockquote>
<h3 id="_4-组员的技能提升" tabindex="-1"><a class="header-anchor" href="#_4-组员的技能提升" aria-hidden="true">#</a> 4.组员的技能提升</h3>
<p>现在组里所有人都只使用source tree进行git的管理，就算使用命令，也仅限于比较基础的推代码和拉代码。所以近期的计划中，希望通过一个会议的形式和所有的组员同步需要用的git知识，让他们对整个git体系有更好的认识。</p>
<h2 id="待更新" tabindex="-1"><a class="header-anchor" href="#待更新" aria-hidden="true">#</a> #待更新</h2>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
</div></template>


