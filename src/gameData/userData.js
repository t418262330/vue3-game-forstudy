import { ref } from "vue";

export const userData = ref({
  roleList: [
  ],
})

export const saveUserData = () => {
  localStorage.setItem('userData', JSON.stringify(userData.value));
}

export const loadUserData = () => {
  const data = JSON.parse(localStorage.getItem('userData'));
  if(data){
    userData.value = data;
  }
}