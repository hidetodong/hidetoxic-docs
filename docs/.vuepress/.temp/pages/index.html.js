export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"首页\",\"lang\":\"zh-CN\",\"frontmatter\":{\"home\":true,\"title\":\"首页\",\"heroImage\":\"hidetoxic_logo.png\",\"actions\":[{\"text\":\"开始阅读\",\"link\":\"/summary/warning/\"}],\"features\":[{\"title\":\"Frontend\",\"details\":\"前端无责任指北\"},{\"title\":\"Life\",\"details\":\"关于生活的迷思\"},{\"title\":\"Myself\",\"details\":\"记录自我&备份想法\"}],\"footer\":\"MIT Licensed | Copyright © 2021-2022 Hidetodong\"},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.18,\"words\":55},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
