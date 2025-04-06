<!--
 * @Author: zhanghao
 * @Date: 2025-04-05 11:31:39
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-06 09:01:11
 * @Description: 
 * @FilePath: /vite-vue/src/pages/Demo2/CustomPopover.vue
-->
<template>
    <div v-if="state.visible">
        <!-- <el-button v-popover="popoverRef" v-click-outside="onClickOutside"
            :style="{ position: 'absolute', left: state.position?.x + 'px', top: state.position?.y + 'px', zIndex: 20 }"
            :icon="Edit" circle></el-button> -->

        <el-tooltip ref="tipRef" effect="dark" content="我是一个element-plus tooltip" placement="top" :visible="true">
            <span class="device-icon" ref="iconRef"
                :style="{ position: 'absolute', left: state.position?.x + 'px', top: state.position?.y + 'px', zIndex: 20, width: marker.config.size.width + 'px', height: marker.config.size.height + 'px' }">
                <LocationInformation />
            </span>
        </el-tooltip>


        <el-tooltip ref="popoverRef" placement="bottom" effect="dark" trigger="click" virtual-triggering persistent
            :virtual-ref="iconRef">
            <template #content>
                <div class="devicePannel min-w-40">
                    <div class="item">
                        <span class="text-9xl">设备名称：</span><span> {{ marker.config.data.deviceName }}
                        </span>
                    </div>
                    <div class="item">
                        <span class="text-base/16">状态：</span><span class="text-green-300"> 正常
                        </span>
                    </div>
                    <div class="item">
                        <span class="text-base/16">电压：</span><span> 220V
                        </span>
                    </div>
                    <div class="flex justify-between pt-[10px]">
                        <el-button type="primary" size="small" @click="() => {
                            emit('click-action', marker, '开始按钮');
                        }">开始</el-button>
                        <el-button type="primary" size="small" @click="() => {
                            emit('click-action', marker, '结束按钮');
                        }">结束</el-button>
                    </div>
                </div>
            </template>
        </el-tooltip>

        <!-- <el-popover 
        ref="popoverRef" 
        trigger="click" 
        :title="`标题-${marker.config.id}`" 
        virtual-triggering persistent
        :virtual-ref="iconRef">
            <span> {{ marker.config.data.content }} </span>
            <div>
                <el-button type="primary" size="small" @click="() => {
                    emit('click-action', marker, '开始按钮');
                }">开始</el-button>
                <el-button type="primary" size="small" @click="() => {
                    emit('click-action', marker, '结束按钮');
                }">结束</el-button>
            </div>
        </el-popover> -->
    </div>
</template>

<script setup>
import {
    LocationInformation,
} from '@element-plus/icons-vue'

import { ClickOutside as vClickOutside } from 'element-plus'
import { ref, unref, getCurrentInstance, reactive, watch, onMounted } from 'vue'

const { visible, marker } = defineProps(['visible', 'marker'])
const emit = defineEmits(['click-action']);

const instance = getCurrentInstance();
const tipRef = ref()
const popoverRef = ref()
const iconRef = ref()

const state = reactive({
    visible: visible || true,
    position: {
        x: marker.state?.position2D?.x || 0,
        y: marker.state?.position2D?.y || 0
    }
})

const onClickOutside = () => {
    unref(popoverRef).popperRef?.delayHide?.()
}


onMounted(() => {
    console.log(marker.config.size);
})

const handleButtonClick = () => {
    console.log('click 按钮', marker.config.data);
}


const updatePosition = () => {
    if (marker?.state?.position2D) {
        state.visible = true;
        state.position = {
            x: marker.state.position2D.x,
            y: marker.state.position2D.y,
        };
    } else {
        state.visible = false;
    }
    instance.proxy.$forceUpdate(); // 强制更新当前组件
    tipRef.value?.updatePopper();
    popoverRef.value?.updatePopper();
}

defineExpose({ updatePosition })

</script>

<style scoped>
.device-icon {
    width: 32px;
    height: 32px;
    background: #1296db;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.devicePannel {
    .item {
        font-size: 14px;
        line-height: 20px;
    }
}
</style>