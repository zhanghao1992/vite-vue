<!--
 * @Author: zhanghao
 * @Date: 2025-03-25 21:54:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 10:57:17
 * @Description: 北京demo
 * @FilePath: /vite-vue/src/components/Demo/index.vue
-->
<template>
    <div class="my-tab">
        <el-segmented v-model="state.currentImg" :options="options" />
    </div>

    <MyToolTip :info="{ name: '打印机' }" />
    <div id="viewer" ref="viewerDom"></div>
</template>

<script setup>
import MyToolTip from "./toolTip.vue";

// 必须引入官方提供的样式文件
import '@photo-sphere-viewer/core/index.css';
import { Viewer } from '@photo-sphere-viewer/core';

import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css'

import { imageConfig } from './config'


import image from './images/GS__0172.jpg'
import tipImage from './images/icon/tip.png'
import { ref, reactive, watch, onMounted } from 'vue'

import loadingImg from './images/icon/loading.gif'


const options = imageConfig.map(i => i.name)

const state = reactive({
    currentImg: options[0]
})

const viewerDom = ref(null)
let viewer = null
let markersPlugin = null


const showMessage = () => {
    ElMessage({
        type: 'success',
        message: '测试成功'
    });
}

watch(() => state.currentImg, (newVal, oldVal) => {
    console.log(newVal);
    const index = imageConfig.findIndex(i => i.name === newVal)
    // initViewer(imageConfig[index])
    viewer.setPanorama(imageConfig[index]?.img)

})

/**
 * @description: 初始化viewer
 * @param {*} imgData
 * @return {*}
 */
const initViewer = (imgData) => {
    if (viewer) destroyViewer()
    viewer = new Viewer({
        container: viewerDom.value,
        panorama: imgData?.img,
        caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
        // 设置图片描述
        description: "这是一个描述,xxxxxxxxxxxxxxxxx",
        loadingImg,
        defaultZoomLvl: 1,
        size: {
            width: '100%',
            height: '100%'
        },
        clickEventOnMarker: true,
        plugins: [
            [MarkersPlugin, {
                markers: imgData.markers
            }],
        ],
    });
    markersPlugin = viewer.getPlugin(MarkersPlugin);
    initEvents()
}

/**
 * @description: 初始化事件
 * @return {*}
 */
const initEvents = () => {
    viewer.addEventListener('click', (e, data) => {
        // 点击全景图事件
        console.log('click e:', e)
    })


    viewer.addEventListener('position-updated', (e) => {
        // console.log(e.position)
        // 全景图位置变化时 也就是旋转时会把显示的标注tooltip内容隐藏 这里停止旋转时 让这部分标注tooltip重新展示
        // config.tooltip?.visible是手动添加的变量 用来判断标注的tooltip是否显示
        // if (markersPlugin && markersPlugin.markers && currentMarkerId) setTimeout(() => {
        //     Object.keys(markersPlugin.markers).forEach((id) => {
        //         if (markersPlugin.markers[id].config.tooltip?.visible) markersPlugin.markers[id]['showTooltip']()
        //     })
        // }, 300)
    });

    viewer.addEventListener('zoom-updated', ({ zoomLevel }) => {
        // console.log(`new zoom level is ${zoomLevel}`);
    });


    // 在 addMarker 后添加事件监听
    markersPlugin.addEventListener('select-marker', (e) => {
        // markersPlugin.addMarker({
        //     id: 'info',
        //     image: tipImage,
        //     position: { yaw: 0.32, pitch: 0 },
        //     size: { width: 32, height: 32 },
        //     tooltip: '此处是地标',
        // });
        console.log('marker在屏幕上的坐标', e.marker.state.position2D);
    });





    viewer.addEventListener('ready', () => {
        console.log(`viewer is ready`);

        // markersPlugin.hideMarker('marker1')
        // markersPlugin.showMarker('marker1')
        markersPlugin.showMarkerTooltip('marker1')

        viewer.animate({
            zoom: 0,
            speed: '-2rpm',
        })

    }, { once: true });

}

