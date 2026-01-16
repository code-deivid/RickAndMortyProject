import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import RegisterView from './views/RegisterView.vue'
import LoginView from './views/LoginView.vue'
import FavoriteView from './views/FavoriteView.vue'
import { isAutenticado } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/personajes'
    },
    {
      path: '/personajes',
      component: HomeView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/favoritos',
      component: FavoriteView,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAutenticado()) {
    alert('Debes iniciar sesión para ver tus favoritos.')
    return '/login'
  }
})

export default router
