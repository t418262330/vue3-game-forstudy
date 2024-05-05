<template>
  <el-popover v-if="item" :placement="placement" trigger="hover" transition="false" :show-arrow="false" popper-style="background: none !important;
  border: none !important;
  width: auto !important;
  box-shadow: none;">
    <template #reference>
      <div class="item-wrap" :class="{
        普通: item.品质 === '普通',
        良品: item.品质 === '良品',
        上品: item.品质 === '上品',
        精品: item.品质 === '精品',
        极品: item.品质 === '极品',
        稀世: item.品质 === '稀世',
      }" :style="`background-image:url('${item.img}')`">
        <div class="equipmentTip" v-if="item.type === '装备' && !item.extra">未鉴定</div>
        <div class="equipmentTip" v-if="item.extra">{{ item.等级 }}级</div>
        <div class="equipmentStatus" v-if="item.extra && item.extra.穿戴状态 && needStatus">
          <img src="../../assets/img/equipment/已穿戴标识.png" alt="">
        </div>
        <div class="equipmentStatus" v-if="item.extra && !item.extra.穿戴状态 && isBetter">
          <img src="../../assets/img/equipment/评分更高标识.png" alt="">
        </div>
        <div class="itemAmount" v-if="item?.amount > 1">{{ item.amount }}</div>
        <div class="itemDrug" v-if="item?.type2 === '气血药' && needDrugTime && 气血药计时 > 0">{{ 气血药计时 }}</div>
        <div class="itemDrug" v-if="item?.type2 === '内力药' && needDrugTime && 内力药计时 > 0">{{ 内力药计时 }}</div>
      </div>
    </template>
    <div class="flex">
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '武器'" style="margin-right: 5px;"
        :item='穿戴中的武器'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '手套'" style="margin-right: 5px;"
        :item='穿戴中的手套'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '帽子'" style="margin-right: 5px;"
        :item='穿戴中的帽子'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '衣服'" style="margin-right: 5px;"
        :item='穿戴中的衣服'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '腰带'" style="margin-right: 5px;"
        :item='穿戴中的腰带'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '鞋子'" style="margin-right: 5px;"
        :item='穿戴中的鞋子'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '披风'" style="margin-right: 5px;"
        :item='穿戴中的披风'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '项链'" style="margin-right: 5px;"
        :item='穿戴中的项链'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '戒指'" style="margin-right: 5px;"
        :item='穿戴中的戒指'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '耳环'" style="margin-right: 5px;"
        :item='穿戴中的耳环'></ItemDetail>
      <ItemDetail v-if="item.extra && !item.extra.穿戴状态 && needStatus && item.type2 === '符石'" style="margin-right: 5px;"
        :item='穿戴中的符石'></ItemDetail>
      <ItemDetail :item='item'></ItemDetail>
      <ItemGemstoneSelect style="margin-left: 5px;" v-if="item.extra && item.extra.穿戴状态" :item="item"></ItemGemstoneSelect>
    </div>
  </el-popover>
</template>

<script setup>
import { 穿戴中的武器, 穿戴中的手套, 穿戴中的帽子, 穿戴中的衣服, 穿戴中的腰带, 穿戴中的鞋子, 穿戴中的披风, 穿戴中的项链, 穿戴中的戒指, 穿戴中的耳环, 穿戴中的符石 } from '../../gameData/equipmentConfig';
import { 气血药计时, 内力药计时 } from '@/gameData/drugConfig';
import { computed } from 'vue';
import ItemDetail from './ItemDetail.vue'
import ItemGemstoneSelect from './modules/ItemGemstoneSelect.vue'
const props = defineProps({
  item: { default: null },
  needStatus: { default: false },
  placement: { default: 'left' },
  needDrugTime: { default: true }
})

// 一个计算属性，用于显示装备评分是否比当前装备高
const isBetter = computed(() => {
  if (props.item.extra && props.item.extra.装备评分) {
    if (props.item.type2 === '武器') {
      return props.item.extra.装备评分 > 穿戴中的武器.value?.extra?.装备评分
    }
    if (props.item.type2 === '手套') {
      return props.item.extra.装备评分 > 穿戴中的手套.value?.extra?.装备评分
    }
    if (props.item.type2 === '帽子') {
      return props.item.extra.装备评分 > 穿戴中的帽子.value?.extra?.装备评分
    }
    if (props.item.type2 === '衣服') {
      return props.item.extra.装备评分 > 穿戴中的衣服.value?.extra?.装备评分
    }
    if (props.item.type2 === '腰带') {
      return props.item.extra.装备评分 > 穿戴中的腰带.value?.extra?.装备评分
    }
    if (props.item.type2 === '鞋子') {
      return props.item.extra.装备评分 > 穿戴中的鞋子.value?.extra?.装备评分
    }
    if (props.item.type2 === '披风') {
      return props.item.extra.装备评分 > 穿戴中的披风.value?.extra?.装备评分
    }
    if (props.item.type2 === '项链') {
      return props.item.extra.装备评分 > 穿戴中的项链.value?.extra?.装备评分
    }
    if (props.item.type2 === '戒指') {
      return props.item.extra.装备评分 > 穿戴中的戒指.value?.extra?.装备评分
    }
    if (props.item.type2 === '耳环') {
      return props.item.extra.装备评分 > 穿戴中的耳环.value?.extra?.装备评分
    }
    if (props.item.type2 === '符石') {
      return props.item.extra.装备评分 > 穿戴中的符石.value?.extra?.装备评分
    }
  } else {
    return false
  }
})

</script>

<style lang="scss" scoped>
.item-wrap {
  width: 100%;
  height: 100%;
  background-size: 50% 50%;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  border-radius: 5px;

  .equipmentTip {
    // width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    text-align: left;
    font-size: 14px;
  }

  .equipmentStatus {
    // width: 100%;
    position: absolute;
    top: 0;
    right: 0;
    color: #000;
    text-align: left;
    font-size: 14px;
  }

  .itemAmount {
    // width: 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    color: #000;
    text-align: left;
    font-size: 14px;
  }

  .itemDrug {
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
}
</style>