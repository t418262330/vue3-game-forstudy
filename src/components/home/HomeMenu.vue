<template>
  <div class=homeMenu>
    <MenuAutoFight></MenuAutoFight>
    <MenuRole></MenuRole>
    <MenuSkill></MenuSkill>
    <MenuGemstone></MenuGemstone>
  </div>

</template>

<script setup>
import MenuRole from '../menu/MenuRole.vue'
import MenuAutoFight from '../menu/MenuAutoFight.vue';
import MenuSkill from '../menu/MenuSkill.vue';
import MenuGemstone from '../menu/MenuGemstone.vue';
</script>

<style lang="scss" scoped>
.homeMenu {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
}
</style>