import actions from './actions';

const state = {
  metaDataSchema: {},
  entry: { test: 'tese' },
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
};

const mutations = {
  setMetaDataSchema(s, schema) {
    console.log(schema);
    s.metaDataSchema = schema;
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
