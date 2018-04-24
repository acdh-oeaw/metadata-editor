/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const state = {
  appbar: false,
  toolbar: false,
};

const getters = {

};

const mutations = {
  toggleMode(s) {
    s.appbar = !s.appbar;
    s.toolbar = !s.toolbar;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
