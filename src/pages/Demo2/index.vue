<!--
 * @Author: zhanghao
 * @Date: 2025-03-25 21:54:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-08 10:25:07
 * @Description: 北京demo
 * @FilePath: /vite-vue/src/pages/Demo2/index.vue
-->
<template>
    <div class="viewerWrapper">
        <!-- <div class="my-tab">
            <el-segmented v-model="state.currentScene" :options="options" />
        </div> -->

        <div id="viewer" ref="viewerDom"></div>

        <div class="absolute left-0 top-6 flex gap-3 justify-center ">
            <div class="w-1/12 " :class="{
                'ring-2': scene.name === state.currentScene.name
            }" v-for="scene in sceneConfig" @click="state.currentScene = scene">
                <img :src="scene.img" class="" />
            </div>
        </div>

        <CustomPopover v-for="(marker) in state.customMarkers" :ref="(el) => setRefMap(el, marker)" :visible="true"
            :marker="marker" @click-action="handleClickAction">
        </CustomPopover>

        <CustomStep v-for="(marker) in state.customStepMarkers" :ref="(el) => setRefMap(el, marker)" :visible="true"
            :marker="marker" @click-action="handleClickAction">
        </CustomStep>
    </div>
</template>




<script setup>
import CustomPopover from "./CustomPopover.vue";
import CustomTooltip from "./CustomTooltip.vue";
import DirectionSign from "./DirectionSign.vue";
import CustomStep from "./CustomStep.vue";
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
import { Viewer, utils } from '@photo-sphere-viewer/core';


import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin';

import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';



import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin';
import '@photo-sphere-viewer/markers-plugin/index.css'

import { sceneConfig } from './config'


import image from './images/GS__0172.jpg'
import tipImage from './images/icon/tip.png'
import { ref, unref, reactive, watch, onMounted, onUpdated } from 'vue'

import loadingImg from './images/icon/loading.gif'

import { useDocumentVisibility } from '@vueuse/core'

//窗口是不是激活状态
const visibility = useDocumentVisibility()

const options = sceneConfig.map(i => i.name)

const state = reactive({
    currentScene: sceneConfig[0],
    markers: [],
    customMarkers: [],
    customStepMarkers: [],
    needHideMarkers: [],
    activeMarker: null,
})


const viewerDom = ref(null)

let viewer = null

let markersPlugin = null
let autorotate = null

let debounceTimer = null

const refMap = ref({})

let isInit = true
const animatedValues = {
    pitch: { start: -Math.PI / 2, end: 0 },
    yaw: { start: Math.PI / 2, end: 0 },
    zoom: { start: 0, end: 50 },
    maxFov: { start: 130, end: 90 },
    fisheye: { start: 2, end: 0 },
};

const setRefMap = (el, marker) => {
    if (el) {
        refMap.value[marker.config.id] = el
    }
}

watch(() => state.currentScene, (newVal) => {
    changeScene(newVal)
})

watch(() => state.markers, (newVal) => {
    state.customMarkers = newVal.filter(m => m.config.data.type === 'custom')
    state.customStepMarkers = newVal.filter(m => m.config.data.type === 'customStep')
    state.needHideMarkers = newVal.filter(m => m.config.data.type !== 'default').map(m => m.config.id)
})

watch(visibility, (val) => {
    //todo 想在窗口未激活时暂停动画但是没有生效
    if (val === 'hidden') {
        autorotate.stop();
    } else {
        autorotate.start();
    }

})

onUpdated(() => {
    console.log(state.needHideMarkers);
    state.needHideMarkers.forEach(id => {
        document.querySelector(`#psv-marker-${id}`).style.display = 'none'
    })
})

const changeScene = (scene) => {
    viewer.setPanorama(scene.img, {
        zoom: 50
    }).then(() => {
        makeMarkers(viewer, scene)
        if (!autorotate.isEnabled()) {
            autorotate.start();
        }
    })
}


const setActiveMarker = (markerData) => {
    state.activeMarker = markerData
}
/**
 * @description: 初始化viewer
 * @param {*} imgData
 * @return {*}
 */
const initViewer = (sceneData) => {
    if (viewer) destroyViewer()
    viewer = new Viewer({
        container: viewerDom.value,
        panorama: sceneData?.img,
        caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',
        // 设置图片描述
        description: "这是一个描述,xxxxxxxxxxxxxxxxx",
        loadingImg,
        defaultPitch: animatedValues.pitch.start,
        defaultYaw: animatedValues.yaw.start,
        defaultZoomLvl: animatedValues.zoom.start,
        maxFov: animatedValues.maxFov.start,
        fisheye: animatedValues.fisheye.start,
        size: {
            width: '100%',
            height: '100%'
        },
        navbar: ['zoom', 'move', 'download', 'fullscreen'],
        plugins: [
            [AutorotatePlugin, {
                autostartDelay: null,
                autostartOnIdle: false,
                autorotatePitch: 0,
                autorotateSpeed: '0.2rpm',
            }],
            [MarkersPlugin, {}],
            [GyroscopePlugin, {}]
        ],
    });

    markersPlugin = viewer.getPlugin(MarkersPlugin);

    autorotate = viewer.getPlugin(AutorotatePlugin);

    initEvents(viewer, sceneData)
}

