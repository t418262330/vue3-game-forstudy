<template>
  <el-tooltip :content="cell.desc" placement="top" effect="light" v-if="cell?.type === '传送点'">
    <div class="mapItem animate__animated animate__zoomIn" :style="`background-image: url(${ChuanSongBg});background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;`">
      <div class="mapItem-name">{{ cell.name }}</div>
    </div>
  </el-tooltip>
  <el-tooltip :content="`等级${cell.等级}`" placement="top" effect="light" v-if="cell?.type === '怪物'">
    <div :class="{ isFight: cell.isFight }" class="mapItem animate__animated animate__zoomIn" :style="`background-image: url(${cell.img});background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;`">
      <div class="mapItem-name" :cell="cell">{{ cell.isFight ? '战斗中' : cell.name }}</div>
      <el-progress class="monsterBlood" v-if="cell.isFight" :percentage="monsterDataFightComputed.气血百分比" style="width: 100%;" status="exception"
        :stroke-width="6">
        <span></span>
      </el-progress>
    </div>
  </el-tooltip>

</template>

<script setup>
import ChuanSongBg from '../../assets/img/map/ChuanSongBg.png'
import { monsterDataFightComputed } from '../../gameData/MapFight.js';

defineProps({
  cell: Object
})
</script>

<style lang="scss" scoped>
.isFight {
  scale: 1.5 !important;
}

.monsterBlood {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba($color: #000, $alpha: .6);
  border-radius: 5px;
  :deep(.el-progress__text) {
    display: none;
  }
}

.mapItem {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba($color: #fff, $alpha: .6);
  transition: 0.3s ease-in-out;
  transform-origin: center;
  position: relative;
  border-radius: 5px;

  &:hover {
    scale: 1.2;
  }

  .mapItem-name {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 14px;
    box-sizing: border-box;
    background: rgba($color: #000, $alpha: .6);
    color: #fff;
    padding: 2px;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>