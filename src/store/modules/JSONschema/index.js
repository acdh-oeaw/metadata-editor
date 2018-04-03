
/*
Entries will be deleted from here.
*/

const state = {
  schemas: {},
  entries: {},
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */
const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  setSchema(s, { name, schema }) {
    this._vm.$info('JSONschema', 'setSchema', name, schema);
    if (name && schema) {
      s.schemas[name] = schema;
    }
  },
  setEntry(s, { name, entry }) {
    this._vm.$info('JSONschema', 'setEntry', name, entry);
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
