<template>
  <el-dialog v-model="visible" :append-to-body=true width="900" :show-close="false">
    <template #header>
    </template>
    <div class="menu-role">
      <div class="menu-title">角色</div>
      <div class="menu-content">
        <div>
          <div class="menu-title2">基础属性</div>
          <div class="item-wrap">
            <div class="item">
              <div class="item-title">等级</div>
              <div class="item-content">{{ personDataComputed.等级 }}</div>
            </div>
            <div class="item">
              <div class="item-title">经验</div>
              <div class="item-content">{{ personDataComputed.当前经验 }} / {{ personDataComputed.所需经验 }}</div>
            </div>
            <div class="item">
              <div class="item-title">门派</div>
              <div class="item-content">{{ personDataComputed.门派 }} </div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="气血为0后角色死亡">
                <template #reference>
                  <div class="item-title">气血</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.气血 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="每10秒回复的气血">
                <template #reference>
                  <div class="item-title">气血回复</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.气血回复 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="每次攻击回复的气血值">
                <template #reference>
                  <div class="item-title">气血吸取</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.气血吸取 }}%</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="释放武学会消耗内力">
                <template #reference>
                  <div class="item-title">内力</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.内力 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="每10秒回复的内力">
                <template #reference>
                  <div class="item-title">内力回复</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.内力回复 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="每次攻击回复的内力">
                <template #reference>
                  <div class="item-title">内力吸取</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.内力吸取 }}%</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="魔教等门派擅长外攻">
                <template #reference>
                  <div class="item-title">外攻</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.外攻 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="外功伤害系数">
                <template #reference>
                  <div class="item-title">外功伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.外功伤害 }}% </div>
            </div>

            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="减免受到的伤害">
                <template #reference>
                  <div class="item-title">防御</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.防御 }}</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="武当等门派擅长内攻">
                <template #reference>
                  <div class="item-title">内攻</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.内攻 }}</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="内功伤害系数">
                <template #reference>
                  <div class="item-title">内功伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.内功伤害 }}%</div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="身法会影响攻击间隔，命中和闪避">
                <template #reference>
                  <div class="item-title">身法</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.身法 }}</div>
            </div>
          </div>
          <el-popover placement="top-start" trigger="hover" :width="180"
            content="元素属性在后期可提升可观的伤害，只有在穿透大于敌方抗性的时候才能发挥全部伤害，每小于1点，降低1%的元素伤害">
            <template #reference>
              <div class="menu-title2">元素属性</div>
            </template>
          </el-popover>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="造成冰元素伤害">
                <template #reference>
                  <div class="item-title">冰攻击</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.冰攻击 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="忽视敌方的冰属性抗性">
                <template #reference>
                  <div class="item-title">冰穿透</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.冰穿透 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="冰伤害系数">
                <template #reference>
                  <div class="item-title">冰元素伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.冰元素伤害 }}%</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="造成火元素伤害">
                <template #reference>
                  <div class="item-title">火攻击</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.火攻击 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="忽视敌方的火属性抗性">
                <template #reference>
                  <div class="item-title">火穿透</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.火穿透 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="火伤害系数">
                <template #reference>
                  <div class="item-title">火元素伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.火元素伤害 }}%</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="造成玄元素伤害">
                <template #reference>
                  <div class="item-title">玄攻击</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.玄攻击 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="忽视敌方的玄属性抗性">
                <template #reference>
                  <div class="item-title">玄穿透</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.玄穿透 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="玄元素伤害">
                <template #reference>
                  <div class="item-title">玄元素伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.玄元素伤害 }}%</div>
            </div>
          </div>
          <div class="item-wrap">
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="造成毒元素伤害">
                <template #reference>
                  <div class="item-title">毒攻击</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.毒攻击 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="忽视敌方的毒属性抗性">
                <template #reference>
                  <div class="item-title">毒穿透</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.毒穿透 }} </div>
            </div>
            <div class="item">
              <el-popover placement="top-start" trigger="hover" :width="180" content="毒元素伤害">
                <template #reference>
                  <div class="item-title">毒元素伤害</div>
                </template>
              </el-popover>
              <div class="item-content">{{ personDataComputed.毒元素伤害 }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <div class="homeMenu-item-wrap">
    <div class="homeMenu-item" @click="visible = true">角色</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { personDataComputed } from '@/gameData/workData';

const visible = ref(false)
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
  justify-content: center;
  align-items: center;

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
</style>