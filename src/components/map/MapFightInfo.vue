<template>
  <div class="mapFightInfo">
    <div>人物状态：{{ 人物状态 }}</div>
    <div class="skill-list">
      <div @click="释放技能(item)" v-for="(item, index) in 上阵武学列表" :key="index">
        <SkillItem style="margin-right: 12px;" :skill="item" :btn="false" :time="true">
        </SkillItem>
      </div>
    </div>
    <div>当前场景：{{ workData.mapData.当前地图 }}</div>
    <!-- <div class="fight-control">
      <div class="quitFight" v-if="人物状态 === '战斗中'" @click="$emit('quitFight')">退出战斗</div>
    </div> -->
  </div>
</template>

<script setup>
import { onUnmounted, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import { workData, personDataComputed } from '../../gameData/workData.js'
import { 人物状态, 怪物数据, monsterDataFightComputed, 怪物受伤数据列表, 人物受伤数据列表, 人物招式数据列表 } from '../../gameData/MapFight.js';
import { 主技能, 上阵武学列表 } from '../../gameData/skillConfig.js'

import 武当hit from '../../assets/img/hit/武当hit.png'
import SkillItem from '../../components/menu/modules/SkillItem.vue';

const emit = defineEmits(['success', 'fail', 'quitFight'])

// 延迟1秒后开始战斗
let delayTimer = null;
// 怪物死亡后延时500ms后弹出胜利提示
let successTimer = null;
// 人物主技能怪物
let personAttackTimer = null;
let personAttackDelayTimer = null;
const personAttackMonster = () => {
  clearInterval(personAttackTimer)
  clearTimeout(personAttackDelayTimer)
  personAttackTimer = setInterval(() => {
    // 是否命中
    if (!isHit(personDataComputed.value, monsterDataFightComputed.value)) {
      // 闪避效果
      怪物受伤数据列表.value.push({
        text: '闪避',
        type: '闪避',
        key: Date.now()
      })
      // 人物技能
      人物招式数据列表.value.push({
        text: 主技能.value.name,
        层数: 主技能.value.层数,
        key: Date.now()
      })
      personAttackDelayTimer = setTimeout(() => {
        怪物受伤数据列表.value.shift()
        人物招式数据列表.value.shift()
        clearTimeout(personAttackDelayTimer)
      }, 300);
      return
    }
    // 计算伤害
    let hurtData = personHurt(personDataComputed.value, monsterDataFightComputed.value, 主技能.value)
    // 扣血效果
    document.getElementById('homeMonster').classList.add('animate__headShake')
    // 气血内力吸取
    if (personDataComputed.value.气血吸取 > 0) {
      let 气血吸取 = toZero(toFixed(hurtData * personDataComputed.value.气血吸取 / 100, 0))
      workData.value.personData.当前气血 = workData.value.personData.当前气血 + 气血吸取
    }
    if (personDataComputed.value.内力吸取 > 0) {
      let 气血吸取 = toZero(toFixed(hurtData * personDataComputed.value.气血吸取 / 100, 0))
      workData.value.personData.当前内力 = workData.value.personData.当前内力 + 气血吸取
    }
    怪物受伤数据列表.value.push(
      {
        text: hurtData,
        type: '武学伤害',
        key: Date.now(),
        img: 武当hit
      }
    )
    // 人物技能
    人物招式数据列表.value.push({
      text: 主技能.value.name,
      层数: 主技能.value.层数,
      key: Date.now()
    })
    personAttackDelayTimer = setTimeout(() => {
      document.getElementById('homeMonster').classList.remove('animate__headShake')
      怪物受伤数据列表.value.shift()
      人物招式数据列表.value.shift()
    }, 300);
    // 技能消耗内力
    workData.value.personData.当前内力 = toZero(workData.value.personData.当前内力 - 主技能.value.内力消耗)
    // 增加技能熟练度
    workData.value.skillData.习得武学.find(i => i.name === 主技能.value.name).熟练度++
    // 怪物扣血,怪物血量最少为0
    怪物数据.value.当前气血 = toZero(怪物数据.value.当前气血 - hurtData)
  }, personDataComputed.value.攻击间隔 * 1000)
}

// 技能减少倒计时
let skillCountDownTimer = null;
const skillCountDown = () => {
  clearInterval(skillCountDownTimer)
  skillCountDownTimer = setInterval(() => {
    workData.value.skillData.习得武学.forEach(item => {
      if (item.倒计时 > 0) {
        item.倒计时--
      }
    })
  }, 1000)
}
// 人物手动释放技能
const 释放技能 = (item) => {
  if (人物状态.value !== '战斗中') {
    ElMessage({
      message: '不在战斗状态',
      type: 'warning',
      plain: true,
    })
    return
  }
  if (item.倒计时 > 0) {
    ElMessage({
      message: '技能冷却中',
      type: 'warning',
      plain: true,
    })
    return
  }
  if (workData.value.personData.当前内力 < item.内力消耗) {
    ElMessage({
      message: '内力不足',
      type: 'warning',
      plain: true,
    })
    return
  }
  // 技能进入冷却
  workData.value.skillData.习得武学.find(i => i.name === item.name).倒计时 = item.冷却时间
  // 增加技能熟练度
  workData.value.skillData.习得武学.find(i => i.name === item.name).熟练度++
  if (!isHit(personDataComputed.value, monsterDataFightComputed.value)) {
    // 闪避效果
    怪物受伤数据列表.value.push({
      text: '闪避',
      type: '闪避',
      key: Date.now()
    })
    // 人物技能
    人物招式数据列表.value.push({
      text: item.name,
      层数: item.层数,
      key: Date.now()
    })
    personAttackDelayTimer = setTimeout(() => {
      怪物受伤数据列表.value.shift()
      人物招式数据列表.value.shift()
      clearTimeout(personAttackDelayTimer)
    }, 300);
    return
  }
  // 计算伤害
  let hurtData = personHurt(personDataComputed.value, monsterDataFightComputed.value, item)
  // 扣血效果
  document.getElementById('homeMonster').classList.add('animate__headShake')
  // 气血内力吸取
  if (personDataComputed.value.气血吸取 > 0) {
    let 气血吸取 = toZero(toFixed(hurtData * personDataComputed.value.气血吸取 / 100, 0))
    workData.value.personData.当前气血 = workData.value.personData.当前气血 + 气血吸取
  }
  if (personDataComputed.value.内力吸取 > 0) {
    let 气血吸取 = toZero(toFixed(hurtData * personDataComputed.value.气血吸取 / 100, 0))
    workData.value.personData.当前内力 = workData.value.personData.当前内力 + 气血吸取
  }
  怪物受伤数据列表.value.push(
    {
      text: hurtData,
      type: '武学伤害',
      key: Date.now(),
      img: 武当hit
    }
  )
  // 人物技能
  人物招式数据列表.value.push({
    text: item.name,
    层数: item.层数,
    key: Date.now()
  })
  personAttackDelayTimer = setTimeout(() => {
    document.getElementById('homeMonster').classList.remove('animate__headShake')
    怪物受伤数据列表.value.shift()
    人物招式数据列表.value.shift()
  }, 300);
  // 技能消耗内力
  workData.value.personData.当前内力 = toZero(workData.value.personData.当前内力 - item.内力消耗)
  // 怪物扣血,怪物血量最少为0
  怪物数据.value.当前气血 = toZero(怪物数据.value.当前气血 - hurtData)
}

// 怪物攻击人物
let monsterAttackTimer = null;
let monsterAttackDelayTimer = null;
const monsterAttackPerson = () => {
  clearInterval(monsterAttackTimer)
  clearTimeout(monsterAttackDelayTimer)
  monsterAttackTimer = setInterval(() => {
    // 是否命中
    let isHitFlag = isHit(monsterDataFightComputed.value, personDataComputed.value)
    if (!isHitFlag) {
      // 闪避效果
      clearTimeout(monsterAttackDelayTimer)
      人物受伤数据列表.value.push({
        text: '闪避',
        type: '闪避',
        key: Date.now()
      })
      monsterAttackDelayTimer = setTimeout(() => {
        人物受伤数据列表.value.shift()
      }, 400);
      return
    }
    // 计算伤害
    let hurtData = monsterHurt(monsterDataFightComputed.value, personDataComputed.value)
    // 扣血效果
    clearTimeout(monsterAttackDelayTimer)
    document.getElementById('homeRole').classList.add('animate__headShake')
    人物受伤数据列表.value.push(
      {
        text: hurtData,
        type: '武学伤害',
        key: Date.now()
      }
    )
    monsterAttackDelayTimer = setTimeout(() => {
      document.getElementById('homeRole').classList.remove('animate__headShake')
      人物受伤数据列表.value.shift()
    }, 300);
    // 人物扣血,人物血量最少为0
    workData.value.personData.当前气血 = toZero(workData.value.personData.当前气血 - hurtData)
  }, monsterDataFightComputed.value.攻击间隔 * 1000)
}

// 延迟1秒后开始战斗
const startDelayTimer = () => {
  delayTimer = setTimeout(() => {
    // 清空受伤数据
    人物受伤数据列表.value = []
    怪物受伤数据列表.value = []
    人物招式数据列表.value = []
    // 人物攻击怪物
    personAttackMonster()
    // 怪物攻击人物
    monsterAttackPerson()
    // 清除定时器
    clearTimeout(delayTimer)
  }, 500)
}

// 监听人物数据
watch(personDataComputed, (newVal, oldVal) => {
  // 如果攻击间隔变化，重新开始攻击
  if (newVal && oldVal && 怪物数据.value && newVal.攻击间隔 !== oldVal.攻击间隔) {
    personAttackMonster()
  }
  // 如果人物血量为0，游戏结束
  if (newVal && newVal.当前气血 <= 0) {
    clearAllTimer()
    emit('fail')
  }
})

// 监听怪物数据
watch(monsterDataFightComputed, (newVal, oldVal) => {
  // 如果攻击间隔变化，重新开始攻击
  if (newVal && oldVal && newVal.攻击间隔 !== oldVal.攻击间隔) {
    monsterAttackPerson()
  }
  // 如果怪物血量为0，游戏胜利
  if (newVal && newVal.当前气血 <= 0) {
    successTimer = setTimeout(() => {
      clearAllTimer()
      emit('success', 怪物数据.value)
    }, 500);

  }
})

watch(人物状态, (newVal, oldVal) => {
  if (newVal === '战斗中' && 怪物数据.value) {
    startDelayTimer()
  } else {
    clearAllTimer()
  }
})

// 定义一个方法，传入两个数据，判断是否命中,身法差距越大，命中率越高
const isHit = (攻击者, 受击者) => {
  if (攻击者.身法 >= 受击者.身法 * 1.25) {
    return true
  } else {
    return Math.random() < Math.pow(攻击者.身法 * 0.8 / 受击者.身法, 2)
  }
}

// 怪物攻击伤害
const monsterHurt = (攻击者, 受击者) => {
  let hurtData = 0
  hurtData = 攻击者.外攻 + 攻击者.内攻 - 受击者.防御
  return toZero(toFixed(hurtData, 0))
}

// 人物攻击伤害
const personHurt = (攻击者, 受击者, 技能) => {
  let hurtData = 0
  // 加算内外功伤害
  let 内外功伤害 = 攻击者.外攻 * 攻击者.外功伤害 / 100 + 攻击者.内攻 * 攻击者.内功伤害 / 100 - 受击者.防御
  内外功伤害 = Math.max(1, 内外功伤害);
  // 计算冰火玄毒元素伤害，元素穿透每低于敌方抗性1%，伤害减少1%，最低为0
  let 冰火玄毒元素伤害 = 0
  if (攻击者.冰穿透 + 100 > 受击者.元素抗性) {
    let 衰减 = 100 + 攻击者.冰穿透 - 受击者.元素抗性
    衰减 = Math.max(0, 衰减);
    衰减 = Math.min(150, 衰减);
    冰火玄毒元素伤害 += 攻击者.冰攻击 * 攻击者.冰元素伤害 / 100 * 衰减 / 100
  }
  if (攻击者.火穿透 + 100 > 受击者.元素抗性) {
    let 衰减 = 100 + 攻击者.火穿透 - 受击者.元素抗性
    衰减 = Math.max(0, 衰减);
    衰减 = Math.min(150, 衰减);
    冰火玄毒元素伤害 += 攻击者.火攻击 * 攻击者.火元素伤害 / 100 * 衰减 / 100
  }
  if (攻击者.玄穿透 + 100 > 受击者.元素抗性) {
    let 衰减 = 100 + 攻击者.玄穿透 - 受击者.元素抗性
    衰减 = Math.max(0, 衰减);
    衰减 = Math.min(150, 衰减);
    冰火玄毒元素伤害 += 攻击者.玄攻击 * 攻击者.玄元素伤害 / 100 * 衰减 / 100
  }
  if (攻击者.毒穿透 + 100 > 受击者.元素抗性) {
    let 衰减 = 100 + 攻击者.毒穿透 - 受击者.元素抗性
    衰减 = Math.max(0, 衰减);
    衰减 = Math.min(150, 衰减);
    冰火玄毒元素伤害 += 攻击者.毒攻击 * 攻击者.毒元素伤害 / 100 * 衰减 / 100
  }
  // 计算伤害，乘上元素伤害系数4
  hurtData = 内外功伤害 + 冰火玄毒元素伤害 * 3
  // 计算主技能附加伤害
  if (技能.附加伤害) {
    hurtData += 技能.附加伤害
  }
  // 伤害波动范围为伤害的10%
  hurtData = hurtData * (1 + (Math.random() - 0.5) * 0.2)
  return toZero(toFixed(hurtData, 0))
}

// 定义一个方法，传入两个数字，保留N位小数,默认0
const toFixed = (num, n = 0) => {
  return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}

// 定义一个方法，传入一个数字，如果小于0则返回0
const toZero = (num) => {
  return num < 0 ? 0 : num
}

// 清除所有定时器
const clearAllTimer = () => {
  clearInterval(personAttackTimer)
  clearInterval(monsterAttackTimer)
  clearTimeout(delayTimer)
  clearTimeout(personAttackDelayTimer)
  clearTimeout(monsterAttackDelayTimer)
  clearTimeout(successTimer)
}
onMounted(() => {
  skillCountDown()
})
onUnmounted(() => {
  // 清除定时器
  clearAllTimer()
})

</script>

<style lang="scss" scoped>
.skill-list {
  display: flex;
}

.mapFightInfo {
  // color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  flex: 1;

  // border-bottom: 1px solid rgba(255, 255, 255);
  .quitFight {
    border-radius: 5px;

    &:hover {
      background-color: rgba(0, 0, 0, .5);
    }
  }

  >div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  >div:nth-child(1) {
    justify-content: flex-start;
  }

  >div:nth-child(3) {
    justify-content: flex-end;
  }
}
</style>