import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Forms from '../views/Forms.vue'
import FormsRoute from './form_route.js'
import Methodology from '../views/Methodology.vue'
import MethodoRoutes from './methodo_routes.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/forms',
    name: 'forms',
    component: Forms,
    children: FormsRoute
  },
  {
    path: '/methodologie',
    name: 'methodologie',
    component: Methodology,
    children: MethodoRoutes
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
