export const data = JSON.parse("{\"key\":\"v-05fd5202\",\"path\":\"/summary/warning.html\",\"title\":\"必读 Must Read\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[],\"readingTime\":{\"minutes\":0.06,\"words\":19},\"filePathRelative\":\"summary/warning.md\"}")

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
