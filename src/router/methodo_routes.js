const meta = { name: 'Méthodologie' }

const routes = [
  {
    path: 'general',
    meta: { ...meta, cat: 'Général' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-accueil" */ `../components/AccueilMethodo.vue`
      )
  },
  {
    path: 'transports',
    meta: { ...meta, cat: 'Transports' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-transports" */ `../components/transports/TransportsMethodo.vue`
      )
  },
  {
    path: 'logement',
    meta: { ...meta, cat: 'Logement' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-logement" */ `../components/logement/LogementMethodo.vue`
      )
  },
  {
    path: 'alimentation',
    meta: { ...meta, cat: 'Alimentation' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-alimentation" */ `../components/alimentation/AlimentationMethodo.vue`
      )
  },
  {
    path: 'consommation',
    meta: { ...meta, cat: 'Consommation' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-consommation" */ `../components/consommation/ConsommationMethodo.vue`
      )
  },
  {
    path: 'resultats',
    redirect: '/methodologie/general',
    meta: { ...meta, cat: 'Résultats' },
    component: () =>
      import(
        /* webpackChunkName: "methodo-resultats" */ `../components/resultats/ResultatsMethodo.vue`
      )
  }
]

export default routes
