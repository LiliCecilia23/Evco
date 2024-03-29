import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoryView from '../views/CategoryView.vue'
import ProductView from '../views/ProductView.vue'
import LogInView from '../views/LogInView.vue'
import CartView from '../views/CartView.vue'

const router = createRouter({
  history: createWebHistory('/Evco'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/category/:name',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
    },
  ]
})

export default router
