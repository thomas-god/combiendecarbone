import Vue from 'vue'
import App from '@/App.vue'
import router from '@/ui/router'
import store from '@/ui/store'
import vuetify from '@/ui/plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
