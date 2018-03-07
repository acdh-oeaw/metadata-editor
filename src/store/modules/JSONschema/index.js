import actions from './actions';

const state = {
  schemas: [],
  entry: { test: 'tese' },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  setSchema(s, name, schema) {
    // there should be some basic validation before commit
    if (name && schema) {
      s.schemas[name] = schema;
    }
  },
  setEntry(s, entry) {
    s.entry = entry;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
