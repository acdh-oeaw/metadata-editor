// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import vSelect from 'vue-select';
import { sync } from 'vuex-router-sync';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store/index';
import router from './router';
import './assets/fundament.min.css';


Vue.component('v-select', vSelect);

Vue.use(BootstrapVue);
sync(store, router);
Vue.config.productionTip = false;


/* eslint-disable no-new */
new Vue({
  store,
  router,
}).$mount('#app');
