<template>
  <div class="home-wrap">
    <div class="home-map animate__animated animate__fadeIn">
      <Map></Map>
      <MenuBag></MenuBag>
    </div>
    <div class="home-bottom animate__animated animate__fadeIn">
      <div>
        <HomeEquipment></HomeEquipment>
      </div>
      <div>
        <HomeRole></HomeRole>
      </div>
      <div>
        <HomeMonster class="animate__animated animate__fadeIn" v-if="人物状态 === '战斗中'"></HomeMonster>
        <div v-else class="animate__animated animate__fadeIn">2</div>
      </div>
      <div>
        <HomeMenu></HomeMenu>
      </div>
    </div>
    <div class="exp-wrap animate__animated animate__fadeIn" draggable="true"
      style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
      <el-tooltip effect="light" :content="`${workData.personData.当前经验} / ${personDataComputed.所需经验}`" placement="top">
        <el-progress :percentage="personDataComputed.经验百分比" style="width: 100%;" status="success" :stroke-width="8">
          <span></span>
        </el-progress>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import Map from '../components/map/Map.vue';
import HomeRole from '../components/home/HomeRole.vue';
import HomeMonster from '../components/home/HomeMonster.vue';
import HomeMenu from '../components/home/HomeMenu.vue';
import HomeEquipment from '../components/home/HomeEquipment.vue';
import MenuBag from '../components/menu/MenuBag.vue';

import { 人物状态 } from '../gameData/MapFight.js';
import { workData, personDataComputed } from '@/gameData/workData';
</script>

<style lang="scss" scoped>
.home-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('../assets/img/homeMenu/菜单背景2.png');

  .home-map {
    flex: 1;
    display: flex;
  }

  .home-bottom {
    height: 150px;
    display: flex;

    >div {
      flex: 2;
      border-radius: 5px;
      margin: 4px 2px;
      transition: all 0.5s;
    }
  }

  .exp-wrap {
    :deep(.el-progress__text) {
      display: none;
    }
  }
}
</style>