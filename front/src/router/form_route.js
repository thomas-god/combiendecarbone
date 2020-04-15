const routes = [
  {
    path: 'transports',
    meta: { cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "transports" */ `../components/Transports.vue`
      )
  },
  {
    path: 'logement',
    meta: { cat: 'Logement' },
    component: () =>
      import(/* webpackChunkName: "logement" */ `../components/Logement.vue`)
  },
  {
    path: 'alimentation',
    meta: { cat: 'Alimentation' },
    component: () =>
      import(
        /* webpackChunkName: "alimentation" */ `../components/Alimentation.vue`
      )
  },
  {
    path: 'consommation',
    meta: { cat: 'Consommation' },
    component: () =>
      import(
        /* webpackChunkName: "consommation" */ `../components/Consommation.vue`
      )
  },
  {
    path: 'resultats',
    meta: { cat: 'Résultats' },
    component: () =>
      import(/* webpackChunkName: "resultats" */ `../components/Resultats.vue`)
  }
]

export default routes
