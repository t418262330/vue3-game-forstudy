<template>
  <div class="roleInfo-wrap">
    <div class="personInfo">
      <div class="personInfo-name w100">人物属性</div>
      <div class="personInfo-item">
        <div class="personInfo-title">昵称</div>
        <div class="personInfo-content">{{ personDataComputed.昵称 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">称号</div>
        <div class="personInfo-content">暂无</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">等级</div>
        <div class="personInfo-content">{{ personDataComputed.等级 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">门派</div>
        <div class="personInfo-content">{{ personDataComputed.门派 }}</div>
      </div>
      <div class="personInfo-item w100">
        <div class="personInfo-title">经验</div>
        <div class="personInfo-content">{{ workData.personData.当前经验 }} / {{ personDataComputed.所需经验 }}</div>
      </div>
      <div class="personInfo-item w100">
        <div class="personInfo-title">气血</div>
        <div class="personInfo-content">{{ personDataComputed.当前气血 }} / {{ personDataComputed.气血 }}</div>
      </div>
      <div class="personInfo-item w100">
        <div class="personInfo-title">内力</div>
        <div class="personInfo-content">{{ personDataComputed.当前内力 }} / {{ personDataComputed.内力 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">外攻</div>
        <div class="personInfo-content">{{ personDataComputed.外攻 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">内攻</div>
        <div class="personInfo-content">{{ personDataComputed.内攻 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">防御</div>
        <div class="personInfo-content">{{ personDataComputed.防御 }}</div>
      </div>
      <div class="personInfo-item">
        <div class="personInfo-title">身法</div>
        <div class="personInfo-content">{{ personDataComputed.身法 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { personDataComputed,workData } from '../../gameData/workData'


</script>

<style lang="scss" scoped>
.roleInfo-wrap {
  width: 100%;
  height: 100%;
  background: rgba($color: #fff, $alpha: .9);
  display: flex;
  padding: 20px;
  box-sizing: border-box;
}

:deep(.el-descriptions__body) {
  background-color: none !important;
}

.personInfo {
  width: 300px;
  height: 600px;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  .personInfo-name {
    font-size: 26px;
    font-weight: 600;
    padding-bottom: 20px;  
  }
  
  .personInfo-item {
    width: 50%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 10px;
    .personInfo-title {
      font-size: 16px;
      // font-weight: 600;
    }
    .personInfo-content {
      font-size: 14px;
    }
  }
  .w100 {
    width: 100% !important;
  }
}
</style>