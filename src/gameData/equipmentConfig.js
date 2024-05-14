import { computed } from "vue";
import { workData } from "./workData";
import { itemList,findItem } from "./itemConfig";
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

export const 鉴定装备品质 = () => {
  let 随机数 = Math.floor(Math.random() * 100) + 1;
  // 根据随机数确定装备的品质
  if (随机数 <= 60) {
    return "良品";
  } else if (随机数 <= 85) {
    return "上品";
  } else if (随机数 <= 95) {
    return "精品";
  } else if (随机数 <= 99) {
    return "极品";
  } else {
    return "稀世";
  }
}

export const 鉴定装备等级 = (装备等级, 怪物等级) => {
  // 计算等级范围
  var 等级最小值 = 装备等级;
  var 等级最大值 = 10;
  if (怪物等级) 等级最大值 = 怪物等级 - (装备等级 - 1) * 10;

  // 生成一个在等级范围内的随机数
  var 等级 = Math.floor(Math.random() * (等级最大值 + 1)) + (等级最小值 - 1) * 10;

  return 等级
}

export const 鉴定装备基础属性 = (装备类型, 装备等级, 装备阶级, 装备品质) => {
  let 装备品质加成 = { 良品: 1, 上品: 1.1, 精品: 1.2, 极品: 1.5, 稀世: 2 }
  // let 属性点分配结果 = 随机分配属性点(Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]), 4)
  let 属性点分配结果 = 随机分配属性点(Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]), 4)
  // 根据装备类型确定装备属性,基础属性为装备等级和装备阶级的加成，最终属性为基础属性乘以品质加成
  switch (装备类型) {
    case "武器":
      return {
        外攻: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
        内攻: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
      }
    case "帽子":
      return {
        气血: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 10 * 装备品质加成[装备品质]),
        内力: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 10 * 装备品质加成[装备品质]),
      }
    case "衣服":
      return {
        防御: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
      }
    case "手套":
      return {
        外攻: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
        内攻: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
      }
    case "鞋子":
      return {
        身法: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
      }
    case "披风":
      return {
        防御: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
        身法: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
      }
    case "腰带":
      return {
        防御: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
        身法: Math.floor((Math.floor(Math.random() * (装备等级 + 1) / 2) + 装备阶级 * 5) * 装备品质加成[装备品质]),
      }
    case "项链":
      return {
        冰攻击: 属性点分配结果[0],
        火攻击: 属性点分配结果[1],
        玄攻击: 属性点分配结果[2],
        毒攻击: 属性点分配结果[3],
      }
    case "戒指":
      return {
        冰攻击: 属性点分配结果[0],
        火攻击: 属性点分配结果[1],
        玄攻击: 属性点分配结果[2],
        毒攻击: 属性点分配结果[3],
      }
    case "耳环":
      return {
        冰攻击: 属性点分配结果[0],
        火攻击: 属性点分配结果[1],
        玄攻击: 属性点分配结果[2],
        毒攻击: 属性点分配结果[3],
      }
    case "符石":
      return {
        气血回复: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
        内力回复: Math.floor((Math.floor(Math.random() * (装备等级 + 1)) + 装备阶级 * 10) * 装备品质加成[装备品质]),
      }
  }
}

function 随机分配属性点(n, m) {
  var 属性点数组 = [new Array(m).fill(0)];

  // 随机分配属性点到每个属性上
  var 总点数 = 0;
  for (var i = 0; i < m; i++) {
    // 随机选择一个属性
    var 随机点数 = Math.floor(Math.random() * (n - 总点数)) + 1; // 随机分配点数，保证总和为 n
    总点数 += 随机点数;
    属性点数组[i] = 随机点数;
  }

  // 如果总点数小于 n，将剩余点数分配到属性上
  while (总点数 < n) {
    var 随机属性索引 = Math.floor(Math.random() * m);
    属性点数组[随机属性索引]++;
    总点数++;
  }

  return 属性点数组;
}

