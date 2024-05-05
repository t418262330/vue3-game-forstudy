<template>
  <div class="homeRole animate__animated animate__fadeIn">
    <div style="overflow: hidden;position: relative;">
      <img id="homeRole" class="animate__animated" :src="imgSrc" width="130">
      <!-- <div id="role-damage"></div> -->
      <TransitionGroup name="list" tag="div">
        <div class="role-damage" :class="{ flex: item }" v-for="(item, index) in 人物受伤数据列表" :key="item.key">
          <div class="text-shadow-red" v-if="item.type === '武学伤害'" style="color: red;">{{ item.text }}</div>
          <div class="text-shadow-skyblue" v-if="item.type === '闪避'" style="color: #005eff;">{{ item.text }}</div>
          <div class="text-shadow-green" v-if="item.type === '治疗'" style="color: green;">{{ item.text }}</div>
        </div>
      </TransitionGroup>
      <div class="role-skill" :class="{ flex: item }" v-for="(item, index) in 人物招式数据列表"
        :key="item.key">
        <div class="text-shadow-red" style="color: purple;">{{ item.text }} {{ item.层数 }}层</div>
      </div>
    </div>
    <div class="role">
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div>等级 {{ workData.personData.等级 }}</div>
        <div>{{ workData.personData.门派 }}</div>
        <div>{{ workData.personData.name }}</div>
      </div>
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div style="margin-right: 10px;width: 40px;">气血</div>
        <el-tooltip effect="light" :content="`${personDataComputed.当前气血} / ${personDataComputed.气血}`"
          placement="right">
          <el-progress :percentage="personDataComputed.气血百分比" style="width: 100%;" status="exception" :stroke-width="8">
            <span></span>
          </el-progress>
        </el-tooltip>
      </div>
      <div style="width: 100%;display: flex;align-items: center;justify-content: space-between;">
        <div style="margin-right: 10px;width: 40px;">内力</div>
        <el-tooltip effect="light" :content="`${personDataComputed.当前内力} / ${personDataComputed.内力}`"
          placement="right">
          <el-progress :percentage="personDataComputed.内力百分比" style="width: 100%;" :stroke-width="8">
            <span></span>
          </el-progress>
        </el-tooltip>
      </div>
      <div style="width: 100%;display: flex;;align-items: center;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ personDataComputed.外攻 }}</div>
          <div>外攻</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ personDataComputed.内攻 }}</div>
          <div>内攻</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ personDataComputed.防御 }}</div>
          <div>防御</div>
        </div>
        <el-divider direction="vertical" />
        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
          <div>{{ personDataComputed.身法 }}</div>
          <div>身法</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue';
import { occupationList } from '@/gameData/occupationConfig';
import { workData, personDataComputed } from '@/gameData/workData';
import { userData } from '../../gameData/userData.js';
import { 人物受伤数据列表, 人物招式数据列表 } from '../../gameData/MapFight.js';
import { 服用, 气血药计时, 内力药计时, 装备中的气血药, 装备中的内力药 } from '@/gameData/drugConfig.js';
import { 初始化武学列表,武学列表 } from '@/gameData/skillConfig.js'

const imgSrc = ref(null)

const loadImg = () => {
  imgSrc.value = occupationList.value.find(item => item.门派 === workData.value?.personData.门派).img
}

let 气血内力自动恢复 = ref(null)
const loadAutoRecovery = () => {
  气血内力自动恢复.value = setInterval(() => {
    if (workData.value.personData.当前气血 < personDataComputed.value.气血) {
      workData.value.personData.当前气血 += personDataComputed.value.气血回复
    }
    if (workData.value.personData.当前内力 < personDataComputed.value.内力) {
      workData.value.personData.当前内力 += personDataComputed.value.内力回复
    }
  }, 10000)
}

onMounted(() => {
  // 加载门派背景图
  loadImg()
  // 气血内力自动恢复
  loadAutoRecovery()
  // 初始化武学列表
  初始化武学列表()
})

// 监听人物数据
watch(personDataComputed, (newVal, oldVal) => {
  // 自动吃药
  if (newVal && newVal.当前气血 < newVal.气血 * workData.value.systemConfig.自动吃药.气血临界值 / 100 && workData.value.systemConfig.自动吃药.气血药自动开关 && 装备中的气血药 && 气血药计时.value <= 0) {
    服用(装备中的气血药.value.id)
  }
  if (newVal && newVal.当前内力 < newVal.内力 * workData.value.systemConfig.自动吃药.内力临界值 / 100 && workData.value.systemConfig.自动吃药.内力药自动开关 && 装备中的内力药 && 内力药计时.value <= 0) {
    服用(装备中的内力药.value.id)
  }
  // 当前气血不能超过最大气血
  if (newVal && newVal.当前气血 > newVal.气血) {
    workData.value.personData.当前气血 = newVal.气血
  }
  // 当前内力不能超过最大内力
  if (newVal && newVal.当前内力 > newVal.内力) {
    workData.value.personData.当前内力 = newVal.内力
  }
  // 是否升级
  if (newVal && newVal.当前经验 >= personDataComputed.value.所需经验) {
    workData.value.personData.等级++
    userData.value.roleList.find(item => item.name === workData.value.personData.name).等级 = workData.value.personData.等级
    workData.value.personData.当前经验 = newVal.当前经验 - newVal.所需经验
    // 血量内力恢复
    workData.value.personData.当前气血 = personDataComputed.value.气血
    workData.value.personData.当前内力 = personDataComputed.value.内力
    // 升级提示
    ElMessage({
      message: '恭喜你升级到' + workData.value.personData.等级 + '级',
      type: 'success',
      plain: true,
    })
  }
})
// 监听武学列表
watch(武学列表, (newVal, oldVal) => {
  // debugger
  newVal.forEach(item =>{
    if(item.熟练度 >= item.所需熟练度 && item.层数 < item.最大层数){
      workData.value.skillData.习得武学.find(i => i.name === item.name).层数++
      workData.value.skillData.习得武学.find(i => i.name === item.name).熟练度 -= item.所需熟练度
      ElMessage({
        message: '恭喜阁下 ' + item.name + ' 提升到' + (item.层数+1) + '层',
        type: 'success',
        plain: true,
      })
    }
  })
})
</script>

<style lang="scss" scoped>
.role-damage {
  position: absolute;
  width: 70px;
  height: 70px;
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

.role-skill {
  position: absolute;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  bottom: 10px;
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