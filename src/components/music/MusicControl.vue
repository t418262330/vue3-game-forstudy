<template>
  <div class="musicControl">
    <audio id="music" loop :src="musicSrc" autoplay />
  </div>
</template>

<script setup>
import { musicSrc, setMusicBg } from '../../gameData/musicBgConfig.js'
import { workData } from '../../gameData/workData.js'



import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

//监听地图变化，更改音乐
watch(() => workData, (newVal, oldVal) => {
  if (route.path !== '/home') {
    return
  }
  setMusicBg(newVal.value?.mapData.当前地图)
}, { deep: true })
//监听路由变化，更改音乐
watch(() => route, (newVal, oldVal) => {
  if (newVal.path !== '/home') {
    setMusicBg('login')
    return
  }
  // 新角色初始化出生地图
  if (!workData.value.mapData.当前地图) {
    workData.value.mapData.当前地图 = workData.value.personData.门派
  }
  setMusicBg(workData.value?.mapData.当前地图)
}, { deep: true })
</script>

<style lang="scss" scoped></style>