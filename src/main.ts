import { promises as fs } from 'fs';

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

    $defaultSaveRoot: string;
    $projectRoot: string;

    $createIfNotExists: Function;
  }
}

Vue.prototype.$defaultSaveRoot = `${(Vue.prototype.$electron.app || Vue.prototype.$electron.remote.app).getPath('userData')}/script-editor`;
Vue.prototype.$projectRoot = `${Vue.prototype.$defaultSaveRoot}/project`;

Vue.prototype.$createIfNotExists = async function (path: string) {
  try {
    await fs.stat(`${path}`).catch(async (err) => {
      if (err.code === 'ENOENT') {
        await fs.mkdir(`${path}`);
      }
    });
  } catch (e) {
    console.error(e);
  }
};

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app');
