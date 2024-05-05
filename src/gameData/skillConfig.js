import { workData } from './workData'
import { ElMessage } from 'element-plus'
import 武当绵掌图 from '../assets/img/skill/武当绵掌.png'
import 普通攻击图 from '../assets/img/skill/普通攻击.png'
import 真武七绝剑图 from '../assets/img/skill/真武七绝剑.png'
import { ref, computed, nextTick } from 'vue'

const 普通攻击 = {
  name: '普通攻击',
  type: '普通攻击',
  img: 普通攻击图,
  desc: '普通攻击，内力不足时自动释放。',
  内力消耗: 0,
  伤害: 0,
  伤害成长: 0,
  冷却时间: 0,
  最大层数: 1,
  分类: '通用'
}


const 武当绵掌 = {
  name: '武当绵掌',
  type: '武学伤害',
  img: 武当绵掌图,
  desc: '武当派的主要攻击手段，轻灵飘逸，却又无孔不入，无迹可寻。',
  内力消耗: 10,
  伤害: 5,
  伤害成长: 10,
  冷却时间: 0,
  最大层数: 100,
  分类: '武当'
}

const 真武七绝剑 = {
  name: '真武七绝剑',
  type: '武学伤害',
  img: 真武七绝剑图,
  desc: '武当派剑法，以剑为主，以掌为辅，剑气纵横，掌风凌厉。',
  内力消耗: 50,
  伤害: 50,
  伤害成长: 100,
  冷却时间: 10,
  最大层数: 100,
  分类: '武当'
}

export const occupationSkill = {
  通用: [普通攻击],
  武当: [武当绵掌, 真武七绝剑],
  魔教: [],
}

export const occupationAllSkill = [
  普通攻击,
  武当绵掌,
  真武七绝剑
]

export const 门派武学列表 = computed(() => {
  return 武学列表.value.filter(item => item.分类 !== '通用')
})

export const 通用武学列表 = computed(() => {
  return 武学列表.value.filter(item => item.分类 === '通用')
})

export const 武学列表 = computed(() => {
  let list = []
  // 初始化武学状态
  workData.value.skillData.习得武学.forEach((item,index) => {
    list[index] = JSON.parse(JSON.stringify(occupationAllSkill.find(skill => skill.name === item.name)))
    list[index].是否首选 = item.是否首选
    list[index].是否上阵 = item.是否上阵
    list[index].层数 = item.层数
    list[index].是否解锁 = item.是否解锁
    list[index].熟练度 = item.熟练度
    list[index].倒计时 = item.倒计时
    list[index].附加伤害 = list[index].层数 * list[index].伤害成长 + list[index].伤害
    list[index].所需熟练度 = Math.floor(Math.pow(1.1, list[index].层数 - 1) * 1000)
  })
  return list
})

export const 初始化武学列表 = () => {
  occupationSkill.通用.forEach(item => {
    if (!workData.value.skillData.习得武学.find(skill => skill.name === item.name)) {
      workData.value.skillData.习得武学.push({
        name: item.name,
        是否首选: false,
        是否上阵: false,
        层数: 1,
        是否解锁: false,
        熟练度: 0,
        倒计时: 0
      })
    }
  })
  occupationSkill[workData.value.personData.门派].forEach(item => {
    if (!workData.value.skillData.习得武学.find(skill => skill.name === item.name)) {
      workData.value.skillData.习得武学.push({
        name: item.name,
        是否首选: false,
        是否上阵: false,
        层数: 1,
        是否解锁: false,
        熟练度: 0,
        倒计时: 0
      })
    }
  })
  workData.value.skillData.习得武学.forEach(item => {
    item.倒计时 = 0
  })
}
export const 上阵武学列表 = computed(() => {
  return 武学列表.value.filter(item => item.是否上阵)
})

export const 主技能 = computed(() => {
  let skill = 上阵武学列表.value.find(item => item.是否首选)
  if(!skill || skill.内力消耗 > workData.value.personData.当前内力) {
    return 武学列表.value.find(item => item.name === '普通攻击')
  }else {
    return skill
  }
})

export const 设为首选 = (name) => {
  workData.value.skillData.习得武学.forEach(item => item.是否首选 = false)
  workData.value.skillData.习得武学.find(item => item.name === name).是否首选 = true
  ElMessage({
    message: '设置成功',
    type: 'success',
    plain: true
  })
}

export const 学习武学 = (name) => {
  workData.value.skillData.习得武学.find(item => item.name === name).是否解锁 = true
  ElMessage({
    message: '学习成功',
    type: 'success',
    plain: true
  })
}

export const 上阵武学 = (name) => {
  // 至多上阵8个武学
  if (上阵武学列表.value.length >= 6) {
    ElMessage({
      message: '上阵武学不能超过6个',
      type: 'warning',
      plain: true
    })
    return
  }
  workData.value.skillData.习得武学.find(item => item.name === name).是否上阵 = true
  ElMessage({
    message: '上阵成功',
    type: 'success',
    plain: true
  })
}
export const 下阵武学 = (name) => {
  workData.value.skillData.习得武学.find(item => item.name === name).是否上阵 = false
  workData.value.skillData.习得武学.find(item => item.name === name).是否首选 = false
  ElMessage({
    message: '下阵成功',
    type: 'success',
    plain: true
  })
}