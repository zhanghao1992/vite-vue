<!--
 * @Author: zhanghao
 * @Date: 2025-04-05 16:40:52
 * @LastEditors: zhanghao
 * @LastEditTime: 2025-04-05 17:02:08
 * @Description: 
 * @FilePath: /vite-vue/src/pages/Demo2/MyTip.vue
-->
<template>
    <el-popover title="Title" content="Top Left prompts info" placement="top-start">
        <template #reference>
            <el-button type="primary" icon="Search" @click="handleButtonClick">Click me</el-button>
        </template>
    </el-popover>

</template>



<script setup>
import {
    Search,
} from '@element-plus/icons-vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import { ref, unref, getCurrentInstance, reactive, watch, onMounted } from 'vue'

const handleButtonClick = () => {
    alert('click')
}
</script>

<style scoped>
.x {
    background-color: aliceblue;
}
</style>