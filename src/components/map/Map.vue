<template>
  <div class="map animate__animated animate__fadeIn">
    <!-- 当前位置：{{ workData.mapData.当前地图 }} -->
    <div class="map-wrap"
      :style="`background-image:url('${bgSrc}');background-position: bottom;background-size:100% 100%;`">
      <div class="row" v-for="(row, i) in map" :key="i">
        <div class="cell" v-for="(cell, j) in row" :key="j" @click="clickCell(cell, [i, j])">
          <MapItem :cell="cell" />
        </div>
      </div>
    </div>
    <MapFightInfo @quitFight="quitFight" @fail="fail" @success="success"></MapFightInfo>
  </div>
</template>

<script setup>
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'

import { workData } from '../../gameData/workData.js'
import { mapConfig, autoFightMonsterList, autoFightFlag,autoFightTimer } from '../../gameData/mapConfig.js'
import { 人物状态, 怪物数据 } from '../../gameData/MapFight.js';
import { findItem, getItem, findItemById,clearUnWearItemByQuality } from '../../gameData/itemConfig.js'
import { 鉴定 } from '../../gameData/equipmentConfig';
import { bgSrc } from '../../gameData/musicBgConfig'
import MapItem from './MapItem.vue';
import MapFightInfo from './MapFightInfo.vue';

const map = ref(Array(10).fill().map(() => Array(20).fill(null)))

// 退出战斗
const quitFight = () => {
  人物状态.value = '空闲'
  怪物数据.value = null
  // 清空怪物战斗状态
  map.value.forEach(row => {
    row.forEach(item => {
      if (item?.type === '怪物') {
        item.isFight = false
      }
    });
  });
}

// 人物死亡
const fail = () => {
  人物状态.value = '空闲'
  怪物数据.value = null
  // 移动到门派
  workData.value.mapData.当前地图 = workData.value.personData.门派
  // 一滴血
  workData.value.personData.当前气血 = 1
  // 停止自动挂机
  endAutoFight()
  ElMessage({
    message: '您已死亡，回到门派',
    type: 'warning',
    plain: true,
  })
  initMapConfig()
}

// 人物胜利
const success = (data) => {
  人物状态.value = '空闲'
  怪物数据.value = null
  // 清除死亡怪物
  map.value[data.position[0]][data.position[1]] = null
  // 结算经验和金钱,差距10级以上不加经验
  let 衰减系数 = 1
  let level = workData.value.personData.等级 - data.等级
  if (level >= 10) {
    衰减系数 = 0
  }
  let 经验 = data.经验 * workData.value.systemConfig.怪物经验倍率 * 衰减系数
  let 金钱 = data.金钱 * workData.value.systemConfig.怪物金钱倍率
  workData.value.personData.当前经验 += 经验
  workData.value.personData.金钱 += 金钱
  ElMessage({
    message: '获得经验：' + 经验 + '，金钱：' + 金钱,
    type: 'success',
    plain: true,
  })
  // 结算掉落物品
  data.drop.forEach(item => {
    if (Math.random() < item.probabilities / 10000) {
      let id = getItem(item.name, item.amount)
      // 没id，说明是不加叠加的物品
      if (!id) {
        ElMessage({
          message: '获得物品：' + item.name + ' x ' + item.amount,
          type: 'success',
          plain: true,
        })
        return
      }
      // 可叠加
      let itemDetail = findItemById(id)
      // 处理装备
      if (itemDetail.type === '装备') {
        let 鉴定后的装备 = 鉴定(itemDetail, data.等级)
        if (鉴定后的装备.品质 === '极品' || 鉴定后的装备.品质 === '稀世') {
          ElNotification({
            title: '鸿运当头',
            message: '恭喜您获得一件' + 鉴定后的装备.品质 + '装备',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '获得物品：' + 鉴定后的装备.name,
            type: 'success',
            plain: true,
          })
        }
      }
    }
  });
}

// 点击地图单元格
const clickCell = (cell, [i, j]) => {
  // 如果处于战斗状态，不可点击
  if (人物状态.value === '战斗中') {
    ElMessage({
      message: '您正处于战斗中',
      type: 'warning',
      plain: true,
    })
    return
  }
  // 退出自动挂机
  if(autoFightFlag.value){
    endAutoFight()
  }
  
  // 传送点
  if (cell.type === '传送点') {
    处理传送点(cell)
  }
  // 怪物
  if (cell.type === '怪物') {
    处理怪物(cell, [i, j])
  }
}

const 处理传送点 = (cell) => {
  ElMessageBox.confirm(
    '即将前往' + cell.name,
    '传送点',
    {
      confirmButtonText: '前往',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      workData.value.mapData.当前地图 = cell.name
      // 渲染场景数据
      initMapConfig()
    })
}

