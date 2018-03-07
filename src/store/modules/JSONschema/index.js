import actions from './actions';

/*
Entries will be deleted from here.
*/

const state = {
  schemas: {},
  entries: {},
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  setSchema(s, { name, schema }) {
    // there should be some basic validation before commit
    if (name && schema) {
      s.schemas[name] = schema;
    }
  },
  setEntry(s, { name, entry }) {
    if (name && entry) {
      s.entries[name] = entry;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
