import {itemList,findItemById,useItem,getItem } from './itemConfig';
import { computed } from 'vue';

// 获取所有宝石
export const gemstoneList = computed(() => {
  return itemList.value.filter(item => item?.type === '宝石');
});

export const 装备可镶嵌宝石 = {
  武器: ['外攻','内攻'],
}

export const 镶嵌宝石 = (装备id,宝石)=>{
  console.log('镶嵌宝石');
  let 装备 = findItemById(装备id);
  if(!装备.extra.宝石) 装备.extra.宝石 = [];
  // 最多5个宝石
  if(装备.extra.宝石.length >= 5) return;
  // 镶嵌宝石
  findItemById(装备id).extra.宝石.push(宝石.name)
  // 消耗宝石
  useItem(宝石.id);
}

export const 卸下宝石 = (装备id,宝石,index)=>{
  console.log('卸下宝石');
  let 装备 = findItemById(装备id);
  if(!宝石) return;
  // 仓库增加宝石
  if(index !== -1) getItem(宝石.name);
  if(index !== -1) 装备.extra.宝石.splice(index,1);
}