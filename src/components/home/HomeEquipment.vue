<template>
  <div class="homeEquipment">
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的武器" :item="穿戴中的武器" placement="top"></Item>
        <span v-else>武器</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的手套" :item="穿戴中的手套" placement="top"></Item>
        <span v-else>手套</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的帽子" :item="穿戴中的帽子" placement="top"></Item>
        <span v-else>帽子</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的衣服" :item="穿戴中的衣服" placement="top"></Item>
        <span v-else>衣服</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的腰带" :item="穿戴中的腰带" placement="top"></Item>
        <span v-else>腰带</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的鞋子" :item="穿戴中的鞋子" placement="top"></Item>
        <span v-else>鞋子</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的披风" :item="穿戴中的披风" placement="top"></Item>
        <span v-else>披风</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的项链" :item="穿戴中的项链" placement="top"></Item>
        <span v-else>项链</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的戒指" :item="穿戴中的戒指" placement="top"></Item>
        <span v-else>戒指</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的耳环" :item="穿戴中的耳环" placement="top"></Item>
        <span v-else>耳环</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item">
        <Item v-if="穿戴中的符石" :item="穿戴中的符石" placement="top"></Item>
        <span v-else>符石</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item" @click=服用(装备中的气血药?.id)>
        <Item v-if="装备中的气血药" :item="装备中的气血药" placement="top"></Item>
        <span v-else>血药</span>
      </div>
    </div>
    <div class="homeEquipment-item-wrap">
      <div class="homeEquipment-item" @click="服用(装备中的内力药?.id)">
        <Item v-if="装备中的内力药" :item="装备中的内力药" placement="top"></Item>
        <span v-else>蓝药</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import Item from '../item/Item.vue';
import { 装备宝石属性,穿戴中的武器, 穿戴中的手套, 穿戴中的帽子, 穿戴中的衣服, 穿戴中的腰带, 穿戴中的鞋子, 穿戴中的披风,穿戴中的项链,穿戴中的戒指,穿戴中的耳环,穿戴中的符石,equipmentDataComputed} from '../../gameData/equipmentConfig';
import { 装备中的气血药, 装备中的内力药, 服用 } from '../../gameData/drugConfig';

</script>

<style lang="scss" scoped>
.homeEquipment {
  display: flex;
  flex-wrap: wrap;
  height: 100%;

  .homeEquipment-item-wrap {
    width: 14%;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .homeEquipment-item {
      width: 50px;
      height: 50px;
      background-color: rgba(255, 255, 255, 0.938);
      margin: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      position: relative;
    }
  }
}
</style>