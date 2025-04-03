/*
 * @Author: zhanghao
 * @Date: 2025-04-02 17:07:58
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 10:37:34
 * @Description:
 * @FilePath: /vite-vue/src/components/Demo/config.js
 */
import image1 from "./images/3.png";
import image2 from "./images/GS__0177.jpg";
import image3 from "./images/GS__0178.jpg";
import image4 from "./images/GS__0179.jpg";
import image5 from "./images/GS__0180.jpg";

import tipImage from "./images/icon/tip.png";
import pringImage from "./images/icon/print.png";
import chairImage from "./images/icon/chair.png";

import MyToolTip from "./toolTip.vue";
import { createApp } from "vue";
import { renderToString } from "@vue/server-renderer";

async function renderHelloWorldToString() {
  const app = createApp(MyToolTip, { name: "Vue.js 3" });
  const appHtml = await renderToString(app);
  console.log(appHtml);
}

const imageConfig = [
  //   {
  //     name: "img1",
  //     img: image1,
  //     markers: [],
  //   },
  {
    name: "img2",
    img: image2,
    markers: [
      {
        id: "marker1",
        position: { yaw: 0.38, pitch: -0.26 },
        image: pringImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: "marker1 data",
        tooltip: {
          content: "打印机. <b>Click me!</b>",
          // component: toolTip,
          // props: {
          //   title: "打印机",
          //   content: "打印机. <button>Click me!</button>",
          // },
        },
        // content: document.getElementById('lorem-content').innerHTML,
      },
      {
        id: "marker2",
        position: { yaw: 0.09, pitch: -0.3 },
        image: chairImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: "marker1 data",
        tooltip: {
          content: "This is marker",
          className: "custom-tooltip",
          trigger: "click",
        },
      },
    ],
  },
  {
    name: "img3",
    img: image3,
    markers: [
      {
        id: "marker-desk",
        position: { yaw: 0.58, pitch: -0.21 },
        image: tipImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        tooltip: "桌子. <b>Click me!</b>",
      },
    ],
  },
  {
    name: "img4",
    img: image4,
    markers: [],
  },
  {
    name: "img5",
    img: image5,
    markers: [],
  },
];

export { imageConfig };
