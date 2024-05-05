import { ref, computed } from "vue";

export const 人物状态 = ref('空闲')

export const 怪物数据 = ref(null)

export const 怪物受伤数据列表 = ref([])
export const 人物受伤数据列表 = ref([])
export const 人物招式数据列表 = ref([])

// 怪物数据计算属性
export const monsterDataFightComputed = computed(() => {
  if (!怪物数据.value) return
  let data = {}
  data.气血 = 怪物数据.value.气血
  data.内力 = 怪物数据.value.内力
  data.外攻 = 怪物数据.value.外攻
  data.内攻 = 怪物数据.value.内攻
  data.防御 = 怪物数据.value.防御
  data.身法 = 怪物数据.value.身法
  data.元素抗性 = 怪物数据.value.元素抗性
  data.当前气血 = 怪物数据.value.当前气血
  data.当前内力 = 怪物数据.value.当前内力
  data.气血百分比 = (怪物数据.value.当前气血 / data.气血) * 100
  data.内力百分比 = (怪物数据.value.当前内力 / data.内力) * 100
  data.攻击间隔 = toFixed(2000 / (data.身法 + 1000), 3)
  return data
})

// 人物数据计算属性
export const 人物数据 = ref(null)

// 定义一个方法，传入两个数字，保留N位小数,默认0
const toFixed = (num, n = 0) => {
  return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}