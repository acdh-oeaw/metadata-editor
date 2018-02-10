import * as type from './types';
import actions from './actions';

const state = {
  show: false,
  message: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const mutations = {
  [type.SHOW_LOADER](s, action) {
    s.show = true;
    s.message = action.message;
  },
  [type.HIDE_LOADER](s) {
    s.show = false;
    s.message = '';
  },
};

export default {
  state,
  mutations,
  actions,
};
