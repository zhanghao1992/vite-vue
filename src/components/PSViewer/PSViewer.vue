<!--
 * @Author: zhanghao
 * @Date: 2025-03-25 21:54:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-03-29 21:45:57
 * @Description: 
 * @FilePath: /vite-vue/src/components/PSViewer/PSViewer.vue
-->
<template>
    <div id="viewer" ref="viewerDom"></div>
    <el-button @click="clickHandler">操作</el-button>
    <el-button @click="showMessage" type="primary"> ElementUI - Plus</el-button>

</template>

<script setup>
import { onMounted } from 'vue'
// 必须引入官方提供的样式文件
import '@photo-sphere-viewer/core/index.css';
import { Viewer } from '@photo-sphere-viewer/core';

import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css'



import image from './images/1.awebp'
import image2 from './images/2.awebp'
import tipImage from './images/icon/tip.png'
import { ref } from 'vue'

const viewerDom = ref(null)
let viewer = null

const showMessage = () => {
    ElMessage({
        type: 'success',
        message: '测试成功'
    });
}

onMounted(() => {
    viewer = new Viewer({
        container: viewerDom.value,
        panorama: image,
        caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
        // 设置图片描述
        description: "这是一个描述,xxxxxxxxxxxxxxxxx",
        // touchmoveTwoFingers: true,
        // mousewheelCtrlKey: true,
        loadingImg: './images/icon/loading.gif',
        plugins: [
            [MarkersPlugin, {
                markers: [
                    {
                        id: 'marker-chair',
                        position: { yaw: 0.32, pitch: -0.21 },
                        image: tipImage,
                        size: { width: 32, height: 32 },
                        anchor: 'bottom center',
                        zoomLvl: 100,
                        tooltip: '椅子. <b>Click me!</b>',
                        // content: document.getElementById('lorem-content').innerHTML,
                    },


                    {
                        id: 'marker-desk',
                        position: { yaw: 0.58, pitch: -0.21 },
                        image: tipImage,
                        size: { width: 32, height: 32 },
                        anchor: 'bottom center',
                        zoomLvl: 100,
                        tooltip: '桌子. <b>Click me!</b>',
                        // content: document.getElementById('lorem-content').innerHTML,
                    },

                    {
                        id: 'marker-door',
                        position: { yaw: 1.2, pitch: -0.21 },
                        image: tipImage,
                        size: { width: 32, height: 32 },
                        anchor: 'bottom center',
                        zoomLvl: 100,
                        tooltip: '门. <b>Click me!</b>',
                        // content: document.getElementById('lorem-content').innerHTML,
                    },

                    {
                        id: 'marker-window',
                        position: { yaw: -0.35, pitch: -0.1 },
                        image: tipImage,
                        size: { width: 32, height: 32 },
                        anchor: 'bottom center',
                        zoomLvl: 100,
                        tooltip: '窗户. <b>Click me!</b>',
                        // content: document.getElementById('lorem-content').innerHTML,
                    },



                    {
                        id: 'marker-stove',
                        position: { yaw: -0.95, pitch: -0.45 },
                        image: tipImage,
                        size: { width: 32, height: 32 },
                        anchor: 'bottom center',
                        zoomLvl: 100,
                        tooltip: '炉子',
                        // content: document.getElementById('lorem-content').innerHTML,
                    },

                ],
            }],
        ],
    });


    let markersPlugin = viewer.getPlugin(MarkersPlugin);

    markersPlugin.addEventListener("select-marker", (e, marker, data) => {
        console.log(e, marker, data);

        // 点击点位触发该事件
        // markersPlugin.removeMarker(marker) // 移除标记
        // markersPlugin.addMarker({}) // 添加标记
        // markersPlugin.updateMarker({}) // 更新标记
    });

    // viewer.stopAnimation().then(() => {
    //     console.log('此处写自己想要写的业务');

    // })
})


const clickHandler = () => {
    // viewer.animate({
    //     speed: 2000,
    //     zoom: 88
    // });
    // viewer.enterFullscreen()

    const pos = viewer.getPosition();
    console.log(pos);

    // const level = viewer.getZoomLevel();
    // console.log(level);


    // viewer.rotate({
    //     longitude: 3.493520870365421,
    //     latitude: 0.0863177810938982
    // });

    // viewer.rotate({
    //     x: 229,
    //     y: 968
    // });

    // viewer.setPanorama(image2)

}



</script>


<style lang="css" scoped>
#viewer {
    width: 100%;
    height: calc(100% - 100px);
    background-color: bisque;
}
</style>