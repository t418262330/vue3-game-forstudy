<template>
  <el-card class="item-detail">
    <template #header>
      <div class="card-header">
        <span>宝石选择</span>
      </div>
    </template>
    <div class="item-wrap">
      <div class="homeEquipment">
        <div class="homeEquipment-item-wrap" v-for="(i, index) in gemstoneList2" :key="index">
          <div class="homeEquipment-item" @click="镶嵌宝石(item.id,i)">
            <item placement="top" v-if="i" :item="i" ></item>
          </div>
        </div>
      </div>
    </div>
    <div class="item-btn">
      <!-- <div @click="sell()">出售</div> -->
    </div>
  </el-card>
</template>

<script setup>
const props = defineProps(['item'])
import { gemstoneList, 镶嵌宝石,装备可镶嵌宝石 } from '@/gameData/gemstoneConfig'
import Item from '../Item.vue';
import { computed } from 'vue';

const gemstoneList2 = computed(() => {
  return gemstoneList.value.filter(i => 装备可镶嵌宝石[props.item.type2].includes(i.type2))
}) 
</script>

<style lang="scss" scoped>
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

.homeEquipment {
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;

  .homeEquipment-item-wrap {
    display: flex;
    justify-content: center;
    align-items: center;

    .homeEquipment-item {
      width: 45px;
      height: 45px;
      background-color: rgba(255, 255, 255, 0.938);
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      position: relative;
      margin-left: 0;

      &:hover {
        background-color: rgba(218, 190, 167, 0.5);
      }
    }
  }
}
</style>