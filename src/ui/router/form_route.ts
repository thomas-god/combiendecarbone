const meta = { name: 'Calculateur' };

const routes = [
  {
    path: 'transports',
    meta: { ...meta, cat: 'Transports' },
    component: () => import(
      /* webpackChunkName: "transports" */ '../components/transports/TransportsMain.vue'
    ),
  },
  {
    path: 'logement',
    meta: { ...meta, cat: 'Logement' },
    component: () => import(
      /* webpackChunkName: "logement" */ '../components/logement/LogementMain.vue'
    ),
  },
  {
    path: 'alimentation',
    meta: { ...meta, cat: 'Alimentation' },
    component: () => import(
      /* webpackChunkName: "alimentation" */ '../components/alimentation/AlimentationMain.vue'
    ),
  },
  {
    path: 'consommation',
    meta: { ...meta, cat: 'Consommation' },
    component: () => import(
      /* webpackChunkName: "consommation" */ '../components/consommation/ConsommationMain.vue'
    ),
  },
  {
    path: 'resultats',
    meta: { ...meta, cat: 'Résultats' },
    component: () => import(
      /* webpackChunkName: "resultats" */ '../components/resultats/ResultatsMain.vue'
    ),
  },
  {
    path: '*',
    redirect: '/forms/transports',
    meta: { ...meta, cat: 'Transports' },
    component: () => import(
      /* webpackChunkName: "methodo-resultats" */ '../components/resultats/ResultatsMethodo.vue'
    ),
  },
];

export default routes;
