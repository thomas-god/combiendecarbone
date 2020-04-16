const routes = [
  {
    path: 'general',
    meta: { cat: 'Général' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-accueil" */ `../components/AccueilMethodo.vue`
      )
  },
  {
    path: 'transports',
    meta: { cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-transports" */ `../components/TransportsMethodo.vue`
      )
  },
  {
    path: 'logement',
    meta: { cat: 'Logement' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-logement" */ `../components/LogementMethodo.vue`
      )
  },
  {
    path: 'alimentation',
    meta: { cat: 'Alimentation' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-alimentation" */ `../components/AlimentationMethodo.vue`
      )
  },
  {
    path: 'consommation',
    meta: { cat: 'Consommation' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-consommation" */ `../components/ConsommationMethodo.vue`
      )
  },
  {
    path: 'resultats',
    meta: { cat: 'Résultats' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-resultats" */ `../components/ResultatsMethodo.vue`
      )
  }
]

export default routes
