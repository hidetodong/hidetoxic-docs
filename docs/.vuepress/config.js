import { defineUserConfig, defaultTheme } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
export default defineUserConfig({
  lang: "zh-CN",
  title: "HIDETOXIC",
  description: "理想的面目，半身霓虹，半身干枯",
  head: [['link', { rel: 'icon', href: '/hidetoxic_logo.png' }]],
  theme: hopeTheme({
    logo:'/hidetoxic_logo.png',
    fullscreen: true,
    backToTop: true,
    sidebar: [
      {
        text: "概要",
        path: "/summary/",
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/summary/warning.md"],
      },
      {
        text: "前端技术指北",
        path: "/tricks/",
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: [
          "/tricks/embed.md",
          "/tricks/css-tricks.md",
          "/tricks/js-img-save.md",
          "/tricks/js-total.md",
          "/tricks/date-picker.md",
          "/tricks/webpack.md",
          "/tricks/bit-operate.md",
          '/tricks/NIM-service',
          '/tricks/tcplayer',
          {
            text: "DOCKER", // 必要的
            path: "/tricks/docker/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
            collapsable: true, // 可选的, 默认值是 true,
            sidebarDepth: 2, // 可选的, 默认值是 1
            children: ["/tricks/docker/docker-use.md"],
          },
          {
            text:'Github Actions',
            path:"/tricks/github-actions/",
            collapsable:true,
            sidebarDepth:2,
            children:["/tricks/github-actions/ssh.md"]
          },
          {
            text:'Vue',
            path:'/tricks/vue/',
            collapsable:true,
            sidebarDepth:2,
            children:["/tricks/vue/reactivity.md"]
          }
          // '/tricks/node-cli'
          // '/life/custom'
        ],
      },
      {
        text: "前端工作历程", // 必要的
        path: "/frontend/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 2, // 可选的, 默认值是 1
        children: ["/frontend/leader-process", "/frontend/netmi-cli"],
      },
      {
        text: "关于生活",
        path: "/life/",
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/life/aboutme", "/life/custom"],
      },
    ],
    // 默认主题配置
    navbar: [
      { text: "首页", link: "/" },
      { text: "简历/CV", link: "http://cv.hidetoxic.tech/#/" },
      {
        text: "文章",
        children: [
          { text: "前端技术", link: "/frontend/first-doc" },
          { text: "关于我", link: "/life/aboutme" },
          { text: "奇思妙想", link: "/tricks/embed" },
        ],
      },
      { text: "GitHub", link: "https://github.com/hidetodong" },
    ],
  }),
});
