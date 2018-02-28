import actions from './actions';

const state = {
  metaDataSchema: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
};

const mutations = {
  setmetaDataSchema(s, schema) {
    s.metaDataSchema = schema;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
