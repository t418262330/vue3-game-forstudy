import { itemList, findItemById, useItem, getItem } from './itemConfig';
import { computed } from 'vue';

// 获取所有宝石
export const gemstoneList = computed(() => {
  return itemList.value.filter(item => item?.type === '宝石');
});

export const 装备可镶嵌宝石 = {
  武器: ['外攻', '内攻'],
  帽子: ['气血', '内力'],
  衣服: ['防御'],
  腰带: ['防御', '身法'],
  鞋子: ['身法'],
  披风: ['防御', '身法'],
  手套: ['外攻', '内攻'],
  项链:['冰攻击', '火攻击', '玄攻击','毒攻击','冰穿透','火穿透','玄穿透','毒穿透'],
  戒指:['冰攻击', '火攻击', '玄攻击','毒攻击','冰穿透','火穿透','玄穿透','毒穿透'],
  耳环:['冰攻击', '火攻击', '玄攻击','毒攻击','冰穿透','火穿透','玄穿透','毒穿透'],
  符石:['冰攻击', '火攻击', '玄攻击','毒攻击','冰穿透','火穿透','玄穿透','毒穿透'],
}

export const 镶嵌宝石 = (装备id, 宝石) => {
  console.log('镶嵌宝石');
  let 装备 = findItemById(装备id);
  if (!装备.extra.宝石) 装备.extra.宝石 = [];
  // 最多5个宝石
  if (装备.extra.宝石.length >= 5) return;
  // 镶嵌宝石
  findItemById(装备id).extra.宝石.push(宝石.name)
  // 消耗宝石
  useItem(宝石.id);
}

export const 卸下宝石 = (装备id, 宝石, index) => {
  console.log('卸下宝石');
  let 装备 = findItemById(装备id);
  if (!宝石) return;
  // 仓库增加宝石
  if (index !== -1) getItem(宝石.name);
  if (index !== -1) 装备.extra.宝石.splice(index, 1);
}