/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import mutations from './mutations';

const state = {
  appbar: false,
  toolbar: false,
};

const getters = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
