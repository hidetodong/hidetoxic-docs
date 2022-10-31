export const data = JSON.parse("{\"key\":\"v-8be4f0bc\",\"path\":\"/frontend/first-doc.html\",\"title\":\"写在最前\",\"lang\":\"zh-CN\",\"frontmatter\":{},\"excerpt\":\"\",\"headers\":[{\"level\":2,\"title\":\"为什么\",\"slug\":\"为什么\",\"link\":\"#为什么\",\"children\":[]},{\"level\":2,\"title\":\"什么时候\",\"slug\":\"什么时候\",\"link\":\"#什么时候\",\"children\":[]}],\"readingTime\":{\"minutes\":0.3,\"words\":89},\"filePathRelative\":\"frontend/first-doc.md\"}")

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
