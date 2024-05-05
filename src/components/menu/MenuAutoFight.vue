<template>
  <el-dialog v-model="visible" :append-to-body=true width="900" :show-close="false">
    <template #header>
    </template>
    <div class="menu-role">
      <div class="menu-title">挂机</div>
      <div class="menu-content">
        <div>
          <div class="drug-wrap">
            <el-slider style="width: 200px;" v-model="workData.systemConfig.自动吃药.气血临界值" :step="10" />
            <div style='margin: 0 20px'>气血不足{{ workData.systemConfig.自动吃药.气血临界值 }}%自动使用</div>
            <div class="homeEquipment-item-wrap">
              <div class="homeEquipment-item">
                <Item v-if="装备中的气血药" :item="装备中的气血药" :needDrugTime='false' placement="top"></Item>
                <span v-else>血药</span>
              </div>
            </div>
            <el-switch style="margin-left: 20px" v-model="workData.systemConfig.自动吃药.气血药自动开关" size="large"
              active-text="启用" inactive-text="关闭" />
          </div>
          <div class="drug-wrap">
            <div>背包中的气血药：</div>
            <div class="homeEquipment-item-wrap">
              <div class="homeEquipment-item" v-for="(item, index) in 背包中的气血药" :key='index' @click=更换气血药(item.name)>
                <Item :item="item" placement="top" :needDrugTime='false'></Item>
              </div>
            </div>
          </div>
          <div class="drug-wrap">
            <el-slider style="width: 200px;" v-model="workData.systemConfig.自动吃药.内力临界值" :step="10" />
            <div style='margin: 0 20px'>内力不足{{ workData.systemConfig.自动吃药.内力临界值 }}%自动使用</div>
            <div class="homeEquipment-item-wrap">
              <div class="homeEquipment-item">
                <Item v-if="装备中的内力药" :item="装备中的内力药" :needDrugTime='false' placement="top"></Item>
                <span v-else>蓝药</span>
              </div>
            </div>
            <el-switch style="margin-left: 20px" v-model="workData.systemConfig.自动吃药.内力药自动开关" size="large"
              active-text="启用" inactive-text="关闭" />
          </div>
          <div class="drug-wrap">
            <div>背包中的内力药：</div>
            <div class="homeEquipment-item-wrap">
              <div class="homeEquipment-item" v-for="(item, index) in 背包中的内力药" :key='index' @click=更换内力药(item.name)>
                <Item :item="item" placement="top" :needDrugTime='false'></Item>
              </div>
            </div>
          </div>
          <div class="drug-wrap">
            <span>挂机怪物选择：</span>
            <el-checkbox-group v-model="workData.mapData.挂机设置">
              <el-checkbox :label="item" :value="item" v-for="(item,index) in autoFightMonsterList" :key="index"/>
            </el-checkbox-group>
          </div>
          <div class="drug-wrap">
            <span>自动分解装备：</span>
            <el-checkbox-group v-model="workData.mapData.分解设置">
              <el-checkbox label="良品" value="良品"/>
              <el-checkbox label="上品" value="上品"/>
              <el-checkbox label="精品" value="精品"/>
              <el-checkbox label="极品" value="极品"/>
            </el-checkbox-group>
          </div>
          <div class="autoFightBtn">
            <div class="btn large" @click="startAutoFight()" v-if="!autoFightFlag">开始挂机</div>
            <div class="btn large" @click="endAutoFight()" v-if="autoFightFlag">停止挂机</div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <div class="homeMenu-item-wrap">
    <div class="homeMenu-item" @click="visible = true">挂机</div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import { 装备中的气血药, 装备中的内力药, 背包中的气血药, 背包中的内力药, 更换气血药, 更换内力药 } from '../../gameData/drugConfig';
import { workData } from '../../gameData/workData';
import { autoFightFlag,autoFightMonsterList } from '../../gameData/mapConfig';
import Item from '../item/Item.vue';

const visible = ref(false)

const startAutoFight = () => {
  if(workData.value.mapData.挂机设置.length === 0){
    ElMessage({
      message: '请选择挂机怪物',
      type: 'warning',
      plain: true,
    })
    return
  }
  visible.value = false
  autoFightFlag.value = true
}

const endAutoFight = () => {
  autoFightFlag.value = false
}
</script>

<style lang="scss" scoped>
.item-wrap {
  display: flex;
  width: 100%;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 20px;
  width: 50%;
  box-sizing: border-box;

  .item-title {
    font-weight: 600;
  }

  .item-content {
    color: #e9814d;
    font-size: 16px;
    font-weight: 600;
  }
}

.menu-title {
  font-size: 28px;
  font-weight: 600;
  text-align: center;
}

.menu-title2 {
  font-size: 18px;
  font-weight: 600;
  padding: 3px 10px;
  background-color: rgba(129, 59, 2, 0.2);
  border-radius: 4px;
  width: fit-content;
  margin: 15px 0 5px;
}

.menu-role {
  border-radius: 10px;
  padding: 10px;
  background-image: url('../../assets/img/homeMenu/菜单背景2.png');
  position: relative;
  top: -8px;
  transform: scale(1.1);
}

.menu-content {
  width: 100%;
  display: flex;
  height: 450px;
  margin-top: 20px;


  >div {
    flex: 1;
    height: 100%;
  }
}

.homeMenu-item-wrap {
  width: 20%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .homeMenu-item {
    width: 80%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../assets/img/homeMenu/菜单背景.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.1);
    }
  }
}

.homeEquipment-item-wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  .homeEquipment-item {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.938);
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    position: relative;
  }
}

.drug-wrap {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.autoFightBtn {
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: center;
}

:deep(.el-slider__runway) {
  background-color: rgba(255, 255, 255, 0.938);
}
</style>