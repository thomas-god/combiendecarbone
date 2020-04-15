const routes = [
  {
    path: 'transports',
    component: () =>
      import(
        /* webpackChunkName: "methodo-transports" */ `../components/TransportsMethodo.vue`
      )
  },
  {
    path: 'logement',
    component: () =>
      import(
        /* webpackChunkName: "methodo-logement" */ `../components/LogementMethodo.vue`
      )
  },
  {
    path: 'alimentation',
    component: () =>
      import(
        /* webpackChunkName: "methodo-alimentation" */ `../components/AlimentationMethodo.vue`
      )
  },
  {
    path: 'consommation',
    component: () =>
      import(
        /* webpackChunkName: "methodo-consommation" */ `../components/ConsommationMethodo.vue`
      )
  },
  {
    path: 'resultats',
    component: () =>
      import(
        /* webpackChunkName: "methodo-resultats" */ `../components/ResultatsMethodo.vue`
      )
  },
  {
    path: 'accueil',
    component: () =>
      import(
        /* webpackChunkName: "methodo-accueil" */ `../components/AccueilMethodo.vue`
      )
  }
]

export default routes
