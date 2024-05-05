<template>
  <div class="occupationList-wrap">
    <section class="game-section">
      <div class="owl-carousel custom-carousel owl-theme">
        <div class="item" :class="{ active: item.active }" v-for="(item, index) in occupationList" :key="index"
          @click="changeRole(index)" :style="`background-image: url(${item.img});`">
          <div class="item-desc">
            <h3>{{ item.门派 }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <div class="occupationList-form animate__animated animate__fadeIn" v-if="occupationInfoCurrent">
      <div class="occupationInfo">
        <div class="occupationInfo-item">
          <div>气血成长：</div>
          <div>{{ occupationInfoCurrent.气血成长 }}</div>
        </div>
        <div class="occupationInfo-item">
          <div>内力成长：</div>
          <div>{{ occupationInfoCurrent.内力成长 }}</div>
        </div>
        <div class="occupationInfo-item">
          <div>外攻成长：</div>
          <div>{{ occupationInfoCurrent.外攻成长 }}</div>
        </div>
        <div class="occupationInfo-item">
          <div>内攻成长：</div>
          <div>{{ occupationInfoCurrent.内攻成长 }}</div>
        </div>
        <div class="occupationInfo-item">
          <div>防御成长：</div>
          <div>{{ occupationInfoCurrent.防御成长 }}</div>
        </div>
        <div class="occupationInfo-item">
          <div>身法成长：</div>
          <div>{{ occupationInfoCurrent.身法成长 }}</div>
        </div>
      </div>
      <div class="occupationForm">
        <el-input v-model="occupationForm.name" size="large" placeholder="敢问阁下尊姓大名？"></el-input>
        <div class="createRoleBtn" @click="createRole">完成创建</div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElNotification } from 'element-plus'
const emit = defineEmits(['createRoleFinish'])

import WuDangBg from '../../assets/img/role/WuDang.png'
import MoJiaoBg from '../../assets/img/role/MoJiao.png'

import { occupationInfo,occupationList } from '../../gameData/occupationConfig'
import { userData } from '../../gameData/userData'

const changeRole = (index) => {
  if (occupationList.value[index].门派 === '敬请期待') {
    ElNotification({
      title: '提示',
      message: '此角色暂未开放，敬请期待！',
      type: 'success',
    })
    return
  }
  occupationList.value.forEach((item, i) => {
    item.active = i === index
  })
  occupationInfoCurrent.value = occupationInfo.value.find(item => item.门派 === occupationList.value[index].门派)
}

const occupationInfoCurrent = ref(null)

const occupationForm = ref({
  name: '',
})

const createRole = () => {
  //如果没有空角色，则提示
  if (userData.value.roleList.length >= 4) {
    ElNotification({
      title: '提示',
      message: '角色数量达到上限！',
      type: 'error',
    })
    return
  }
  if (!occupationForm.value.name) {
    ElNotification({
      title: '提示',
      message: '阁下，请留下尊姓大名！',
      type: 'error',
    })
    return
  }
  //限制角色名字长度2-4
  if (occupationForm.value.name.length < 2 || occupationForm.value.name.length > 5) {
    ElNotification({
      title: '提示',
      message: '角色名字长度限制2-4个字符！',
      type: 'error',
    })
    return
  }
  // 不能与已有角色名字重复
  if (userData.value.roleList.find(item => item.name === occupationForm.value.name)) {
    ElNotification({
      title: '提示',
      message: '角色名字重复！',
      type: 'error',
    })
    return
  }
  let newRole = {
    name: occupationForm.value.name,
    门派: occupationInfoCurrent.value.门派,
    等级: 1,
    内功伤害: occupationInfoCurrent.value.内功伤害,
    外功伤害: occupationInfoCurrent.value.外功伤害,
    冰元素伤害: occupationInfoCurrent.value.冰元素伤害,
    火元素伤害: occupationInfoCurrent.value.火元素伤害,
    玄元素伤害: occupationInfoCurrent.value.玄元素伤害,
    毒元素伤害: occupationInfoCurrent.value.毒元素伤害,
  }
  ElNotification({
    title: '提示',
    message: '角色创建成功！',
    type: 'success',
  })
  userData.value.roleList.push(newRole)
  emit('createRoleFinish', newRole)
}

onMounted(() => {
  changeRole(0)
})

</script>

<style lang="scss" scoped>
.occupationList-wrap {
  width: 100%;
}

.occupationList-form {
  height: 250px;
  background: rgba($color: #fff, $alpha: .9);
  margin: 0 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-evenly;

  .occupationInfo {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    margin-left: 20px;

    .occupationInfo-item {
      // flex: 1;
      width: 150px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
  }

  .occupationForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;

    .createRoleBtn {
      font-size: 40px;
      margin-top: 30px;
      transition: all 0.3s;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
    }

    .createRoleBtn:hover {
      background: #e0e0e0;
    }
  }
}

.owl-carousel {
  display: flex;
}

.clear {
  clear: both;
}

img {
  max-width: 100%;
  border: 0px;
}

ul,
ol {
  list-style: none;
}

a {
  text-decoration: none;
  color: inherit;
  outline: none;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}

a:focus,
a:active,
a:visited,
a:hover {
  text-decoration: none;
  outline: none;
}

a:hover {
  color: #e73700;
}

h2 {
  margin-bottom: 48px;
  padding-bottom: 16px;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  position: relative;
  text-transform: capitalize;
}

h3 {
  margin: 0 0 10px;
  font-size: 28px;
  line-height: 36px;
}

button {
  outline: none !important;
}

/******* Common Element CSS End *********/

/* -------- title style ------- */
.line-title {
  position: relative;
  width: 400px;
}

.line-title::before,
.line-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  border-radius: 2px;
}

.line-title::before {
  width: 100%;
  background: #f2f2f2;
}

.line-title::after {
  width: 32px;
  background: #e73700;
}

/******* Middle section CSS Start ******/
/* -------- Landing page ------- */
.game-section {
  // padding: 60px 50px;
  width: 100%;
  transition: all 1s;
}

.game-section .owl-stage {
  margin: 15px 0;
  display: flex;
  display: -webkit-flex;
}

.game-section .item {
  margin: 0 15px 60px;
  width: 320px;
  height: 400px;
  display: flex;
  display: -webkit-flex;
  align-items: flex-end;
  -webkit-align-items: flex-end;
  background: #fff no-repeat center center / cover;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}

.game-section .item.active {
  position: relative;
  width: 500px;
  // 向上偏移
  transform: translateY(-20px);
  box-shadow: 12px 40px 40px rgba(0, 0, 0, 0.25);
  -webkit-box-shadow: 12px 40px 40px rgba(0, 0, 0, 0.25);
}

.game-section .item:after {
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}

.game-section .item-desc {
  padding: 0 24px 12px;
  color: #fff;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transform: translateY(calc(100% - 54px));
  -webkit-transform: translateY(calc(100% - 54px));
  transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
}

.game-section .item.active .item-desc {
  transform: none;
  -webkit-transform: none;
}

.game-section .item-desc p {
  opacity: 0;
  -webkit-transform: translateY(32px);
  transform: translateY(32px);
  transition: all 0.4s ease-in-out 0.2s;
  -webkit-transition: all 0.4s ease-in-out 0.2s;
}

.game-section .item.active .item-desc p {
  opacity: 1;
  -webkit-transform: translateY(0);
  transform: translateY(0);
}

.game-section .owl-theme.custom-carousel .owl-dots {
  margin-top: -20px;
  position: relative;
  z-index: 5;
}
</style>