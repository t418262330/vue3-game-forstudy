import { ref } from "vue";

import { monsterConfig } from './monsterConfig.js'
import { deliveryPointConfig } from './deliveryPointConfig.js'

const 武当地图配置 = {
  固定数据: [
    { x: 9, y: 19, ...deliveryPointConfig.中原传送点 },
    { x: 0, y: 0, ...monsterConfig.木桩, amount: 1 }
  ],
  怪物数据: [
    {
      ...monsterConfig.蟑螂, amount: 5, drop: [
        { name: '一级冰攻击宝石', amount: 5, probabilities: 10000 },
        { name: '一级火攻击宝石', amount: 5, probabilities: 10000 },
        { name: '一级玄攻击宝石', amount: 5, probabilities: 10000 },
        { name: '一级毒攻击宝石', amount: 5, probabilities: 10000 },
        { name: '一级冰穿透宝石', amount: 5, probabilities: 10000 },
        { name: '一级火穿透宝石', amount: 5, probabilities: 10000 },
        { name: '一级玄穿透宝石', amount: 5, probabilities: 10000 },
        { name: '一级毒穿透宝石', amount: 5, probabilities: 10000 },
        { name: '一级气血宝石', amount: 5, probabilities: 10000 },
        { name: '一级内力宝石', amount: 5, probabilities: 10000 },
        { name: '一级外攻宝石', amount: 5, probabilities: 10000 },
        { name: '一级内攻宝石', amount: 5, probabilities: 10000 },
        { name: '一级防御宝石', amount: 5, probabilities: 10000 },
        { name: '一级身法宝石', amount: 5, probabilities: 10000 },
      ]
    },
  ],
}


const 中原地图配置 = {
  固定数据: [
    { x: 0, y: 0, ...deliveryPointConfig.武当传送点 },
    { x: 2, y: 2, ...deliveryPointConfig.地牢一层传送点 },
  ],
  怪物数据: []
}

