<template>
  <div class="role-wrap">
    <div class="router-name">选择角色</div>
    <div style="margin-top: 50px;margin-left:20px;display: flex;">
      <div class="roleList animate__animated animate__fadeIn">
        <div class="roleList-item" :class="{ current: item.current }" v-for="(item, index) in userData.roleList"
          @click="createRole(item.name)" :key="item.name">
          <div style="display: flex;justify-content: space-around;align-items: center;width: 100%;">
            <div class="roleList-item-btn" style="align-items: self-start;">
              <div>昵称：{{ item.name }}</div>
              <div>门派：{{ item.门派 }}</div>
              <div>等级：{{ item.等级 }}</div>
            </div>

            <div class="roleList-item-btn">
              <el-button @click="enterGame(item.name)">进入江湖</el-button>
              <el-button style="margin-left: 0px;margin-top:10px" type="danger"
                @click="deleteRole(index)">删除角色</el-button>
            </div>
          </div>
        </div>
        <div class="roleList-item" @click="createRole()" v-for="item in 4 - userData.roleList.length">
          <div style="font-size: 30px;">点击创建角色</div>
        </div>
      </div>
      <div style="flex:1">
        <OccupationSelectList @createRoleFinish="createRoleFinish" class="animate__animated animate__fadeIn"
          v-if="isCreateRole" style="width: 1150px;">
        </OccupationSelectList>
        <RoleInfo class="animate__animated animate__fadeIn" v-if="workData" style="width: 1150px;"></RoleInfo>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import OccupationSelectList from './OccupationSelectList.vue';
import RoleInfo from './RoleInfo.vue';

import { userData, saveUserData } from '../../gameData/userData'
import { workData, originalWorkData } from '@/gameData/workData';

const router = useRouter();
// 进入游戏
const enterGame = (name) => {
  ElNotification({
    message: '欢迎进入江湖',
    type: 'success',
  })
  createRole(name)
  router.push('/home')
}

// 创建角色
const isCreateRole = ref(false);
const createRole = (name) => {
  if (name) {
    isCreateRole.value = false;
    userData.value.roleList.forEach((item) => {
      item.current = false
    })
    userData.value.roleList.find((item) => item.name === name).current = true;
    // 获取角色信息
    getRoleInfo(name)
  } else {
    userData.value.roleList.forEach((item) => {
      item.current = false
    })
    workData.value = null;
    isCreateRole.value = true;
  }
}

// 生成角色信息
const initRoleInfo = (newRole) => {
  console.log(newRole);
  let roleInfo = Object.assign({}, originalWorkData)
  roleInfo.personData.name = newRole.name
  roleInfo.personData.门派 = newRole.门派
  roleInfo.personData.外功伤害 = newRole.外功伤害
  roleInfo.personData.内功伤害 = newRole.内功伤害
  roleInfo.personData.冰元素伤害 = newRole.冰元素伤害
  roleInfo.personData.火元素伤害 = newRole.火元素伤害
  roleInfo.personData.玄元素伤害 = newRole.玄元素伤害
  roleInfo.personData.毒元素伤害 = newRole.毒元素伤害
  roleInfo.personData.等级 = 1
  // 存储角色信息到本地
  localStorage.setItem(roleInfo.personData.name, JSON.stringify(roleInfo))
}
// 获取角色信息
const getRoleInfo = (name) => {
  workData.value = JSON.parse(localStorage.getItem(name))
}

// 创建角色完成
const createRoleFinish = (newRole) => {
  isCreateRole.value = false;
  saveUserData()
  // 生成角色信息
  initRoleInfo(newRole)
  // 获取角色信息
  createRole(newRole.name)
  // getRoleInfo(newRole.name)
}

// 获取角色信息
// 删除角色
const deleteRole = (index) => {
  ElMessageBox.confirm('删除角色后将无法恢复', {
    // if you want to disable its autofocus
    // autofocus: false,
    confirmButtonText: '确认删除',
    cancelButtonText: '我再考虑考虑',
    type: 'warning',
    callback: (action) => {
      if (action === 'confirm') {
        localStorage.removeItem(userData.value.roleList[index].name)
        userData.value.roleList.splice(index, 1)
        isCreateRole.value = false;
        workData.value = null;
        ElNotification({
          title: '提示',
          message: '角色已删除！',
          type: 'success',
        })
      }
    },
  })

}
// 初始化
onMounted(() => {
  // userData.value.roleList.forEach((item, index) => {
  //   item.current = false
  // })
})

// 监听userData，变化则保存
watch(userData, (newData) => {
  saveUserData()
}, { deep: true })
</script>

<style lang="scss" scoped>
.role-wrap {
  height: 100vh;
  // background-image: url('../../assets/login/login-Bg.png');
  // background-repeat: no-repeat;
  // background-size: cover;
}

.roleList {
  min-width: 400px;
  margin-right: 100px;

  .roleList-item {
    height: 170px;
    background: rgba($color: #fff, $alpha: .9);
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    transition: all 0.3s;
    cursor: pointer;

    .roleList-item-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all 0.3s;

      div {
        padding: 5px 10px;
        border-radius: 5px;
      }

    }
  }

  .roleList-item:last-child {
    margin-bottom: 0;
  }

  .current {
    transform: translateX(20px);
  }
}
</style>