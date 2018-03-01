import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import VueAxios from 'vue-axios';
import createLogger from 'vuex/dist/logger';
import jowl from './modules/jowl/index';
import n3 from './modules/n3/index';
import metadata from './modules/metadata/index';


Vue.use(Vuex);
Vue.use(VueAxios, Axios);

Vue.config.debug = true;

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    jowl,
    n3,
    metadata,
  },
  strict: false,
  middlewares: debug ? [createLogger()] : [],
});