const 地牢一层地图配置 = {
  固定数据: [
    { x: 7, y: 17, ...deliveryPointConfig.中原传送点 },
    { x: 9, y: 19, ...deliveryPointConfig.地牢二层传送点 },
  ],
  怪物数据: [
    {
      ...monsterConfig.蟑螂, amount: 10, drop: [
        { name: '小还丹', amount: 5, probabilities: 4000 },
        { name: '金鲨散', amount: 5, probabilities: 4000 },
        { name: '一阶武器', amount: 1, probabilities: 2000 },
        { name: '一阶帽子', amount: 1, probabilities: 2000 },
        { name: '一阶衣服', amount: 1, probabilities: 2000 },
        { name: '一阶腰带', amount: 1, probabilities: 2000 },
        { name: '一阶鞋子', amount: 1, probabilities: 2000 },
        { name: '一阶披风', amount: 1, probabilities: 2000 },
        { name: '一阶手套', amount: 1, probabilities: 2000 },
        { name: '一阶项链', amount: 1, probabilities: 2000 },
        { name: '一阶戒指', amount: 1, probabilities: 2000 },
        { name: '一阶耳环', amount: 1, probabilities: 2000 },
        { name: '一阶符石', amount: 1, probabilities: 2000 },
      ]
    },
    {
      ...monsterConfig.蜈蚣, amount: 7, drop: [
        { name: '小还丹', amount: 1, probabilities: 4000 },
        { name: '金鲨散', amount: 1, probabilities: 4000 },
        { name: '一阶武器', amount: 1, probabilities: 2000 },
        { name: '一阶帽子', amount: 1, probabilities: 2000 },
        { name: '一阶衣服', amount: 1, probabilities: 2000 },
        { name: '一阶腰带', amount: 1, probabilities: 2000 },
        { name: '一阶鞋子', amount: 1, probabilities: 2000 },
        { name: '一阶披风', amount: 1, probabilities: 2000 },
        { name: '一阶手套', amount: 1, probabilities: 2000 },
        { name: '一阶项链', amount: 1, probabilities: 2000 },
        { name: '一阶戒指', amount: 1, probabilities: 2000 },
        { name: '一阶耳环', amount: 1, probabilities: 2000 },
        { name: '一阶符石', amount: 1, probabilities: 2000 },
      ]
    },
    {
      ...monsterConfig.蛇, amount: 4, drop: [
        { name: '小还丹', amount: 1, probabilities: 4000 },
        { name: '金鲨散', amount: 1, probabilities: 4000 },
        { name: '一阶武器', amount: 1, probabilities: 2000 },
        { name: '一阶帽子', amount: 1, probabilities: 2000 },
        { name: '一阶衣服', amount: 1, probabilities: 2000 },
        { name: '一阶腰带', amount: 1, probabilities: 2000 },
        { name: '一阶鞋子', amount: 1, probabilities: 2000 },
        { name: '一阶披风', amount: 1, probabilities: 2000 },
        { name: '一阶手套', amount: 1, probabilities: 2000 },
        { name: '一阶项链', amount: 1, probabilities: 2000 },
        { name: '一阶戒指', amount: 1, probabilities: 2000 },
        { name: '一阶耳环', amount: 1, probabilities: 2000 },
        { name: '一阶符石', amount: 1, probabilities: 2000 },
      ]
    }
  ]
}
const 地牢二层地图配置 = {
  固定数据: [
    { x: 0, y: 0, ...deliveryPointConfig.地牢一层传送点 },
  ],
  怪物数据: [
    {
      ...monsterConfig.蜘蛛, amount: 10, drop: [
        { name: '大还丹', amount: 5, probabilities: 4000 },
        { name: '金雕散', amount: 5, probabilities: 4000 },
        { name: '二阶武器', amount: 1, probabilities: 10000 },
        { name: '二阶帽子', amount: 1, probabilities: 10000 },
        { name: '二阶衣服', amount: 1, probabilities: 10000 },
        { name: '二阶腰带', amount: 1, probabilities: 10000 },
        { name: '二阶鞋子', amount: 1, probabilities: 10000 },
        { name: '二阶披风', amount: 1, probabilities: 10000 },
        { name: '二阶手套', amount: 1, probabilities: 10000 },
        { name: '二阶项链', amount: 1, probabilities: 10000 },
        { name: '二阶戒指', amount: 1, probabilities: 10000 },
        { name: '二阶耳环', amount: 1, probabilities: 10000 },
        { name: '二阶符石', amount: 1, probabilities: 10000 },
      ]
    },
    {
      ...monsterConfig.青蛙, amount: 7, drop: [
        { name: '大还丹', amount: 1, probabilities: 4000 },
        { name: '金雕散', amount: 1, probabilities: 4000 },
        { name: '二阶武器', amount: 1, probabilities: 10000 },
        { name: '二阶帽子', amount: 1, probabilities: 10000 },
        { name: '二阶衣服', amount: 1, probabilities: 10000 },
        { name: '二阶腰带', amount: 1, probabilities: 10000 },
        { name: '二阶鞋子', amount: 1, probabilities: 10000 },
        { name: '二阶披风', amount: 1, probabilities: 10000 },
        { name: '二阶手套', amount: 1, probabilities: 10000 },
        { name: '二阶项链', amount: 1, probabilities: 10000 },
        { name: '二阶戒指', amount: 1, probabilities: 10000 },
        { name: '二阶耳环', amount: 1, probabilities: 10000 },
        { name: '二阶符石', amount: 1, probabilities: 10000 },
      ]
    },
    {
      ...monsterConfig.地牢守卫, amount: 4, drop: [
        { name: '大还丹', amount: 1, probabilities: 4000 },
        { name: '金雕散', amount: 1, probabilities: 4000 },
        { name: '二阶武器', amount: 1, probabilities: 10000 },
        { name: '二阶帽子', amount: 1, probabilities: 10000 },
        { name: '二阶衣服', amount: 1, probabilities: 10000 },
        { name: '二阶腰带', amount: 1, probabilities: 10000 },
        { name: '二阶鞋子', amount: 1, probabilities: 10000 },
        { name: '二阶披风', amount: 1, probabilities: 10000 },
        { name: '二阶手套', amount: 1, probabilities: 10000 },
        { name: '二阶项链', amount: 1, probabilities: 10000 },
        { name: '二阶戒指', amount: 1, probabilities: 10000 },
        { name: '二阶耳环', amount: 1, probabilities: 10000 },
        { name: '二阶符石', amount: 1, probabilities: 10000 },
      ]
    },
  ]
}

export const mapConfig = ref({
  武当: 武当地图配置,
  中原: 中原地图配置,
  地牢一层: 地牢一层地图配置,
  地牢二层: 地牢二层地图配置,
})

export const autoFightMonsterList = ref([])
export const autoFightFlag = ref(false)
export const autoFightTimer = ref(null)