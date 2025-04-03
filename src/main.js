/*
 * @Author: zhanghao
 * @Date: 2025-03-25 21:48:49
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 16:47:18
 * @Description:
 * @FilePath: /vite-vue/src/main.js
 */
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import "normalize.css/normalize.css";
import "./assets/css/reset.css";

import "./assets/css/tailwind.css";

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(ElementPlus).mount("#app");
