<template>
  <div class="homeRole">
    <div class="role">
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div>等级 {{ 怪物数据.等级 }}</div>
        <div>怪物</div>
        <div>{{ 怪物数据.name }}</div>
      </div>
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div style="margin-right: 10px;width: 40px;">气血</div>
        <el-tooltip effect="light" :content="`${怪物数据.当前气血} / ${monsterDataFightComputed.气血}`" placement="right">
          <el-progress :percentage="monsterDataFightComputed.气血百分比" style="width: 100%;" status="exception"
            :stroke-width="8">
            <span></span>
          </el-progress>
        </el-tooltip>
      </div>
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div style="margin-right: 10px;width: 40px;">内力</div>
        <el-tooltip effect="light" :content="`${怪物数据.当前内力} / ${monsterDataFightComputed.内力}`" placement="right">
          <el-progress :percentage="monsterDataFightComputed.内力百分比" style="width: 100%;" :stroke-width="8">
            <span></span>
          </el-progress>
        </el-tooltip>
      </div>
      <div style="width: 100%;display: flex;;align-items: center;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ 怪物数据.外攻 }}</div>
          <div>外攻</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ 怪物数据.内攻 }}</div>
          <div>内攻</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ 怪物数据.防御 }}</div>
          <div>防御</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ 怪物数据.身法 }}</div>
          <div>身法</div>
        </div>
      </div>
    </div>
    <div style="overflow: hidden;position: relative;">
      <img id="homeMonster" class="animate__animated" :src="怪物数据.img" width="130">
      <!-- <div id="monster-damage" class="animate__animated animate__fadeOut"></div> -->
      <TransitionGroup name="list" tag="div">
        <div class="monster-damage" :class="{ flex: item }" v-for="(item, index) in 怪物受伤数据列表" :key="item.key">
          <div class="text-shadow-red hit" v-if="item.type === '武学伤害'" style="color: red;" :style="`background-image:url(${item.img})`">{{ item.text }}</div>
          <div class="text-shadow-skyblue" v-if="item.type === '闪避'" style="color: #005eff;">{{ item.text }}</div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { 怪物数据, monsterDataFightComputed, 怪物受伤数据列表,人物受伤数据列表 } from '../../gameData/MapFight.js';
import { onUnmounted } from 'vue';

onUnmounted(() => {
  怪物受伤数据列表.value = []
  人物受伤数据列表.value = []
})
</script>

<style lang="scss" scoped>
.monster-damage {
  width: 70px;
  height: 70px;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -35px;
  margin-top: -35px;
  display: none;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  >div {
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.list-leave-active {
  transition: all 0.5s;
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-60px);
  transition-delay: 0ms;
}

.homeRole {
  height: 100%;
  // background-color: aqua;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
}

.role {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  box-sizing: border-box;
  align-items: center;
  font-size: 14px;
}

.medicine {
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.el-progress__text) {
  min-width: 0 !important;
}

.flex {
  display: flex;
}
</style>