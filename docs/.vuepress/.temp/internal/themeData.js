export const themeData = JSON.parse("{\"blog\":{},\"encrypt\":{},\"pure\":false,\"darkmode\":\"switch\",\"themeColor\":false,\"fullscreen\":true,\"locales\":{\"/\":{\"blog\":{},\"repoDisplay\":true,\"navbarIcon\":true,\"navbarAutoHide\":\"mobile\",\"hideSiteNameonMobile\":true,\"sidebar\":[{\"text\":\"概要\",\"path\":\"/summary/\",\"collapsable\":false,\"sidebarDepth\":1,\"children\":[\"/summary/warning.md\"]},{\"text\":\"前端技术指北\",\"path\":\"/tricks/\",\"collapsable\":false,\"sidebarDepth\":1,\"children\":[\"/tricks/embed.md\",\"/tricks/css-tricks.md\",\"/tricks/js-img-save.md\",\"/tricks/js-total.md\",\"/tricks/date-picker.md\",\"/tricks/webpack.md\",\"/tricks/bit-operate.md\",{\"text\":\"DOCKER\",\"path\":\"/tricks/docker/\",\"collapsable\":true,\"sidebarDepth\":2,\"children\":[\"/tricks/docker/docker-use.md\"]}]},{\"text\":\"前端工作历程\",\"path\":\"/frontend/\",\"collapsable\":false,\"sidebarDepth\":2,\"children\":[\"/frontend/leader-process\",\"/frontend/netmi-cli\"]},{\"text\":\"关于生活\",\"path\":\"/life/\",\"collapsable\":false,\"sidebarDepth\":1,\"children\":[\"/life/aboutme\",\"/life/custom\"]}],\"sidebarIcon\":true,\"headerDepth\":2,\"lang\":\"zh-CN\",\"navbarLocales\":{\"langName\":\"简体中文\",\"selectLangAriaLabel\":\"选择语言\"},\"metaLocales\":{\"author\":\"作者\",\"date\":\"写作日期\",\"origin\":\"原创\",\"views\":\"访问量\",\"category\":\"分类\",\"tag\":\"标签\",\"readingTime\":\"阅读时间\",\"words\":\"字数\",\"toc\":\"此页内容\",\"prev\":\"上一页\",\"next\":\"下一页\",\"lastUpdated\":\"上次编辑于\",\"contributors\":\"贡献者\",\"editLink\":\"编辑此页\"},\"outlookLocales\":{\"themeColor\":\"主题色\",\"darkmode\":\"外观\",\"fullscreen\":\"全屏\"},\"encryptLocales\":{\"iconLabel\":\"文章已加密\",\"placeholder\":\"输入密码\",\"remember\":\"记住密码\",\"errorHint\":\"请输入正确的密码\"},\"routeLocales\":{\"notFoundMsg\":[\"这里什么也没有\",\"我们是怎么来到这儿的？\",\"这 是 四 零 四 !\",\"看起来你访问了一个失效的链接\"],\"back\":\"返回上一页\",\"home\":\"带我回家\",\"openInNewWindow\":\"Open in new window\"},\"logo\":\"/hidetoxic_logo.png\",\"navbar\":[{\"text\":\"首页\",\"link\":\"/\"},{\"text\":\"简历/CV\",\"link\":\"http://cv.hidetoxic.tech/#/\"},{\"text\":\"文章\",\"children\":[{\"text\":\"前端技术\",\"link\":\"/frontend/first-doc\"},{\"text\":\"关于我\",\"link\":\"/life/aboutme\"},{\"text\":\"奇思妙想\",\"link\":\"/tricks/embed\"}]},{\"text\":\"GitHub\",\"link\":\"https://github.com/hidetodong\"}]}}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateThemeData) {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ themeData }) => {
    __VUE_HMR_RUNTIME__.updateThemeData(themeData)
  })
}
