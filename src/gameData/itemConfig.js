import { ref, computed } from "vue";
import { workData } from "./workData.js";
import {itemConfig} from './itemList.js'



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