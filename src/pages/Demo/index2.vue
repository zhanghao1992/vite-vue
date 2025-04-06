<!--
 * @Author: zhanghao
 * @Date: 2025-03-25 21:54:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-05 11:04:56
 * @Description: 北京demo
 * @FilePath: /vite-vue/src/pages/Demo/index2.vue
-->
<template>
    <div class="viewerWrapper">
        <div class="my-tab">
            <el-segmented v-model="state.currentImg" :options="options" />
            {{ `${state.activeMarker}px` }}{{ state.num }}
        </div>

        <div id="viewer" ref="viewerDom"></div>







        <el-popover class="box-item" title="Title" content="Title" :visible="true">
            <template #reference>
                <el-button :style="{ position: 'absolute', left: '500px', top: '500px', zIndex: 20 }" :icon="Edit"
                    circle></el-button>
            </template>
            <template #content>
                <span> Some content </span>
                <span> Some content </span>
                <span> Some content </span>
                <div>
                    <el-button type="primary" size="small">开始</el-button>
                    <el-button type="primary" size=" small">结束</el-button>
                </div>
            </template>
        </el-popover>
    </div>
</template>




<script setup>
import MyToolTip from "./toolTip.vue";
import { ClickOutside as vClickOutside } from 'element-plus'
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'

// 必须引入官方提供的样式文件
import '@photo-sphere-viewer/core/index.css';
import { Viewer } from '@photo-sphere-viewer/core';

import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css'

import { imageConfig } from './config'


import image from './images/GS__0172.jpg'
import tipImage from './images/icon/tip.png'
import { ref, unref, reactive, watch, onMounted } from 'vue'

import loadingImg from './images/icon/loading.gif'


const options = imageConfig.map(i => i.name)

const state = reactive({
    currentImg: options[0],
    activeMarker: null,
    num: 0
})


const viewerDom = ref(null)
let viewer = null
let markersPlugin = null

let debounceTimer = null

const popoverRef = ref()
const onClickOutside = () => {

    console.log('onClickOutside');

    unref(popoverRef).popperRef?.delayHide?.()
}

watch(() => state.currentImg, (newVal, oldVal) => {
    console.log(newVal);
    const index = imageConfig.findIndex(i => i.name === newVal)
    // initViewer(imageConfig[index])
    viewer.setPanorama(imageConfig[index]?.img)

})


const setActiveMarker = (markerData) => {
    state.activeMarker = markerData
}
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

                // 重要：禁用原生 Tooltip
                // hoverTooltip: null,
                // clickTooltip: null
            }],
        ],
    });

    initMarkers()
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
        state.activeMarker = null
    })


    viewer.addEventListener('position-updated', (e) => {
        // console.log(e.position)
    });

    viewer.addEventListener('zoom-updated', ({ zoomLevel }) => {
        // console.log(`new zoom level is ${zoomLevel}`);
    });


    // 在 addMarker 后添加事件监听
    markersPlugin.addEventListener('select-marker', (e) => {

        const { data, state } = e.marker
        console.log(data);

        if (data.name === 'marker2') {
            setActiveMarker({
                marker: e.marker,
                position: state.position2D
            })
        }

        // console.log('marker在屏幕上的坐标', e.marker.state.position2D);
    });

    viewer.addEventListener('ready', () => {
        console.log(`viewer is ready`);

        // markersPlugin.hideMarker('marker1')
        // markersPlugin.showMarker('marker1')
        // markersPlugin.showMarkerTooltip('marker1')
        viewer.animate({
            zoom: 0,
            speed: '-2rpm',
        })

    }, { once: true });

    // 在 render 事件中使用防抖更新位置
    // viewer.addEventListener('render', debounceUpdate);

}

const initMarkers = () => {
    markersPlugin = viewer.getPlugin(MarkersPlugin);
    console.log('markersPlugin', markersPlugin);

    console.log(markersPlugin.getMarkers());


}


// const debounceUpdate = () => {
//     if (!debounceTimer) {
//         debounceTimer = requestAnimationFrame(() => {
//             console.log('requestAnimationFrame');

//             if (tooltipRef.value) {
//                 tooltipRef.value.updatePosition()
//             };
//             debounceTimer = null;
//         });
//     }
// }


const handleCustomAction = (marker) => {
    console.log('自定义事件触发:', marker.config.id);
    // 比如：跳转页面、打开弹窗等
}

const handleClick = (marker) => {
    console.log('高级按钮点击:', marker);
}

const destroyViewer = () => {
    if (viewer) try {
        viewer.destroy()
    } catch (e) {
        console.log(e)
        viewerDom.value.removeChild(viewer.childNodes[0])
    }
}

onMounted(() => {
    initViewer(imageConfig[0])
})


const clickHandler = () => {
    const pos = viewer.getPosition();
    console.log(pos);
}



</script>



<style lang="css" scoped>
@import './style.less'
</style>