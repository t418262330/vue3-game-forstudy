import { ref } from 'vue'

const 武当传送点 = {
  name: '武当',
  desc: '武当门派驻地',
  type: '传送点',
}

const 中原传送点 = {
  name: '中原',
  desc: '中原地带',
  type: '传送点',
}

const 地牢一层传送点 = {
  name: '地牢一层',
  desc: '练级场景 怪物等级1-10',
  type: '传送点',
}

const 地牢二层传送点 = {
  name: '地牢二层',
  desc: '练级场景 怪物等级11-20',
  type: '传送点',
}

export const deliveryPointConfig = {
  武当传送点,
  中原传送点,
  地牢一层传送点,
  地牢二层传送点
}