import { ref, computed } from "vue";
import { workData } from "./workData.js";

import 气血药图 from "../assets/img/drug/气血药.png";
import 气血药图2 from "../assets/img/drug/气血药2.png";
import 内力药图 from "../assets/img/drug/内力药.png";
import 内力药图2 from "../assets/img/drug/内力药2.png";
import 武器图 from "../assets/img/equipment/武器.png";
import 帽子图 from "../assets/img/equipment/帽子.png";
import 衣服图 from "../assets/img/equipment/衣服.png";
import 腰带图 from "../assets/img/equipment/腰带.png";
import 鞋子图 from "../assets/img/equipment/鞋子.png";
import 披风图 from "../assets/img/equipment/披风.png";
import 手套图 from "../assets/img/equipment/手套.png";
import 项链图 from "../assets/img/equipment/项链.png";
import 戒指图 from "../assets/img/equipment/戒指.png";
import 耳环图 from "../assets/img/equipment/耳环.png";
import 符石图 from "../assets/img/equipment/符石.png";
import 冰穿透宝石图 from "../assets/img/gemstone/冰穿透宝石.png";
import 火穿透宝石图 from "../assets/img/gemstone/火穿透宝石.png";
import 玄穿透宝石图 from "../assets/img/gemstone/玄穿透宝石.png";
import 毒穿透宝石图 from "../assets/img/gemstone/毒穿透宝石.png";
import 冰攻击宝石图 from "../assets/img/gemstone/冰攻击宝石.png";
import 火攻击宝石图 from "../assets/img/gemstone/火攻击宝石.png";
import 玄攻击宝石图 from "../assets/img/gemstone/玄攻击宝石.png";
import 毒攻击宝石图 from "../assets/img/gemstone/毒攻击宝石.png";
import 气血宝石图 from "../assets/img/gemstone/气血宝石.png";
import 内力宝石图 from "../assets/img/gemstone/内力宝石.png";
import 外攻宝石图 from "../assets/img/gemstone/外攻宝石.png";
import 内攻宝石图 from "../assets/img/gemstone/内攻宝石.png";
import 防御宝石图 from "../assets/img/gemstone/防御宝石.png";
import 身法宝石图 from "../assets/img/gemstone/身法宝石.png";

