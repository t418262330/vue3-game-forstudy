<template>
    <RouterView @click="startMusic" />
    <MusicControl />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { onMounted, watch } from 'vue'

import { loadUserData, userData } from './gameData/userData'
import { workData, saveWorkData, loadWorkData } from './gameData/workData'

import MusicControl from './components/music/MusicControl.vue'

const startMusic = () => {
    document.getElementById('music').play()
}

// 监听workData，变化则保存
watch(workData, (newVal,oldVal) => {
    saveWorkData()
}, { deep: true })

//读取本地存储的用户数据
onMounted(() => {
    loadUserData()
    // 如果userData中有当前角色，则加载当前角色的数据
    if (userData.value.roleList.find(item => item.current)) {
        loadWorkData(userData.value.roleList.find(item => item.current).name)
    }
})
</script>
<style lang="scss" scoped>
.start {
    position: fixed;
    bottom: 200px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 70px;
    text-align: center;
    cursor: pointer;
    color: #fff;
}
</style>