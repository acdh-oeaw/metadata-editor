
/*
Entries will be deleted from here.
*/

const state = {
  schemas: {},
  entries: {},
  p: ['schemas'],
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */
const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  setSchema(s, { name, schema }) {
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
};
