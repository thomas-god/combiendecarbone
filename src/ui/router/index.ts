import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/ui/views/HomeView.vue';
import Forms from '@/ui/views/FormsView.vue';
import FormsRoute from '@/ui/router/form_route';
import Methodology from '@/ui/views/MethodologyView.vue';
import MethodoRoutes from '@/ui/router/methodo_routes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Accueil',
    meta: { name: 'Accueil' },
    component: Home,
  },
  {
    path: '/forms',
    name: 'Calculateur',
    component: Forms,
    children: FormsRoute,
  },
  {
    path: '/methodologie',
    name: 'Méthodologie',
    component: Methodology,
    children: MethodoRoutes,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
