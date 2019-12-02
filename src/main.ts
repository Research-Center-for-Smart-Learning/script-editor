import Vue from 'vue';
import VueElectron from 'vue-electron';
import App from '@/App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.config.ignoredElements = ['field', 'block', 'category', 'xml', 'mutation', 'value', 'sep'];

Vue.use(VueElectron);

declare module 'vue/types/vue' {
  interface Vue {
    $electron: any;
  }
}

Vue.prototype.$defaultProjectRoot = `${__dirname}/script-editor/`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
