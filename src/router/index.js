import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/role',
      component: () => import('../views/role/RoleView.vue')
    },
    {
      path: '/test',
      component: () => import('../views/test.vue')
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})

export default router
