<template>
  <el-dialog v-model="visible" :append-to-body=true width="900" :show-close="false">
    <template #header>
    </template>
    <div class="menu-role">
      <div class="menu-title">宝石</div>
      <div class="menu-content">
        <div class="menu-title2">门派武学</div>
        <div class="skill-list">
          <SkillItem style="margin-right: 12px;" :skill="item" v-for="(item, index) in 门派武学列表" :key="index"></SkillItem>
        </div>
        <div class="menu-title2">江湖武学</div>
        <div class="skill-list">
          <SkillItem style="margin-right: 12px;" :skill="item" v-for="(item, index) in 通用武学列表" :key="index"></SkillItem>
        </div>
        <div class="menu-title2">装备中</div>
        <div class="skill-list">
          <SkillItem style="margin-right: 12px;" :skill="item" v-for="(item, index) in 上阵武学列表" :key="index"></SkillItem>
        </div>
      </div>
    </div>
  </el-dialog>
  <div class="homeMenu-item-wrap">
    <div class="homeMenu-item" @click="visible = true">宝石</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SkillItem from './modules/SkillItem.vue';
import { 门派武学列表, 通用武学列表, 上阵武学列表 } from '@/gameData/skillConfig';
const visible = ref(false)
</script>

<style lang="scss" scoped>
.skill-list {
  display: flex;
}

.item-wrap {
  display: flex;
  width: 100%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  width: 50%;
  box-sizing: border-box;

  .item-title {
    font-weight: 600;
  }

  .item-content {
    color: #e9814d;
    font-size: 16px;
    font-weight: 600;
  }
}

.menu-title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.menu-title2 {
  font-size: 18px;
  font-weight: 600;
  padding: 3px 10px;
  background-color: rgba(129, 59, 2, 0.2);
  border-radius: 4px;
  width: fit-content;
  margin: 15px 0 5px;
}

.menu-role {
  border-radius: 10px;
  padding: 10px;
  background-image: url('../../assets/img/homeMenu/菜单背景2.png');
  position: relative;
  top: -8px;
  transform: scale(1.1);
}

.menu-content {
  width: 100%;
  height: 450px;
  margin-top: 20px;
}

.homeMenu-item-wrap {
  width: 20%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .homeMenu-item {
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/homeMenu/菜单背景.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>