export const 鉴定装备附加属性 = (装备等级, 装备阶级, 装备品质) => {
  let 附加属性 = {
    气血: 0,
    内力: 0,
    外攻: 0,
    内攻: 0,
    防御: 0,
    身法: 0,
    冰攻击: 0,
    火攻击: 0,
    玄攻击: 0,
    毒攻击: 0,
    冰穿透: 0,
    火穿透: 0,
    玄穿透: 0,
    毒穿透: 0,
    外功伤害: 0,
    内功伤害: 0,
    冰元素伤害: 0,
    火元素伤害: 0,
    玄元素伤害: 0,
    毒元素伤害: 0,
    气血回复: 0,
    内力回复: 0,
    气血吸取: 0,
    内力吸取: 0,
  }
  // 附加属性的个数根据装备品质确定，良品0-1条，上品0-2条，精品0-3条，极品0-4条，稀世0-5条
  let 附加属性个数 = 0;
  switch (装备品质) {
    case "良品":
      附加属性个数 = Math.floor(Math.random() * 2);
      break;
    case "上品":
      附加属性个数 = Math.floor(Math.random() * 3);
      break;
    case "精品":
      附加属性个数 = Math.floor(Math.random() * 4);
      break;
    case "极品":
      附加属性个数 = Math.floor(Math.random() * 5);
      break;
    case "稀世":
      附加属性个数 = Math.floor(Math.random() * 6);
      break;
  }
  if (附加属性个数 === 0) {
    附加属性.无 = true
    return 附加属性
  }
  for (let i = 0; i < 附加属性个数; i++) {
    let 附加属性类型 = Math.floor(Math.random() * 24);
    let 附加属性数值 = Math.floor(Math.random() * ((装备等级 + 1) / 2) + 装备阶级 * 5);
    // 如果是气血内力，数值乘以10
    if (附加属性类型 === 0 || 附加属性类型 === 1) {
      附加属性数值 *= 10;
    }
    // 如果重复,叠加数值
    if (Object.keys(附加属性).includes(Object.keys(附加属性)[附加属性类型])) {
      附加属性[Object.keys(附加属性)[附加属性类型]] += 附加属性数值;
      continue;
    }
  }
  return 附加属性
}

export const 鉴定 = (待鉴定的装备, 怪物等级) => {
  let 鉴定的装备 = workData.value.bagData.背包物品.find(item => item.id === 待鉴定的装备.id)
  // 随机生成装备品质
  let 装备品质 = 鉴定装备品质()
  // 装备品质 = '稀世'
  // 随机生成装备等级
  let 装备等级 = 鉴定装备等级(待鉴定的装备.等级, 怪物等级)
  // 随机生成装备基础属性
  let 装备基础属性 = 鉴定装备基础属性(待鉴定的装备.type2, 装备等级, 待鉴定的装备.等级, 装备品质)
  let 装备附加属性 = 鉴定装备附加属性(装备等级, 待鉴定的装备.等级, 装备品质)
  鉴定的装备.品质 = 装备品质
  鉴定的装备.等级 = 装备等级
  鉴定的装备.extra = {}
  鉴定的装备.extra.装备基础属性 = 装备基础属性
  鉴定的装备.extra.装备附加属性 = 装备附加属性
  鉴定的装备.extra.穿戴状态 = false
  // 装备评分
  let 装备评分 = 0
  for (let key in 装备基础属性) {
    装备评分 += 装备基础属性[key] * 评分参照表[key]
  }
  for (let key in 装备附加属性) {
    装备评分 += 装备附加属性[key] * 评分参照表[key]
  }
  鉴定的装备.extra.装备评分 = Math.floor(装备评分)
  return 鉴定的装备
}

export const 卸下 = (id) => {
  let 装备序号 = itemList.value.findIndex(item => item.id === id)
  workData.value.bagData.背包物品[装备序号].extra.穿戴状态 = false
  ElMessage.success({
    message: '装备已卸下',
    type: 'success',
    plain: true
  })
}

export const 穿戴 = (id) => {
  let 装备序号 = itemList.value.findIndex(item => item.id === id)
  // 装备等级不足，无法穿戴
  if (workData.value.bagData.背包物品[装备序号].等级 > workData.value.personData.等级) {
    ElMessage.error({
      message: '人物等级不足，无法穿戴',
      type: 'warning',
      plain: true
    })
    return
  }
  // 先卸下已穿戴的同类型装备
  let 装备类型 = itemList.value[装备序号].type2
  let 已穿戴的装备序号 = itemList.value.findIndex(item => item?.type === '装备' && item.extra.穿戴状态 && 装备类型 === item.type2)
  if (已穿戴的装备序号 !== -1) {
    workData.value.bagData.背包物品[已穿戴的装备序号].extra.穿戴状态 = false
  }
  // 穿戴新装备
  workData.value.bagData.背包物品[装备序号].extra.穿戴状态 = true
  ElMessage.success({
    message: '装备已穿戴',
    type: 'success',
    plain: true
  })
}

// 穿戴中的装备列表,并按照装备类型排序
export const 穿戴中的装备列表 = computed(() => {
  return itemList.value.filter(item => item?.type === '装备' && item.extra?.穿戴状态)
})

export const 穿戴中的武器 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '武器')
})

export const 穿戴中的帽子 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '帽子')
})

export const 穿戴中的衣服 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '衣服')
})

export const 穿戴中的手套 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '手套')
})

export const 穿戴中的鞋子 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '鞋子')
})

export const 穿戴中的披风 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '披风')
})

export const 穿戴中的腰带 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '腰带')
})

export const 穿戴中的项链 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '项链')
})

export const 穿戴中的戒指 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '戒指')
})

export const 穿戴中的耳环 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '耳环')
})

