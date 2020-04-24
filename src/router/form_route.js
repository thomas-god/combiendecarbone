const meta = { name: 'Calculateur' }

const routes = [
  {
    path: 'transports',
    meta: { ...meta, cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "transports" */ `../components/Transports.vue`
      )
  },
  {
    path: 'logement',
    meta: { ...meta, cat: 'Logement' },
    component: () =>
      import(/* webpackChunkName: "logement" */ `../components/Logement.vue`)
  },
  {
    path: 'alimentation',
    meta: { ...meta, cat: 'Alimentation' },
    component: () =>
      import(
        /* webpackChunkName: "alimentation" */ `../components/Alimentation.vue`
      )
  },
  {
    path: 'consommation',
    meta: { ...meta, cat: 'Consommation' },
    component: () =>
      import(
        /* webpackChunkName: "consommation" */ `../components/Consommation.vue`
      )
  },
  {
    path: 'resultats',
    meta: { ...meta, cat: 'Résultats' },
    component: () =>
      import(/* webpackChunkName: "resultats" */ `../components/Resultats.vue`)
  }
]

export default routes
