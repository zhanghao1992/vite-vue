<!--
 * @Author: zhanghao
 * @Date: 2025-04-03 21:02:07
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 21:58:34
 * @Description: 
 * @FilePath: /vite-vue/src/pages/Demo/CustomTooltip.vue
-->
<!-- components/CustomTooltip.vue -->
<template>
    <div v-if="visible" class="custom-tooltip" :style="{
        left: `${position.x}px`,
        top: `${position.y}px`,
    }" @mouseenter="hoverTooltip" @mouseleave="leaveTooltip">
        <slot :marker="currentMarker">
            <!-- 默认插槽内容 -->
            {{ currentMarker?.config.tooltip?.content }}
            <el-button @click="handleButtonClick" type="primary" size="small">默认按钮</el-button>
        </slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            position: { x: 0, y: 0 },
            currentMarker: null,
        };
    },
    methods: {
        // 更新 Tooltip 位置
        updatePosition(viewer, marker) {
            console.log(this.currentMarker);

            if (this.currentMarker?.state?.position2D) {
                this.position = {
                    x: this.currentMarker.state.position2D.x - 50,
                    y: this.currentMarker.state.position2D.y - 50,
                };
            } else {
                this.currentMarker = null;
                this.visible = false;
            }


        },
        // 激活 Tooltip
        show(marker, viewer) {
            console.log('show');

            this.currentMarker = marker;
            this.updatePosition(viewer, marker);
            this.visible = true;
        },
        // 隐藏 Tooltip
        hide() {
            this.visible = false;
            this.currentMarker = null;
        },
        // 防止 Tooltip 关闭（当鼠标在 Tooltip 上时）
        hoverTooltip() {
            this.visible = true;
        },
        leaveTooltip() {
            // this.visible = false;
        },
        // 按钮点击事件
        handleButtonClick() {
            this.$emit('custom-action', this.currentMarker);
            this.hide();
        },

    },
};
</script>

<style>
.custom-tooltip {
    position: absolute;
    z-index: 9999;
    background: white;
    padding: 8px 12px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    /* 允许点击 */
}
</style>