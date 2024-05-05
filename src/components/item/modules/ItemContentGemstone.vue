<template>
  <div class='itemContentEquipment'>
    <div class="基础属性">
      <div class="title">宝石属性</div>
      <div class="content">
        <p>{{item.type2}}+{{ item.effect }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['item'])
</script>

<style lang="scss" scoped>
.itemContentEquipment {
  .未鉴定 {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(129, 59, 2, 0.2);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(129, 59, 2, 0.5);
    }

    padding: 5px 8px;
  }
}

.基础属性 {
  .title {
    font-size: 16px;
    font-weight: 600;
  }
}
</style>