/**
 * @description: 初始化事件
 * @return {*}
 */
const initEvents = (viewer, sceneData) => {
    viewer.addEventListener('click', (e, data) => {
        // 点击全景图事件
        console.log('click e:', e)

        state.activeMarker = null
        // autorotate.toggle()

        autorotate.stop();
        setTimeout(() => autorotate.start(), 5000);
    })


    viewer.addEventListener('position-updated', (e) => {
        // console.log(e.position)
        // console.log('相面移动');

    });

    // viewer.addEventListener('dblclick', ({ data }) => {
    //     viewer.animate({
    //         yaw: data.yaw,
    //         pitch: data.pitch,
    //         zoom: 100,
    //         speed: 1000,
    //     });
    // });

    viewer.addEventListener('zoom-updated', ({ zoomLevel }) => {
        // console.log(`new zoom level is ${zoomLevel}`);
    });


    // 在 addMarker 后添加事件监听
    markersPlugin.addEventListener('select-marker', (e) => {
        const { data, state } = e.marker
        console.log(data);
        if (data.type === 'customStep') {
            viewer.animate({
                yaw: data.yaw,
                pitch: data.pitch,
                zoom: data.zoom,
                speed: '15rpm',
            })
        }

        // console.log('marker在屏幕上的坐标', e.marker.state.position2D);
    });


    viewer.addEventListener('ready', () => {
        console.log(`viewer is ready`);

        // markersPlugin.hideMarker('marker1')
        // markersPlugin.showMarker('marker1')
        // markersPlugin.showMarkerTooltip('marker1')


        // viewer.zoom(0)

        makeMarkers(viewer, sceneData)
        if (isInit) {
            intro(animatedValues.pitch.end, animatedValues.pitch.end);
        }
    });

    // 在 render 事件中使用防抖更新位置
    viewer.addEventListener('render', debounceUpdate);
}

const makeMarkers = (_, sceneData) => {
    if (markersPlugin) {
        markersPlugin.clearMarkers()
        sceneData.markers.forEach(m => {
            console.log(m);

            markersPlugin.addMarker(m)
            if (m.autoShow) {
                markersPlugin.showMarkerTooltip(m.id)
            }
        })
        state.markers = markersPlugin.getMarkers()
    }
}

/**
 * @description: 更新tip位置
 * @return {*}
 */
const debounceUpdate = () => {
    if (!debounceTimer) {
        debounceTimer = requestAnimationFrame(() => {
            Object.keys(refMap.value).forEach(key => {
                refMap.value[key]?.updatePosition()
            })
            debounceTimer = null;
        });
    }
}

const intro = (pitch, yaw) => {
    isInit = false;
    autorotate.stop();
    viewer.navbar.hide();

    new utils.Animation({
        properties: {
            ...animatedValues,
            pitch: { start: animatedValues.pitch.start, end: pitch },
            yaw: { start: animatedValues.yaw.start, end: yaw },
        },
        duration: 2500,
        easing: 'inOutQuad',
        onTick: (properties) => {
            viewer.setOptions({
                fisheye: properties.fisheye,
                maxFov: properties.maxFov,
            });
            viewer.rotate({ yaw: properties.yaw, pitch: properties.pitch });
            viewer.zoom(properties.zoom);
        },
    }).then(() => {
        autorotate.start();
        viewer.navbar.show();
        viewer.setOptions({
            mousemove: true,
            mousewheel: true,
        });
    });
}
/**
 * @description: 销毁viewer实例
 * @return {*}
 */
const destroyViewer = () => {
    if (viewer) try {
        viewer.destroy()
    } catch (e) {
        viewerDom.value.removeChild(viewer.childNodes[0])
    }
}

onMounted(() => {
    initViewer(sceneConfig[0])
    // changeScene(sceneConfig[0])
})


const handleClickAction = (marker, data) => {
    console.log('handleClickAction', marker, data);

    if (marker.config.data.to) {
        const sceneData = sceneConfig.find(item => item.name === marker.config.data.to)
        state.currentScene = sceneData
    }
}
</script>





<style lang="css" scoped>
@import './style.less'
</style>