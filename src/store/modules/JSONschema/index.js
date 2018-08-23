
const state = {
  tabs: [{ name: 'person', type: 'person' }, { name: 'place', type: 'place' }, { name: 'organisation', type: 'organisation' }, { name: 'collection', type: 'collection' }, { name: 'project', type: 'project' }],
  schemas: {},
  entries: {}, /* = { model: {..actual entries go here..},
    schema: 'schematype* corresponding to a key in schemas goes here' */
  p: ['entries', 'schemas'],
  edits: {},
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */

const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  /* rebuilds store from localstorage upon page reload. Currently used in StoreDialog
   */
  constructJSONschema(s, { pState }) {
    this._vm.$info('constructJSONschema(s, { pState })', JSON.stringify(s), JSON.stringify(pState));
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.JSONschema[s.p[i]];
    }
  },
  setSchema(s, { name, schema }) {
    this._vm.$info('JSONschema.setSchema(name, schema)', name, schema);
    if (!s.schemas) {
      s.schemas = {};
    }
    if (name && schema) {
      s.schemas[name] = schema;
    }
  },
  setEntry(s, { name, entry, schema }) {
    this._vm.$info(name, entry);
    if (name && entry && schema) s.entries[name] = { model: entry, schema };
  },
  /*
  converts a given query (data from n3-store) to a usable model for a formFromSchema
  and sets it to entrys using the given name.
  assumes that the wanted schema, is already fetched. if it is not, nothing happens
  */
  queryToEntry(s, { name, query, type, subject }) {
    this._vm.$debug('queryToEntry: name, query, type\n\t', name, query, type, subject);

    if (!s.schemas[type] || !name || !type) { return; }

    const m = {};
    const modelTemplate = s.schemas[type].properties;

    const keys = Object.keys(modelTemplate);
    for (let i = 0; i < keys.length; i += 1) {
      if (query[keys[i]]) {
        m[keys[i]] = query[keys[i]];
      } else {
        m[keys[i]] = '';
      }
    }
    s.entries[name] = {};
    s.entries[name].model = m;
    s.entries[name].schema = type;
    s.entries[name].subject = subject;
  },
  saveEdit(s, { subject, model }) {
    s.edits[subject] = model;
  },
  deleteEdit(s, { subject }) {
    delete s.edits[subject];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
