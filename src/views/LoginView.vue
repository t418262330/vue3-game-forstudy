<template>
  <div class="login-wrap">
    <div class="login-step-1" v-if="loginStep === 1">
      <h2>免责声明</h2>
      <p>本游戏为个人兴趣制作，仅供学习交流使用，不得用于商业用途。</p>
      <p>本游戏中的人物、地点、事件等均为虚构，如有雷同，纯属巧合。</p>
      <p>本游戏中的音乐、图片等素材均来源于互联网，如有侵权，请联系作者删除。</p>
      <div class="start animate__infinite	infinite animate__animated animate__flash animate__slower"
        @click="nextStep(2)">进入游戏</div>
    </div>
    <div class="login-step-2" v-if="loginStep === 2">
      <div class="login-gameName animate__animated animate__backInDown">
        <span style="color: rgb(240, 66, 11);margin-right: 100px">侠 </span> 
        <span>道</span>
      </div>
      <div class="login-menu">
        <div @click="router.push('/role')">开始游戏</div>
        <div>游戏设置</div>
        <div>游戏帮助</div>
      </div>
    </div>

  </div>

</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter()

const loginStep = ref(1);
const nextStep = (step) => {
  loginStep.value = step;
}


</script>

<style lang="scss" scoped>
.login-wrap {
  display: flex;
  justify-content: center;
  height: 100vh;
  // background-image: url('../assets/login/login-Bg.png');
  // background-repeat: no-repeat;
  // background-size: cover;

  .login-step-1 {
    font-size: 30px;
    color: #fff;
    margin-top: 50px;
    font-style: italic;

    .start {
      margin-top: 200px;
      font-size: 70px;
      text-align: center;
    }
  }

  .login-step-2 {
    margin-top: 100px;

    .login-gameName {
      font-size: 200px;
      color: #fff;
      font-style: italic;
    }
    .login-menu {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 50px;
      font-size: 40px;
      font-style: italic;
      color: #fff;
      transition: all 1s;
      div {
        margin-top: 20px;
        transition: all 0.3s;
      }
      div:hover {
        transform: translateX(10px);
      }
    }
  }
}
</style>