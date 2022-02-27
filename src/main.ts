import Vue from 'vue';
import App from './App.vue';
import router from './ui/router';
import vuetify from './ui/plugins/vuetify';
import '@babel/polyfill';
import store from './ui/store';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
