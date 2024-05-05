import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { workData } from "./workData";
import { findItemById, useItem, itemList } from './itemConfig'

export const 服用 = (id) => {
  if(!id) return
  let item = findItemById(id);
  if (!item) {
    console.log('找不到物品', id);
    return;
  };
  if(item.type2 === '气血药') {
    if(气血药计时器.value.time > 0) {
      ElMessage({
        message: '血药还在冷却中',
        type: 'warning'
      })
      return
    }else{
      useItem(id)
      workData.value.personData.当前气血 += item.effect
      气血药计时开始()
    }
  }
  if(item.type2 === '内力药') {
    if(内力药计时器.value.time > 0) {
      ElMessage({
        message: '内力药还在冷却中',
        type: 'warning'
      })
      return
    }else{
      useItem(id)
      workData.value.personData.当前内力 += item.effect
      内力药计时开始()
    }
  }
}

const 气血药计时器 = ref({
  timer: null,
  time: 0,
  maxTime: 20
})

const 内力药计时器 = ref({
  timer: null,
  time: 0,
  maxTime: 20
})

export const 气血药计时 = computed(() => {
  return 气血药计时器.value.time
})

export const 内力药计时 = computed(() => {
  return 内力药计时器.value.time
})

const 气血药计时开始 = () => {
  气血药计时器.value.time = 气血药计时器.value.maxTime
  气血药计时器.value.timer = setInterval(() => {
    气血药计时器.value.time--
    if(气血药计时器.value.time <= 0) {
      clearInterval(气血药计时器.value.timer)
    }
  }, 1000)
}

const 内力药计时开始 = () => {
  内力药计时器.value.time = 内力药计时器.value.maxTime
  内力药计时器.value.timer = setInterval(() => {
    内力药计时器.value.time--
    if(内力药计时器.value.time <= 0) {
      clearInterval(内力药计时器.value.timer)
    }
  }, 1000)
}

export const 更换气血药 = (name) => {
  if(name === workData.value.systemConfig.自动吃药.首选气血药) return
  workData.value.systemConfig.自动吃药.首选气血药 = name
  ElMessage({
    message: '气血药已更换为' + name,
    type: 'success',
    plain: true
  })
}

export const 更换内力药 = (name) => {
  if(name === workData.value.systemConfig.自动吃药.首选内力药) return
  workData.value.systemConfig.自动吃药.首选内力药 = name
  ElMessage({
    message: '内力药已更换为' + name,
    type: 'success',
    plain: true
  })
}

export const 装备中的气血药 = computed(() => {
  return itemList.value.find(item => item?.name === workData.value.systemConfig.自动吃药.首选气血药)
})

export const 背包中的气血药 = computed(() => {
  return itemList.value.filter(item => item?.type2 === '气血药').sort((a, b) => a.effect - b.effect)
})

export const 装备中的内力药 = computed(() => {
  return itemList.value.find(item => item?.name === workData.value.systemConfig.自动吃药.首选内力药)
})

export const 背包中的内力药 = computed(() => {
  return itemList.value.filter(item => item?.type2 === '内力药').sort((a, b) => a.effect - b.effect)
})