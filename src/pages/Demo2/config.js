/*
 * @Author: zhanghao
 * @Date: 2025-04-02 17:07:58
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-06 08:43:27
 * @Description:
 * @FilePath: /vite-vue/src/pages/Demo2/config.js
 */
import image1 from "./images/3.png";
import image2 from "./images/GS__0177.jpg";
import image3 from "./images/GS__0176.jpg";
import image4 from "./images/GS__0179.jpg";
import image5 from "./images/GS__0180.jpg";

import tipImage from "./images/icon/tip.png";
import pringImage from "./images/icon/print.png";
import chairImage from "./images/icon/chair.png";
import turnImage from "./images/icon/turn.png";
import go_straightImage from "./images/icon/go_straight.png";

import MyToolTip from "./toolTip.vue";
import { createApp } from "vue";
import { renderToString } from "@vue/server-renderer";

import { Edit, Search } from "@element-plus/icons-vue";

// const dom = document.createElement("div");
// const bbb = createApp(MyTip).mount(dom);
// console.log(dom.innerHTML);

const sceneConfig = [
  {
    name: "sene1",
    // img: image1,
    img: image2,
    markers: [
      {
        id: "marker1",
        position: { yaw: 0.38, pitch: -0.26 },
        image: pringImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        data: {
          deviceName: "打印机",
          deviceId: "deviceId1",
          autoShow: false,
          content: "打印机. 我是一个普通的tooltip",
          type: "default",
        },
        tooltip: {
          content: "打印机. 我是一个普通的tooltip",
        },
      },
      {
        id: "marker2",
        position: { yaw: 0.09, pitch: -0.1 },
        image: chairImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: {
          deviceName: "电脑",
          deviceId: "deviceId1",
          autoShow: false,
          content: "电脑. 我是一个自定义的tooltip",
          type: "customStep",
          to: "sene2",
        },
      },
      {
        id: "marker3",
        position: { yaw: 1.02, pitch: -0.15 },
        image: chairImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: {
          deviceName: "台电脑",
          deviceId: "deviceId1",
          autoShow: false,
          type: "info",
          content: "我是一台电脑",
          type: "custom",
        },
        tooltip: {
          content: "This is marker3",
        },
      },
    ],
  },
  {
    name: "sene2",
    img: image3,
    markers: [
      // {
      //   id: "marker4",
      //   position: { yaw: 0.38, pitch: -0.26 },
      //   image: pringImage,
      //   size: { width: 32, height: 32 },
      //   anchor: "bottom center",
      //   data: {
      //     deviceName: "打印机",
      //     deviceId: "deviceId1",
      //     autoShow: false,
      //     content: "打印机. 我是一个普通的tooltip",
      //     type: "default",
      //   },
      //   tooltip: {
      //     content: "打印机. 我是一个普通的tooltip",
      //   },
      // },
      // {
      //   id: "marker5",
      //   position: { yaw: 0.09, pitch: -0.3 },
      //   // image: turnImage,
      //   html: dom.innerHTML,
      //   size: { width: 60, height: 60 },
      //   anchor: "bottom center",
      //   zoomLvl: 100,
      //   data: {
      //     deviceName: "makeDom",
      //     deviceId: "deviceId1",
      //     autoShow: false,
      //     content: "makeDom",
      //     type: "default",
      //   },
      // },
      {
        id: "marker4",
        position: { yaw: -0.9, pitch: -0.4 },
        image: turnImage,
        size: { width: 20, height: 20 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: {
          deviceName: "makeDom",
          deviceId: "deviceId1",
          autoShow: false,
          content: "makeDom",
          type: "customAnimate",
          zoom: 100,
          yaw: 5.4,
          pitch: -0.27,
        },
      },
      // {
      //   id: "marker4",
      //   imageLayer: go_straightImage,
      //   position: [
      //     { yaw: 2.17063, pitch: 0.47556 },
      //     { yaw: 2.47392, pitch: 0.47121 },
      //     { yaw: 2.47818, pitch: 0.24468 },
      //     { yaw: 2.17698, pitch: 0.24809 },
      //   ],
      //   data: {
      //     type: "default",
      //   },
      // },
      {
        id: "marker5",
        position: { yaw: 0.09, pitch: -0 },
        image: turnImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        data: {
          deviceName: "makeDom",
          deviceId: "deviceId1",
          autoShow: false,
          content: "makeDom",
          type: "customStep",
          to: "sene1",
        },
        hoverTooltip: null,
        clickTooltip: null,
      },
      {
        id: "marker6",
        autoShow: true,
        position: { yaw: 0.58, pitch: -0.1 },
        image: tipImage,
        size: { width: 32, height: 32 },
        anchor: "bottom center",
        zoomLvl: 100,
        tooltip: {
          content: "一盆花",
        },
        data: {
          deviceName: "花",
          deviceId: "deviceId1",
          autoShow: false,
          content: "一盆花",
          type: "default",
        },
      },
    ],
  },
];

export { sceneConfig };
