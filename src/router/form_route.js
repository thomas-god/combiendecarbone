const meta = { name: 'Calculateur' }

const routes = [
  {
    path: 'transports',
    meta: { ...meta, cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "transports" */ `../components/transports/Transports.vue`
      )
  },
  {
    path: 'logement',
    meta: { ...meta, cat: 'Logement' },
    component: () =>
      import(
        /* webpackChunkName: "logement" */ `../components/logement/Logement.vue`
      )
  },
  {
    path: 'alimentation',
    meta: { ...meta, cat: 'Alimentation' },
    component: () =>
      import(
        /* webpackChunkName: "alimentation" */ `../components/alimentation/Alimentation.vue`
      )
  },
  {
    path: 'consommation',
    meta: { ...meta, cat: 'Consommation' },
    component: () =>
      import(
        /* webpackChunkName: "consommation" */ `../components/consommation/Consommation.vue`
      )
  },
  {
    path: 'resultats',
    meta: { ...meta, cat: 'Résultats' },
    component: () =>
      import(
        /* webpackChunkName: "resultats" */ `../components/resultats/Resultats.vue`
      )
  },
  {
    path: '*',
    redirect: '/forms/transports',
    meta: { ...meta, cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-resultats" */ `../components/resultats/ResultatsMethodo.vue`
      )
  }
]

export default routes
