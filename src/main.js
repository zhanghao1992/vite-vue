/*
 * @Author: zhanghao
 * @Date: 2025-03-25 21:48:49
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-06 09:07:51
 * @Description:
 * @FilePath: /vite-vue/src/main.js
 */
import { createApp, createElementBlock } from "vue";
import "./style.css";
import App from "./App.vue";

import "normalize.css/normalize.css";
import "./assets/css/reset.css";
import "./assets/css/border.css";

import "./assets/css/tailwind.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";

// 引入路由实例
import router from "./router/router.js";

// 引入pinia 实例
import pinia from "./pinia/pinia.js";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router).use(pinia).use(ElementPlus).mount("#app");