const destroyViewer = () => {
    if (this.viewer) try {
        viewer.destroy()
    } catch (e) {
        console.log(e)
        viewerDom.value.removeChild(viewer.childNodes[0])
    }
}


onMounted(() => {
    initViewer(imageConfig[0])
})

// onMounted(() => {
//     viewer = new Viewer({
//         container: viewerDom.value,
//         panorama: imageConfig[1].img,
//         caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
//         // 设置图片描述
//         description: "这是一个描述,xxxxxxxxxxxxxxxxx",
//         // touchmoveTwoFingers: true,
//         // mousewheelCtrlKey: true,
//         loadingImg: './images/icon/loading.gif',
//         plugins: [
//             [MarkersPlugin, {
//                 markers: [
//                     {
//                         id: 'marker-chair',
//                         position: { yaw: 0.32, pitch: -0.21 },
//                         image: tipImage,
//                         size: { width: 32, height: 32 },
//                         anchor: 'bottom center',
//                         zoomLvl: 100,
//                         tooltip: '椅子. <b>Click me!</b>',
//                         // content: document.getElementById('lorem-content').innerHTML,
//                     },


//                     {
//                         id: 'marker-desk',
//                         position: { yaw: 0.58, pitch: -0.21 },
//                         image: tipImage,
//                         size: { width: 32, height: 32 },
//                         anchor: 'bottom center',
//                         zoomLvl: 100,
//                         tooltip: '桌子. <b>Click me!</b>',
//                         // content: document.getElementById('lorem-content').innerHTML,
//                     },

//                     {
//                         id: 'marker-door',
//                         position: { yaw: 1.2, pitch: -0.21 },
//                         image: tipImage,
//                         size: { width: 32, height: 32 },
//                         anchor: 'bottom center',
//                         zoomLvl: 100,
//                         tooltip: '门. <b>Click me!</b>',
//                         // content: document.getElementById('lorem-content').innerHTML,
//                     },

//                     {
//                         id: 'marker-window',
//                         position: { yaw: -0.35, pitch: -0.1 },
//                         image: tipImage,
//                         size: { width: 32, height: 32 },
//                         anchor: 'bottom center',
//                         zoomLvl: 100,
//                         tooltip: '窗户. <b>Click me!</b>',
//                         // content: document.getElementById('lorem-content').innerHTML,
//                     },



//                     {
//                         id: 'marker-stove',
//                         position: { yaw: -0.95, pitch: -0.45 },
//                         image: tipImage,
//                         size: { width: 32, height: 32 },
//                         anchor: 'bottom center',
//                         zoomLvl: 100,
//                         tooltip: '炉子',
//                         // content: document.getElementById('lorem-content').innerHTML,
//                     },

//                 ],
//             }],
//         ],
//     });


//     let markersPlugin = viewer.getPlugin(MarkersPlugin);

//     markersPlugin.addEventListener("select-marker", (e, marker, data) => {
//         console.log(e, marker, data);

//         // 点击点位触发该事件
//         // markersPlugin.removeMarker(marker) // 移除标记
//         // markersPlugin.addMarker({}) // 添加标记
//         // markersPlugin.updateMarker({}) // 更新标记
//     });

//     // viewer.stopAnimation().then(() => {
//     //     console.log('此处写自己想要写的业务');

//     // })
// })


const clickHandler = () => {
    const pos = viewer.getPosition();
    console.log(pos);
}



</script>




<!-- <script type="text/template" id="tooltip-content">
    <img src="https://photo-sphere-viewer-data.netlify.app/assets/sphere-small.jpg">
    <article>
      <h2>Lorem ipsum</h2>
      <p>
        Vivamus magna. Cras in mi at felis aliquet
        congue. Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis,
        tellus est malesuada tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.
      </p>
    </article>
</script> -->


<style lang="css" scoped>
@import './style.less'
</style>