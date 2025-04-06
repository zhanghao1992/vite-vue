/*
 * @Author: zhanghao
 * @Date: 2025-04-03 16:53:31
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-05 10:51:42
 * @Description:
 * @FilePath: /vite-vue/src/router/router.js
 */
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "首页",
    path: "/xx",
    component: () => import("../pages/Demo/index.vue"),
  },
  {
    name: "首页",
    path: "/demo2",
    component: () => import("../pages/Demo2/index.vue"),
  },
  {
    name: "关于我们",
    path: "/about",
    component: () => import("../pages/About/index.vue"),
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(),
  routes, //路由表
});

export default router;
