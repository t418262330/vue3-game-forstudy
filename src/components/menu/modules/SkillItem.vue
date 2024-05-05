<template>
  <el-popover v-if="skill" placement="top-start" trigger="hover" transition="false" :show-arrow="false" popper-style="background: none !important;
  border: none !important;
  width: auto !important;
  box-shadow: none;">
    <template #reference>
      <div class="skillWrap" :class="{ grayScale: !skill.是否解锁 }">
        <img class="skillItem" :src="skill.img" alt="" />
        <div v-if="time && skill.倒计时> 0" class="itemSkill">{{ skill.倒计时 }}</div>
      </div>
    </template>
    <el-card class="item-detail" v-if="skill">
      <template #header>
        <div class="card-header">
          <span style="box-shadow: none;background-color: rgba(0, 0, 0, 0);font-weight: 600;font-size: 20px;">{{
            skill?.name }}</span>
          <span v-if="!skill.是否解锁">尚未习得</span>
          <span v-if="skill.是否首选">主技能</span>
        </div>
      </template>
      <div class="item-wrap">
        <p>简介：{{ skill.desc }} </p>
        <p>层数：{{ skill.层数 }} / {{ skill.最大层数 }}</p>
        <p v-if="skill.最大层数 == 1">熟练度：无</p>
        <p v-else>熟练度：{{ skill.熟练度 }} / {{ skill.所需熟练度 }}</p>
        <p>内力消耗：{{ skill.内力消耗 }}</p>
        <p>冷却时间：{{ skill.冷却时间 === 0 ? '无' : skill.冷却时间 }}</p>
        <p>附加伤害：{{ skill.附加伤害 }}</p>
      </div>
      <div class="btn" v-if="!skill.是否解锁 && btn" @click="学习武学(skill.name)">学习</div>
      <div class="btn" v-if="skill.冷却时间 === 0 && skill.是否首选 === false && skill.是否解锁 && skill.是否上阵"
        @click="设为首选(skill.name)">设为首选</div>
      <div class="btn" v-if="!skill.是否上阵 && skill.是否解锁 && btn && skill.name !== '普通攻击'" @click="上阵武学(skill.name)">装备</div>
      <div class="btn" v-if="skill.是否上阵 && skill.是否解锁 && btn" @click="下阵武学(skill.name)">卸下</div>
    </el-card>
  </el-popover>
</template>

<script setup>
import { 设为首选, 学习武学, 上阵武学, 下阵武学 } from '../../../gameData/skillConfig.js'
const props = defineProps({
  skill: Object,
  btn: {
    type: Boolean,
    default: true
  },
  time: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
.itemSkill {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  color: #fff;
  background-color: rgba($color: #000000, $alpha: 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.item-detail {
  position: relative;
  width: 300px;
  // height: 640px;
  background-image: url('../../../assets/img/homeMenu/菜单背景2.png');
  background-repeat: no-repeat;
  border-radius: 5px;
  box-sizing: border-box;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
  }
}

.item-btn {
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;

  >div {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(129, 59, 2, 0.2);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(129, 59, 2, 0.5);
    }

    padding: 5px 8px;
  }
}

.skillWrap {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  position: relative;
}

.skillItem {
  width: 120%;
  height: 120%;
}
</style>