const 小还丹 = { name: "小还丹", img: 气血药图, desc: '服用后可恢复200气血', type: '药品', type2: '气血药', effect: 200, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 大还丹 = { name: "大还丹", img: 气血药图2, desc: '服用后可恢复500气血', type: '药品', type2: '气血药', effect: 500, 叠加上限: 999, 品质: '良品', 售出价格: 10, 等级: 1 };
const 金鲨散 = { name: "金鲨散", img: 内力药图, desc: '服用后可恢复200内力', type: '药品', type2: '内力药', effect: 200, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 金雕散 = { name: "金雕散", img: 内力药图2, desc: '服用后可恢复500内力', type: '药品', type2: '内力药', effect: 500, 叠加上限: 999, 品质: '良品', 售出价格: 10, 等级: 1 };

const 一阶武器 = { name: "一阶武器", img: 武器图, desc: '武器，提供内外攻属性', type: '装备', type2: '武器', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶帽子 = { name: "一阶帽子", img: 帽子图, desc: '帽子，提供气血内力属性', type: '装备', type2: '帽子', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶衣服 = { name: "一阶衣服", img: 衣服图, desc: '衣服，提供防御属性', type: '装备', type2: '衣服', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶腰带 = { name: "一阶腰带", img: 腰带图, desc: '腰带，提供防御身法属性', type: '装备', type2: '腰带', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶鞋子 = { name: "一阶鞋子", img: 鞋子图, desc: '鞋子，提供身法属性', type: '装备', type2: '鞋子', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶披风 = { name: "一阶披风", img: 披风图, desc: '披风，提供防御身法属性', type: '装备', type2: '披风', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶手套 = { name: "一阶手套", img: 手套图, desc: '手套，提供内外攻属性', type: '装备', type2: '手套', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶项链 = { name: "一阶项链", img: 项链图, desc: '项链，提供元素属性', type: '装备', type2: '项链', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶戒指 = { name: "一阶戒指", img: 戒指图, desc: '戒指，提供元素属性', type: '装备', type2: '戒指', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶耳环 = { name: "一阶耳环", img: 耳环图, desc: '耳环，提供元素属性', type: '装备', type2: '耳环', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一阶符石 = { name: "一阶符石", img: 符石图, desc: '符石，提供气血内力回复属性', type: '装备', type2: '符石', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 1 };
const 二阶武器 = { name: "二阶武器", img: 武器图, desc: '武器，提供内外攻属性', type: '装备', type2: '武器', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶帽子 = { name: "二阶帽子", img: 帽子图, desc: '帽子，提供气血内力属性', type: '装备', type2: '帽子', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶衣服 = { name: "二阶衣服", img: 衣服图, desc: '衣服，提供防御属性', type: '装备', type2: '衣服', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶腰带 = { name: "二阶腰带", img: 腰带图, desc: '腰带，提供防御身法属性', type: '装备', type2: '腰带', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶鞋子 = { name: "二阶鞋子", img: 鞋子图, desc: '鞋子，提供身法属性', type: '装备', type2: '鞋子', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶披风 = { name: "二阶披风", img: 披风图, desc: '披风，提供防御身法属性', type: '装备', type2: '披风', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶手套 = { name: "二阶手套", img: 手套图, desc: '手套，提供内外攻属性', type: '装备', type2: '手套', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶项链 = { name: "二阶项链", img: 项链图, desc: '项链，提供元素属性', type: '装备', type2: '项链', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶戒指 = { name: "二阶戒指", img: 戒指图, desc: '戒指，提供元素属性', type: '装备', type2: '戒指', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶耳环 = { name: "二阶耳环", img: 耳环图, desc: '耳环，提供元素属性', type: '装备', type2: '耳环', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };
const 二阶符石 = { name: "二阶符石", img: 符石图, desc: '符石，提供气血内力回复属性', type: '装备', type2: '符石', 叠加上限: 1, 品质: '普通', 售出价格: 10, 等级: 2 };

const 一级冰攻击宝石 = { name: "一级冰攻击宝石", img: 冰攻击宝石图, desc: '提供冰攻击属性', type: '宝石', type2: '冰攻击', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级火攻击宝石 = { name: "一级火攻击宝石", img: 火攻击宝石图, desc: '提供火攻击属性', type: '宝石', type2: '火攻击', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级玄攻击宝石 = { name: "一级玄攻击宝石", img: 玄攻击宝石图, desc: '提供玄攻击属性', type: '宝石', type2: '玄攻击', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级毒攻击宝石 = { name: "一级毒攻击宝石", img: 毒攻击宝石图, desc: '提供毒攻击属性', type: '宝石', type2: '毒攻击', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级冰穿透宝石 = { name: "一级冰穿透宝石", img: 冰穿透宝石图, desc: '提供冰穿透属性', type: '宝石', type2: '冰穿透', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级火穿透宝石 = { name: "一级火穿透宝石", img: 火穿透宝石图, desc: '提供火穿透属性', type: '宝石', type2: '火穿透', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级玄穿透宝石 = { name: "一级玄穿透宝石", img: 玄穿透宝石图, desc: '提供玄穿透属性', type: '宝石', type2: '玄穿透', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级毒穿透宝石 = { name: "一级毒穿透宝石", img: 毒穿透宝石图, desc: '提供毒穿透属性', type: '宝石', type2: '毒穿透', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级气血宝石 = { name: "一级气血宝石", img: 气血宝石图, desc: '提供气血属性', type: '宝石', type2: '气血', effect: 100, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级内力宝石 = { name: "一级内力宝石", img: 内力宝石图, desc: '提供内力属性', type: '宝石', type2: '内力', effect: 100, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级外攻宝石 = { name: "一级外攻宝石", img: 外攻宝石图, desc: '提供外攻属性', type: '宝石', type2: '外攻', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级内攻宝石 = { name: "一级内攻宝石", img: 内攻宝石图, desc: '提供内攻属性', type: '宝石', type2: '内攻', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级防御宝石 = { name: "一级防御宝石", img: 防御宝石图, desc: '提供防御属性', type: '宝石', type2: '防御', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
const 一级身法宝石 = { name: "一级身法宝石", img: 身法宝石图, desc: '提供身法属性', type: '宝石', type2: '身法', effect: 10, 叠加上限: 999, 品质: '普通', 售出价格: 10, 等级: 1 };
export const itemConfig = ref({
  小还丹,
  大还丹,
  金鲨散,
  金雕散,

  一阶武器,
  一阶帽子,
  一阶衣服,
  一阶腰带,
  一阶鞋子,
  一阶披风,
  一阶手套,
  一阶项链,
  一阶戒指,
  一阶耳环,
  一阶符石,
  二阶武器,
  二阶帽子,
  二阶衣服,
  二阶腰带,
  二阶鞋子,
  二阶披风,
  二阶手套,
  二阶项链,
  二阶戒指,
  二阶耳环,
  二阶符石,

  一级冰攻击宝石,
  一级火攻击宝石,
  一级玄攻击宝石,
  一级毒攻击宝石,
  一级冰穿透宝石,
  一级火穿透宝石,
  一级玄穿透宝石,
  一级毒穿透宝石,
  一级气血宝石,
  一级内力宝石,
  一级外攻宝石,
  一级内攻宝石,
  一级防御宝石,
  一级身法宝石,
});

// 查找物品配置信息
export const findItem = (name) => {
  return itemConfig.value[name]
}

// 查找物品详细数据
export const findItemById = (id) => {
  return itemList.value.find(item => item.id === id)
}

// 添加物品
export const getItem = (name, amount = 1, extra) => {
  // 如果背包已满，则不添加物品
  if (workData.value.bagData.背包物品.length >= workData.value.bagData.背包容量) {
    console.log('背包已满');
    return;
  }
  let item = findItem(name);
  if (!item) {
    console.log('找不到物品', name);
    return;
  };
  let bagItem = workData.value.bagData.背包物品.findLast(item => item.name === name);
  if (item.叠加上限 > 1 && bagItem && bagItem.amount + amount <= item.叠加上限) {
    bagItem.amount += amount;
  } else if (item.叠加上限 > 1 && bagItem && bagItem.amount + amount > item.叠加上限) {
    workData.value.bagData.背包物品.push({ name: item.name, amount: amount - (item.叠加上限 - bagItem.amount), id: workData.value.itemId++, extra: extra });
    bagItem.amount = item.叠加上限;
  } else if (item.叠加上限 > 1 && !bagItem && amount >= item.叠加上限) {
    workData.value.bagData.背包物品.push({ name: item.name, amount: item.叠加上限, id: workData.value.itemId++, extra: extra });
    workData.value.bagData.背包物品.push({ name: item.name, amount: amount - item.叠加上限, id: workData.value.itemId++, extra: extra });
  }
  else {
    let id = workData.value.itemId++;
    workData.value.bagData.背包物品.push({ name: item.name, amount: amount, id: id, extra: extra });
    return id;
  }
}

// 使用物品
export const useItem = (id, amount = 1) => {
  let item = findItemById(id);
  if (!item) {
    console.log('找不到物品', id);
    return;
  };
  // 判断背包中是否有足够的物品
  let bagItem = workData.value.bagData.背包物品.find(item => item.id === id);
  if (bagItem.amount < amount) {
    console.log('物品数量不足', id);
    return;
  }
  // 使用物品
  bagItem.amount -= amount;
  if (bagItem.amount <= 0) {
    removeItemById(id);
  }
}

// 清理指定物品
export const removeItemById = (id) => {
  let index = workData.value.bagData.背包物品.findIndex(item => item.id === id);
  workData.value.bagData.背包物品.splice(index, 1);
}

export const pageNo = ref(1)
// 所有的物品
export const itemList = computed(() => {
  // let list = Array(workData.value.bagData.背包容量).fill(null)
  let list = []
  workData.value.bagData.背包物品.forEach((item, index) => {
    list[index] = { ...findItem(item.name), amount: item.amount, id: item.id }
    if (item.extra) list[index].extra = item.extra
    if (item.等级) list[index].等级 = item.等级
    if (item.品质) list[index].品质 = item.品质
  });
  // 填充至背包容量
  list = list.concat(Array(workData.value.bagData.背包容量 - list.length).fill(null))
  return list
})

// 分页之后的物品
export const pageItemList = computed(() => {
  return itemList.value.slice((pageNo.value - 1) * 40, pageNo.value * 40)
})

// 整理
export const sortItem = () => {
  let newItemList = itemList.value.sort(function (a, b) {
    if (!a) return 1;
    if (!b) return -1;
    // 按照穿戴顺序排列
    // if (a.hasOwnProperty("extra") && b.hasOwnProperty("extra")) {
    //   return a.extra.穿戴状态 === b.extra.穿戴状态 ? 0 : (a.extra.穿戴状态 ? -1 : 1);
    // }
    // 按照类型排序（装备在前）
    var 类型顺序 = { "药品": 1, "装备": 2, "宝石": 3, "礼包": 4 };
    if (a.hasOwnProperty("type") && b.hasOwnProperty("type") && a.type !== b.type) {
      return 类型顺序[a.type] - 类型顺序[b.type];
    } else {
      // 如果类型相同，则按照品质排序
      var 品质顺序 = { "普通": 1, "良品": 2, "上品": 3, "精品": 4, "极品": 5, "稀世": 6 };
      if (a.hasOwnProperty("品质") && b.hasOwnProperty("品质") && 品质顺序[a.品质] !== 品质顺序[b.品质]) {
        return 品质顺序[b.品质] - 品质顺序[a.品质];
      } else {
        // 如果品质相同，则检查是否有分类属性
        if (a.hasOwnProperty("type2") && b.hasOwnProperty("type2")) {
          // 如果有分类属性，则按照分类排序
          var 分类顺序 = { "武器": 1, "手套": 2, "帽子": 3, "衣服": 4, "腰带": 5, "鞋子": 6, "披风": 7, "项链": 8, "戒指": 9, "耳环": 10, "符石": 11, "气血药": 12, "内力药": 13 };
          if (分类顺序[a.type2] !== 分类顺序[b.type2]) {
            return 分类顺序[a.type2] - 分类顺序[b.type2];
          }
        }
        // 如果没有分类属性，或者分类相同，则按照等级排序（等级高的在前）
        return b.等级 - a.等级;
      }
    }


  });
  workData.value.bagData.背包物品.sort(function (a, b) {
    // 查找元素在数组1中的位置
    var indexA = newItemList.findIndex(item => item.id === a.id);
    var indexB = newItemList.findIndex(item => item.id === b.id);
    // 比较位置并返回排序结果
    return indexA - indexB;
  });
}

// 清理背包
export const clearAllItem = () => {
  workData.value.bagData.背包物品 = [];
}

// 清理未穿戴的装备,保留其他物品
export const clearUnWearItem = () => {
  itemList.value.forEach(item => {
    if (item && item.type === '装备' && item.extra && !item.extra.穿戴状态) {
      removeItemById(item.id)
    }
  })
}

// 清理指定品质的装备并且未穿戴
export const clearUnWearItemByQuality = () => {
  itemList.value.forEach(item => {
    if (item && item.type === '装备' && item.extra && !item.extra.穿戴状态 && workData.value.mapData.分解设置.includes(item.品质)) {
      removeItemById(item.id)
    }
  })
}