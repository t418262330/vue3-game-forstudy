<template>
  <el-card class="item-detail" v-if="item">
    <template #header>
      <div class="card-header">
        <span :class="{
          普通: item.品质 === '普通',
          良品: item.品质 === '良品',
          上品: item.品质 === '上品',
          精品: item.品质 === '精品',
          极品: item.品质 === '极品',
          稀世: item.品质 === '稀世',
        }" style="box-shadow: none;background-color: rgba(0, 0, 0, 0);">{{ item.name }}<span
            v-if="props.item.extra?.穿戴状态">（穿戴中）</span></span>
        <span style="font-weight: 400;" v-if="props.item.叠加上限 !== 1 && item.amount">拥有数量：{{ item.amount}}</span>
      </div>
    </template>
    <div class="item-wrap">
      <p>等级：{{ item.等级 }}</p>
      <p>品质：<span :class="{
        普通: item.品质 === '普通',
        良品: item.品质 === '良品',
        上品: item.品质 === '上品',
        精品: item.品质 === '精品',
        极品: item.品质 === '极品',
        稀世: item.品质 === '稀世',
      }" style="box-shadow: none;background-color: rgba(0, 0, 0, 0);">{{ item.品质 }}</span></p>
      <p>简介：{{ item.desc }} </p>
      <p>价格：{{ item.售出价格 }} </p>
      <ItemContentEquipment v-if="item.type === '装备'" :item="item"></ItemContentEquipment>
      <ItemContentGemstone v-if="item.type === '宝石'" :item="item"></ItemContentGemstone>
      <!-- <ItemContentDrug v-if="item.type === '药品'" :item="item"></ItemContentDrug> -->
    </div>
    <div class="item-btn">
      <!-- <div @click="sell()">出售</div> -->
    </div>
  </el-card>
</template>

<script setup>
import ItemContentEquipment from './modules/ItemContentEquipment.vue'
import ItemContentGemstone from './modules/ItemContentGemstone.vue';
import ItemContentDrug from './modules/ItemContentDrug.vue'
import { workData } from '@/gameData/workData';
import { removeItemById } from '../../gameData/itemConfig'
const props = defineProps(['item'])

const sell = () => {
  // 计算出售价格
  const sellPrice = Math.floor(props.item.售出价格 * props.item.amount)
  workData.value.personData.金钱 += sellPrice
  removeItemById(props.item.id)
}

</script>

<style lang="scss" scoped>
.item-detail {
  position: relative;
  width: 300px;
  // height: 640px;
  background-image: url('../../assets/img/homeMenu/菜单背景2.png');
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
</style>