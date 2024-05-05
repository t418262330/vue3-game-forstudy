import { ref, computed } from "vue";
import { occupationInfo } from "./occupationConfig";
import { equipmentDataComputed } from "./equipmentConfig";

// 原始工作数据
export const originalWorkData = {
  personData: {
    气血: 100,
    当前气血: 100,
    气血回复: 10,
    气血吸取: 0,
    内力: 100,
    当前内力: 100,
    内力回复: 10,
    内力吸取: 0,
    外攻: 10,
    内攻: 10,
    防御: 10,
    身法: 10,
    冰攻击: 0,
    火攻击: 0,
    玄攻击: 0,
    毒攻击: 0,
    冰穿透: 0,
    火穿透: 0,
    玄穿透: 0,
    毒穿透: 0,
    气血吸取: 0,
    内力吸取: 0,
    外功伤害: 0,
    内功伤害: 0,
    冰元素伤害: 0,
    火元素伤害: 0,
    玄元素伤害: 0,
    毒元素伤害: 0,
    金钱: 100,
    元宝: 0,
    当前经验: 0,
  },
  mapData: {
    当前地图: "",
    挂机设置: [],
    分解设置: [],
  },
  bagData: {
    背包物品: [],
    背包容量: 200,
  },
  equipmentData: {
    穿戴物品: [],
  },
  skillData: {
    习得武学: [
      { name: "普通攻击", 层数: 1, 熟练度: 0, 是否上阵: false, 是否首选: true, 是否解锁: true}
    ]
  },
  systemConfig: {
    怪物经验倍率: 1,
    怪物金钱倍率: 1,
    升级经验系数: 1.3,
    自动刷怪时间: 30,// 秒
    自动吃药: {
      首选气血药: "",
      气血药自动开关: false,
      气血临界值: 40,
      首选内力药: "",
      内力临界值: 20,
      内力药自动开关: false,
    }
  },
  itemId: 1
}

// 基础工作数据
export const workData = ref(null)

// 实际展示的工作数据
export const personDataComputed = computed(() => {
  let data = {}
  // 找到门派配置
  let 门派配置 = occupationInfo.value.find(item => item.门派 === workData.value.personData.门派)
  // 找到穿戴中的装备，汇总属性
  data.昵称 = workData.value.personData.name
  data.门派 = workData.value.personData.门派
  data.气血 = workData.value.personData.气血 + 门派配置.气血成长 * workData.value.personData.等级 + equipmentDataComputed.value.气血
  data.当前气血 = workData.value.personData.当前气血
  data.内力 = workData.value.personData.内力 + 门派配置.内力成长 * workData.value.personData.等级 + equipmentDataComputed.value.内力
  data.当前内力 = workData.value.personData.当前内力
  data.外攻 = workData.value.personData.外攻 + 门派配置.外攻成长 * workData.value.personData.等级 + equipmentDataComputed.value.外攻
  data.内攻 = workData.value.personData.内攻 + 门派配置.内攻成长 * workData.value.personData.等级 + equipmentDataComputed.value.内攻
  data.防御 = workData.value.personData.防御 + 门派配置.防御成长 * workData.value.personData.等级 + equipmentDataComputed.value.防御
  data.身法 = workData.value.personData.身法 + 门派配置.身法成长 * workData.value.personData.等级 + equipmentDataComputed.value.身法
  data.冰攻击 = workData.value.personData.冰攻击 + equipmentDataComputed.value.冰攻击
  data.火攻击 = workData.value.personData.火攻击 + equipmentDataComputed.value.火攻击
  data.玄攻击 = workData.value.personData.玄攻击 + equipmentDataComputed.value.玄攻击
  data.毒攻击 = workData.value.personData.毒攻击 + equipmentDataComputed.value.毒攻击
  data.冰穿透 = workData.value.personData.冰穿透 + equipmentDataComputed.value.冰穿透
  data.火穿透 = workData.value.personData.火穿透 + equipmentDataComputed.value.火穿透
  data.玄穿透 = workData.value.personData.玄穿透 + equipmentDataComputed.value.玄穿透
  data.毒穿透 = workData.value.personData.毒穿透 + equipmentDataComputed.value.毒穿透
  data.外功伤害 = toFixed(workData.value.personData.外功伤害) + equipmentDataComputed.value.外功伤害
  data.内功伤害 = toFixed(workData.value.personData.内功伤害) + equipmentDataComputed.value.内功伤害
  data.冰元素伤害 = toFixed(workData.value.personData.冰元素伤害) + equipmentDataComputed.value.冰元素伤害
  data.火元素伤害 = toFixed(workData.value.personData.火元素伤害) + equipmentDataComputed.value.火元素伤害
  data.玄元素伤害 = toFixed(workData.value.personData.玄元素伤害) + equipmentDataComputed.value.玄元素伤害
  data.毒元素伤害 = toFixed(workData.value.personData.毒元素伤害) + equipmentDataComputed.value.毒元素伤害
  data.气血回复 = workData.value.personData.气血回复 + equipmentDataComputed.value.气血回复
  data.内力回复 = workData.value.personData.内力回复 + equipmentDataComputed.value.内力回复
  data.气血吸取 = workData.value.personData.内力吸取 + equipmentDataComputed.value.气血吸取
  data.内力吸取 = workData.value.personData.内力吸取 + equipmentDataComputed.value.内力吸取
  data.金钱 = workData.value.personData.金钱
  data.当前经验 = workData.value.personData.当前经验
  // 所需经验为100乘以等级减1的1.1次方
  data.所需经验 = Math.floor(100 * Math.pow(workData.value.systemConfig.升级经验系数, workData.value.personData.等级 - 1))
  data.等级 = workData.value.personData.等级
  data.气血百分比 = (data.当前气血 / data.气血) * 100
  data.内力百分比 = (data.当前内力 / data.内力) * 100
  // 经验百分比不得大于100
  data.经验百分比 = Math.min((data.当前经验 / data.所需经验) * 100, 100)
  data.攻击间隔 = toFixed(2000 / (data.身法 + 1000), 3)
  return data
})

// 保存工作数据
export const saveWorkData = () => {
  if (!workData.value) return
  localStorage.setItem(workData.value.personData.name, JSON.stringify(workData.value));
}

// 加载工作数据
export const loadWorkData = (name) => {
  const data = JSON.parse(localStorage.getItem(name));
  if (data) {
    workData.value = data;
  }
}

// 定义一个方法，传入两个数字，保留N位小数
const toFixed = (num, n=0) => {
  return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}