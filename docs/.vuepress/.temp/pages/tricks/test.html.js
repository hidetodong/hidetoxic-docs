export const data = JSON.parse("{\"key\":\"v-19cbae9e\",\"path\":\"/tricks/test.html\",\"title\":\"测试文档\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.09,\"words\":26},\"filePathRelative\":\"tricks/test.md\"}")

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
