<template>
  <div class="menuBag animate__animated animate__fadeIn">
    <div class="bag-wrap">
      <div class="bag-item" v-for="(item, index) in pageItemList" :key="Math.random()">
        <Item :item="item" :needStatus="true" />
        <!-- <div class="bag-item-amount" v-if="item?.amount > 1">{{ item.amount }}</div> -->
      </div>
    </div>
    <div class="page-wrap">
      <div class="page" :class="{ active: pageNo === 1 }" @click="pageNo = 1">1</div>
      <div class="page" :class="{ active: pageNo === 2 }" @click="pageNo = 2">2</div>
      <div class="page" :class="{ active: pageNo === 3 }" @click="pageNo = 3">3</div>
      <div class="page" :class="{ active: pageNo === 4 }" @click="pageNo = 4">4</div>
      <div class="page" :class="{ active: pageNo === 5 }" @click="pageNo = 5">5</div>
    </div>
    <div class="page-gold">
      <span>金钱：{{ workData.personData.金钱 }}</span>
      <span>容量: {{ workData.bagData.背包物品.length }} / {{ workData.bagData.背包容量 }}</span>
    </div>
    <div class="bag-control">
      <span class="btn" @click="clearUnWearItem()">清理装备</span>
      <span class="btn" @click="sortItem()">整理</span>
      <span class="btn" @click="clearAllItem()">清空</span>
    </div>
  </div>
</template>

<script setup>
import { workData } from '../../gameData/workData.js'
import { pageItemList, pageNo, sortItem, clearAllItem, clearUnWearItem } from '../../gameData/itemConfig.js'

import Item from '../item/Item.vue'

</script>

<style lang="scss" scoped>
.menuBag {
  width: 25%;
  height: 680px;
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .bag-wrap {
    // grid 5列8行
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(8, 1fr);
    gap: 10px;
    width: fit-content;

    .bag-item {
      width: 60px;
      height: 60px;
      background-color: rgba(129, 59, 2, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      position: relative;

      .bag-item-amount {
        position: absolute;
        width: 100%;
        box-sizing: border-box;
        bottom: 0;
        right: 0;
        font-size: 14px;
        color: #000;
        padding: 1px 1px;
        border-radius: 5px;
        text-align: right;
      }
    }

    .isSelect {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}

.bag-control {
  width: 340px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 14px;
}



.page-wrap {
  display: flex;
  justify-content: center;
  width: 100%;

  .page {
    width: 60px;
    background-color: rgba(129, 59, 2, 0.2);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: rgba(129, 59, 2, 0.5);
    }

    margin: 5px 5px;
  }

  .active {
    background-color: rgba(129, 59, 2, 0.8);
  }
}

.page-gold {
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  width: 340px;
  box-sizing: border-box;
}
</style>