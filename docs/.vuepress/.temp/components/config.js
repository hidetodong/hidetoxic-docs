import { defineClientConfig } from "@vuepress/client";
import { h } from "vue";

import Badge from "/Users/xingzidong/Documents/HIDETOXIC/hidetoxic-docs/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/xingzidong/Documents/HIDETOXIC/hidetoxic-docs/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/Users/xingzidong/Documents/HIDETOXIC/hidetoxic-docs/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", Badge);
    app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});
