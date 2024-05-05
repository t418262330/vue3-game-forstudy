import { ref } from "vue";
import WuDang from '../assets/img/role/WuDang.png'
import MoJiao from '../assets/img/role/MoJiao.png'

export const occupationList = ref([
  { 门派: '武当', active: false, img: WuDang, desc: '注重内攻以及冰属性修炼' },
  { 门派: '敬请期待', active: false, img: MoJiao, desc: '注重外攻以及火属性修炼' },
  { 门派: '敬请期待', active: false, img: '', desc: '' },
  { 门派: '敬请期待', active: false, img: '', desc: '' },
])

export const occupationInfo = ref([
  // 气血内力最高50，其余5
  {
    门派: "武当",
    气血成长: 40,
    内力成长: 80,
    外攻成长: 2,
    内攻成长: 8,
    防御成长: 2,
    身法成长: 6,
    内功伤害: 100,
    外功伤害: 60,
    冰元素伤害: 100,
    火元素伤害: 50,
    玄元素伤害: 80,
    毒元素伤害: 50,
  },
  {
    门派: "魔教",
    气血成长: 60,
    内力成长: 40,
    外攻成长: 6,
    内攻成长: 2,
    防御成长: 6,
    身法成长: 4,
    内功伤害: 60,
    外功伤害: 100,
    冰元素伤害: 50,
    火元素伤害: 100,
    玄元素伤害: 65,
    毒元素伤害: 65,
  },
]);