const 处理怪物 = (cell, position) => {
  // 设置当前怪物战斗状态
  cell.isFight = true
  // 设置人物战斗状态
  人物状态.value = '战斗中'
  // 设置怪物信息
  怪物数据.value = cell
  怪物数据.value.position = position
}

const initMapConfig = () => {
  // 清空地图数据
  map.value = Array(10).fill().map(() => Array(20).fill(null))
  // 地图固定数据配置
  let configData = mapConfig.value[workData.value.mapData.当前地图].固定数据
  configData.forEach(item => {
    map.value[item.x][item.y] = {
      ...item
    }
  });
  // 地图怪物数据配置
  monsterDataConfig()
  // 定时自动刷怪
  refreshMonster()
  // 更新当前挂机可选怪物
  refreshAutoFight()
  // 提示当前地图
  ElMessage({
    message: '进入' + workData.value.mapData.当前地图,
    type: 'success',
    plain: true,
  })
}

// 更新当前挂机可选怪物
const refreshAutoFight = () => {
  autoFightMonsterList.value = mapConfig.value[workData.value.mapData.当前地图].怪物数据.map(item => item.name)
  workData.value.mapData.挂机设置 = []
}

// 地图怪物数据配置
const monsterDataConfig = () => {
  let monsterData = mapConfig.value[workData.value.mapData.当前地图].怪物数据
  monsterData.forEach(item => {
    for (let i = 0; i < item.amount; i++) {
      let position = randomPosition()
      map.value[position[0]][position[1]] = {
        ...item,
        isFight: false
      }
    }
  });
}

// 如果刷怪的位置有怪，则递归刷怪
const randomPosition = () => {
  let x = Math.floor(Math.random() * 10)
  let y = Math.floor(Math.random() * 20)
  if (!map.value[x][y]) {
    return [x, y]
  } else {
    return randomPosition()
  }
}


// 各类怪物数量统计
const monsterAmount = computed(() => {
  let monsterAmountData = {}
  autoFightMonsterList.value.forEach(item => {
    monsterAmountData[item] = 0
  })
  map.value.forEach(row => {
    row.forEach(item => {
      if (item?.type === '怪物') {
        if (monsterAmountData[item.name]) {
          monsterAmountData[item.name]++
        } else {
          monsterAmountData[item.name] = 1
        }
      }
    });
  });
  return monsterAmountData
})

// 定时自动刷怪,30秒一次,根据怪物上限数量新增怪物
let refreshMonsterTimer = ref(null)
const refreshMonster = () => {
  clearInterval(refreshMonsterTimer.value)
  refreshMonsterTimer.value = setInterval(() => {
    let monsterData = mapConfig.value[workData.value.mapData.当前地图].怪物数据
    monsterData.forEach(item => {
      for (let i = 0; i < item.amount - monsterAmount.value[item.name]; i++) {
        let position = randomPosition()
        map.value[position[0]][position[1]] = {
          ...item,
          isFight: false
        }
      }
    });
  }, workData.value.systemConfig.自动刷怪时间 * 1000)
}

onMounted(() => {
  // 初始化人物状态和怪物数据
  人物状态.value = '空闲'
  怪物数据.value = null
  // 渲染场景数据
  initMapConfig()
})

onUnmounted(() => {
  clearInterval(refreshMonsterTimer.value)
})

watch(autoFightFlag, (newVal) => {
  console.log(newVal);
  if (newVal && 人物状态.value === '空闲') {
    startAutoFight()
  }
  if (!newVal) {
    clearInterval(autoFightTimer.value)
  }
})

const startAutoFight = () => {
  clearInterval(autoFightTimer.value)
  autoFightTimer.value = setInterval(() => {
    clearUnWearItemByQuality()
    console.log(refreshMonsterTimer.value);
    if (人物状态.value === '战斗中') {
      return
    }
    let monster = map.value.flat().find(item => item?.type === '怪物' && !item.isFight && workData.value.mapData.挂机设置.includes(item.name))
    if (monster) {
      处理怪物(monster, [map.value.findIndex(row => row.includes(monster)), map.value.find(row => row.includes(monster)).indexOf(monster)])
    }
  }, 1000)
}

const endAutoFight = () => {
  autoFightFlag.value = false
  clearInterval(autoFightTimer.value)
  ElMessage({
    message: '退出自动挂机状态',
    type: 'warning',
    plain: true,
  })
}
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
  width: 75%;
  // background: rgba($color: #fff, $alpha: .2);
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // position: relative;
}

.map-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 680px;
  box-sizing: border-box;
  box-sizing: border-box;
  padding: 20px;

  .row {
    display: flex;
    flex: 1;
  }

  .cell {
    border: 1px solid rgba($color: #fff, $alpha: .6);
    // background: rgba($color: #fff, $alpha: .3);
    border-radius: 5px;
    flex: 1;
    transition: all 0.1s;
  }
}
</style>