export const 穿戴中的符石 = computed(() => {
  return 穿戴中的装备列表.value.find(item => item.type2 === '符石')
})

export const 评分参照表 = {
  无: 0,
  气血: 2,
  内力: 1,
  外攻: 20,
  内攻: 20,
  防御: 20,
  身法: 20,
  冰攻击: 40,
  火攻击: 40,
  玄攻击: 40,
  毒攻击: 40,
  冰穿透: 40,
  火穿透: 40,
  玄穿透: 40,
  毒穿透: 40,
  外功伤害: 5,
  内功伤害: 5,
  冰元素伤害: 10,
  火元素伤害: 10,
  玄元素伤害: 10,
  毒元素伤害: 10,
  气血回复: 5,
  内力回复: 5,
  气血吸取: 10,
  内力吸取: 10,
}

export const 装备宝石属性 = computed(() => {
  let 属性 = {
    气血: 0,
    内力: 0,
    外攻: 0,
    内攻: 0,
    防御: 0,
    身法: 0,
    冰攻击: 0,
    火攻击: 0,
    玄攻击: 0,
    毒攻击: 0,
    冰穿透: 0,
    火穿透: 0,
    玄穿透: 0,
    毒穿透: 0,
  }
  穿戴中的装备列表.value.forEach(item => {
    if (item.extra?.宝石) {
      item.extra?.宝石.forEach(宝石 => {
        let 宝石详情 = findItem(宝石)
        属性[宝石详情.type2] += 宝石详情.effect
      })
    }
  })
  return 属性
})
// 装备数据汇总
export const equipmentDataComputed = computed(() => {
  let 气血 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.气血 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.气血 || 0), 0)) + 装备宝石属性.value.气血
  let 内力 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.内力 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.内力 || 0), 0)) + 装备宝石属性.value.内力
  let 外攻 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.外攻 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.外攻 || 0), 0)) + 装备宝石属性.value.外攻
  let 内攻 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.内攻 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.内攻 || 0), 0)) + 装备宝石属性.value.内攻
  let 防御 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.防御 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.防御 || 0), 0)) + 装备宝石属性.value.防御
  let 身法 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.身法 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.身法 || 0), 0))  + 装备宝石属性.value.身法
  let 冰攻击 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.冰攻击 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.冰攻击 || 0), 0)) + 装备宝石属性.value.冰攻击
  let 火攻击 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.火攻击 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.火攻击 || 0), 0)) + 装备宝石属性.value.火攻击
  let 玄攻击 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.玄攻击 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.玄攻击 || 0), 0)) + 装备宝石属性.value.玄攻击
  let 毒攻击 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.毒攻击 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.毒攻击 || 0), 0)) + 装备宝石属性.value.毒攻击
  let 冰穿透 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.冰穿透 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.冰穿透 || 0), 0)) + 装备宝石属性.value.冰穿透
  let 火穿透 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.火穿透 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.火穿透 || 0), 0)) + 装备宝石属性.value.火穿透
  let 玄穿透 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.玄穿透 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.玄穿透 || 0), 0)) + 装备宝石属性.value.玄穿透
  let 毒穿透 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.毒穿透 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.毒穿透 || 0), 0)) + 装备宝石属性.value.毒穿透
  let 外功伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.外功伤害 || 0, 0) / 10, 1)
  let 内功伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.内功伤害 || 0, 0) / 10, 1)
  let 冰元素伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.冰元素伤害 || 0, 0) / 10, 1)
  let 火元素伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.火元素伤害 || 0, 0) / 10, 1)
  let 玄元素伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.玄元素伤害 || 0, 0) / 10, 1)
  let 毒元素伤害 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.毒元素伤害 || 0, 0) / 10, 1)
  let 气血回复 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.气血回复 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.气血回复 || 0), 0));
  let 内力回复 = (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备基础属性?.内力回复 || 0), 0)) + (穿戴中的装备列表.value.reduce((total, item) => total + (item.extra.装备附加属性?.内力回复 || 0), 0));
  let 气血吸取 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.气血吸取 || 0, 0) / 10, 1)
  let 内力吸取 = toFixed(穿戴中的装备列表.value.reduce((total, item) => total + item.extra.装备附加属性?.内力吸取 || 0, 0) / 10, 1)
  return {
    气血,
    内力,
    外攻,
    内攻,
    防御,
    身法,
    冰攻击,
    火攻击,
    玄攻击,
    毒攻击,
    冰穿透,
    火穿透,
    玄穿透,
    毒穿透,
    外功伤害,
    内功伤害,
    冰元素伤害,
    火元素伤害,
    玄元素伤害,
    毒元素伤害,
    气血回复,
    内力回复,
    气血吸取,
    内力吸取
  }
})

// 定义一个方法，传入两个数字，保留N位小数
const toFixed = (num, n) => {
  return Math.round(num * Math.pow(10, n)) / Math.pow(10, n)
}