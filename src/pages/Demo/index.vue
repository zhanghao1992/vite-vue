<!--
 * @Author: zhanghao
 * @Date: 2025-03-25 21:54:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-05 10:20:59
 * @Description: 北京demo
 * @FilePath: /vite-vue/src/pages/Demo/index.vue
-->
<template>
    <div class="viewerWrapper">
        <div class="my-tab">
            <el-segmented v-model="state.currentImg" :options="options" />
            {{ `${state.activeMarker}px` }}{{ state.num }}
        </div>

        <MyToolTip :info="{ name: '打印机' }" />
        <MyToolTip v-show="state.activeMarker !== null" :info="{ name: '打印机' }"
            :style="{ left: `${state.activeMarker?.position?.x}px`, top: `${state.activeMarker?.position?.y}px` }" />


        <CustomTooltip ref="tooltipRef" @custom-action="handleCustomAction">
            <!-- 可覆盖默认插槽 -->
            <template #default="{ marker }">
                自定义内容: {{ marker.config.id }}
                <el-button type="primary" @click="handleClick(marker)" size="small">点击</el-button>
            </template>
        </CustomTooltip>


        <!-- <MyToolTip :info="{ name: '打印机' }" :style="{ left: '882px' }" /> -->
        <div id="viewer" ref="viewerDom"></div>

    </div>

</template>

<script setup>
import MyToolTip from "./toolTip.vue";
import CustomTooltip from './CustomTooltip.vue';

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
    currentImg: options[0],
    activeMarker: null,
    num: 0
})
// const activeMarkerState = reactive({
//     marker: null,
//     position: null
// })

const viewerDom = ref(null)
let viewer = null
let markersPlugin = null
const tooltipRef = ref(null)

let debounceTimer = null

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
        // markersPlugin.addMarker({
        //     id: 'info',
        //     image: tipImage,
        //     position: { yaw: 0.32, pitch: 0 },
        //     size: { width: 32, height: 32 },
        //     tooltip: '此处是地标',
        // });
        const { data, state } = e.marker
        console.log(data);

        if (data.name === 'marker2') {
            setActiveMarker({
                marker: e.marker,
                position: state.position2D
            })
        } else if (data.name === 'marker3') {
            console.log(tooltipRef);

            tooltipRef.value.show(e.marker, viewer)
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
    viewer.addEventListener('render', debounceUpdate);

}


const debounceUpdate = () => {
    if (!debounceTimer) {
        debounceTimer = requestAnimationFrame(() => {
            console.log('requestAnimationFrame');

            if (tooltipRef.value) {
                tooltipRef.value.updatePosition()
            };
            debounceTimer = null;
        });
    }
}


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