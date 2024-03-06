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
      path: '/Evco',
      name: 'home',
      component: HomeView
    },
    {
      path: 'Evco/category/:name',
      name: 'category',
      component: CategoryView,
    },
    {
      path: 'Evco/product/:id',
      name: 'product',
      component: ProductView,
    },
    {
      path: 'Evco/login',
      name: 'login',
      component: LogInView,
    },
    {
      path: 'Evco/cart',
      name: 'cart',
      component: CartView,
    },
  ]
})

export default router
