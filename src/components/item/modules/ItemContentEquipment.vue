<template>
  <div class='itemContentEquipment'>
    <div class="未鉴定" v-if="!props.item.extra" @click="开始鉴定()">
      鉴定
    </div>
    <div class="基础属性" v-if="props.item.extra?.装备基础属性">
      <div class="title">装备评分</div>
      <div class="content">
        <p>{{ props.item.extra.装备评分 }}</p>
      </div>
    </div>
    <div class="基础属性" v-if="props.item.extra?.装备基础属性">
      <div class="title">基础属性</div>
      <div class="content">
        <p v-if="props.item.extra.装备基础属性.气血">气血+{{ props.item.extra.装备基础属性.气血 }}</p>
        <p v-if="props.item.extra.装备基础属性.内力">内力+{{ props.item.extra.装备基础属性.内力 }}</p>
        <p v-if="props.item.extra.装备基础属性.外攻">外攻+{{ props.item.extra.装备基础属性.外攻 }}</p>
        <p v-if="props.item.extra.装备基础属性.内攻">内攻+{{ props.item.extra.装备基础属性.内攻 }}</p>
        <p v-if="props.item.extra.装备基础属性.防御">防御+{{ props.item.extra.装备基础属性.防御 }}</p>
        <p v-if="props.item.extra.装备基础属性.身法">身法+{{ props.item.extra.装备基础属性.身法 }}</p>
        <p v-if="props.item.extra.装备基础属性.冰攻击">冰攻击+{{ props.item.extra.装备基础属性.冰攻击 }}</p>
        <p v-if="props.item.extra.装备基础属性.火攻击">火攻击+{{ props.item.extra.装备基础属性.火攻击 }}</p>
        <p v-if="props.item.extra.装备基础属性.玄攻击">玄攻击+{{ props.item.extra.装备基础属性.玄攻击 }}</p>
        <p v-if="props.item.extra.装备基础属性.毒攻击">毒攻击+{{ props.item.extra.装备基础属性.毒攻击 }}</p>
        <p v-if="props.item.extra.装备基础属性.气血回复">气血回复+{{ props.item.extra.装备基础属性.气血回复 }}</p>
        <p v-if="props.item.extra.装备基础属性.内力回复">内力回复+{{ props.item.extra.装备基础属性.内力回复 }}</p>
      </div>
    </div>
    <div class="基础属性" v-if="props.item.extra?.装备附加属性">
      <div class="title">附加属性</div>
      <div class="content">
        <p v-if="props.item.extra.装备附加属性.气血">气血+{{ props.item.extra.装备附加属性.气血 }}</p>
        <p v-if="props.item.extra.装备附加属性.内力">内力+{{ props.item.extra.装备附加属性.内力 }}</p>
        <p v-if="props.item.extra.装备附加属性.外攻">外攻+{{ props.item.extra.装备附加属性.外攻 }}</p>
        <p v-if="props.item.extra.装备附加属性.内攻">内攻+{{ props.item.extra.装备附加属性.内攻 }}</p>
        <p v-if="props.item.extra.装备附加属性.防御">防御+{{ props.item.extra.装备附加属性.防御 }}</p>
        <p v-if="props.item.extra.装备附加属性.身法">身法+{{ props.item.extra.装备附加属性.身法 }}</p>
        <p v-if="props.item.extra.装备附加属性.冰攻击">冰攻击+{{ props.item.extra.装备附加属性.冰攻击 }}</p>
        <p v-if="props.item.extra.装备附加属性.火攻击">火攻击+{{ props.item.extra.装备附加属性.火攻击 }}</p>
        <p v-if="props.item.extra.装备附加属性.玄攻击">玄攻击+{{ props.item.extra.装备附加属性.玄攻击 }}</p>
        <p v-if="props.item.extra.装备附加属性.毒攻击">毒攻击+{{ props.item.extra.装备附加属性.毒攻击 }}</p>
        <p v-if="props.item.extra.装备附加属性.冰穿透">冰穿透+{{ props.item.extra.装备附加属性.冰穿透 }}</p>
        <p v-if="props.item.extra.装备附加属性.火穿透">火穿透+{{ props.item.extra.装备附加属性.火穿透 }}</p>
        <p v-if="props.item.extra.装备附加属性.玄穿透">玄穿透+{{ props.item.extra.装备附加属性.玄穿透 }}</p>
        <p v-if="props.item.extra.装备附加属性.毒穿透">毒穿透+{{ props.item.extra.装备附加属性.毒穿透 }}</p>
        <p v-if="props.item.extra.装备附加属性.外功伤害">外功伤害+{{ props.item.extra.装备附加属性.外功伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.内功伤害">内功伤害+{{ props.item.extra.装备附加属性.内功伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.冰元素伤害">冰元素伤害+{{ props.item.extra.装备附加属性.冰元素伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.火元素伤害">火元素伤害+{{ props.item.extra.装备附加属性.火元素伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.玄元素伤害">玄元素伤害+{{ props.item.extra.装备附加属性.玄元素伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.毒元素伤害">毒元素伤害+{{ props.item.extra.装备附加属性.毒元素伤害 }}</p>
        <p v-if="props.item.extra.装备附加属性.气血回复">气血回复+{{ props.item.extra.装备附加属性.气血回复 }}</p>
        <p v-if="props.item.extra.装备附加属性.内力回复">内力回复+{{ props.item.extra.装备附加属性.内力回复 }}</p>
        <p v-if="props.item.extra.装备附加属性.气血吸取">气血吸取+{{ props.item.extra.装备附加属性.气血吸取 }}</p>
        <p v-if="props.item.extra.装备附加属性.内力吸取">内力吸取+{{ props.item.extra.装备附加属性.内力吸取 }}</p>
        <p v-if="props.item.extra.装备附加属性.无">无</p>
      </div>
    </div>
    <div class="基础属性" v-if="props.item.extra?.穿戴状态">
      <div class="title">宝石属性</div>
      <p v-for="(i2, index) in 宝石列表" :key="index">
        <span v-if="i2">{{ i2.type2 }} + {{ i2.effect }}</span>
      </p>
      <div class="homeEquipment">
        <div class="homeEquipment-item-wrap" v-for="(i, index) in 宝石列表" :key="index">
          <div class="homeEquipment-item" @click="卸下宝石(item.id, i, index)">
            <item v-if="i" :item="i" placement="top"></item>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 5px;" class="btn" v-if="!props.item.extra?.穿戴状态" @click="穿戴(props.item.id)">穿戴装备</div>
    <div style="margin-top: 5px;" class="btn" v-if="props.item.extra?.穿戴状态" @click="卸下(props.item.id)">卸下装备</div>
  </div>
</template>

<script setup>
import { 鉴定, 穿戴, 卸下 } from '../../../gameData/equipmentConfig';
import { findItem } from '../../../gameData/itemConfig';
import { 卸下宝石 } from '@/gameData/gemstoneConfig'
import Item from '../Item.vue';
const props = defineProps(['item'])
import { computed } from 'vue'

const 开始鉴定 = () => {
  鉴定(props.item)
}

const 宝石列表 = computed(() => {
  let list = []
  if (props.item.extra?.宝石) {
    list = props.item.extra.宝石.map(item => findItem(item))
  }
  // 补足4个宝石
  while (list.length < 5) {
    list.push(null)
  }
  return list
})
</script>

<style lang="scss" scoped>
.itemContentEquipment {
  .未鉴定 {
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

.基础属性 {
  .title {
    font-size: 16px;
    font-weight: 600;
  }
}

.homeEquipment {
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-around;

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