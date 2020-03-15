import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import FormTransports from '../views/FormTransports.vue'
import FormAlimentation from '../views/FormAlimentation.vue'
import FormLogement from '../views/FormLogement.vue'
import FormConso from '../views/FormConso.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/form/transports',
    name: 'formTransports',
    component: FormTransports
  },
  {
    path: '/form/logement',
    name: 'formLogement',
    component: FormLogement
  },
  {
    path: '/form/conso',
    name: 'formConso',
    component: FormConso
  },
  {
    path: '/form/alimentation',
    name: 'formAlimentation',
    component: FormAlimentation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
