/*
 * @Author: zhanghao
 * @Date: 2025-03-25 21:48:49
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 16:46:10
 * @Description:
 * @FilePath: /vite-vue/vite.config.js
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  assetsInclude: ["**/*.awebp"],
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    tailwindcss(),
  ],
});
