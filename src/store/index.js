import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import createLogger from 'vuex/dist/logger';
import loader from './modules/loader/index';


Vue.use(Vuex);
Vue.use(VueAxios, Axios);

Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    loader,
  },
  strict: false,
  middlewares: debug ? [createLogger()] : [],
});
