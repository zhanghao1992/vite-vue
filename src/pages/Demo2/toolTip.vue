<!--
 * @Author: zhanghao
 * @Date: 2025-04-02 21:40:04
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-03 20:57:54
 * @Description: 
 * @FilePath: /vite-vue/src/pages/Demo/toolTip.vue
-->
<template>
    <div class="tip-box">
        <ul>
            <li class="item">
                <span class="label">设备名称:</span>
                <span class="value">{{ info.name }}</span>
            </li>
            <li class="item">
                <span class="label">状态:</span>
                <span class="value">正常</span>
            </li>
            <li class="item">
                <span class="label">电压:</span>
                <span class="value">220v</span>
            </li>
            <li class="item">
                <span class="label">电流:</span>
                <span class="value">2A</span>
            </li>
        </ul>
        <div>
            <el-button type="primary" @click="handleClick" size="small">点击</el-button>
            <el-button type="primary" @click="handleClick" size="small">点击</el-button>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps(['info'])

const handleClick = () => {
    console.log('click')
}

onMounted(() => {
    // console.log('asdasd')
})

</script>


<style scoped>
.tip-box {
    position: absolute;
    right: 0;
    top: 0;
    width: 200px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 6px;
    z-index: 10;
    color: #fff;
    padding: 10px 20px;
    box-sizing: border-box;
    line-height: 32px;
    font-size: 14px;

    .item {
        display: flex;
        justify-content: flex-start;

        .label {
            width: 70px;
        }
    }
}
</style>