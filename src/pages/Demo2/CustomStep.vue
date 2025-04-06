<!--
 * @Author: zhanghao
 * @Date: 2025-04-05 11:31:39
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-05 20:32:23
 * @Description: 
 * @FilePath: /vite-vue/src/pages/Demo2/CustomStep.vue
-->
<template>
    <div v-if="state.visible">
        <span class="device-icon" ref="iconRef"
            :style="{ position: 'absolute', left: state.position?.x + 'px', top: state.position?.y + 'px', zIndex: 20, width: marker.config.size.width + 'px', height: marker.config.size.height + 'px' }">
            <el-icon :size="20" @click="() => {
                emit('click-action', marker, '切换');
            }">
                <WindPower />
            </el-icon>

        </span>
    </div>
</template>

<script setup>
import {
    WindPower,
} from '@element-plus/icons-vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ref, unref, getCurrentInstance, reactive, watch, onMounted } from 'vue'

const { visible, marker } = defineProps(['visible', 'marker'])
const emit = defineEmits(['click-action']);

const instance = getCurrentInstance();
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
}

defineExpose({ updatePosition })

</script>

<style scoped>
.device-icon {
    width: 32px;
    height: 32px;
    background: #409eff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}
</style>