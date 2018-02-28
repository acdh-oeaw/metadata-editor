import actions from './actions';

const state = {
  metaDataShema: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
};

const mutations = {
  setMetaDataShema(s, shema) {
    s.metaDataShema = shema;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
