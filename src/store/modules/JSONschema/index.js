
const state = {
  tabs: [ { name:'place', type: 'place' }, { name: 'person', type: 'person' }, { name: 'organisation', type: 'organisation' } ],
  schemas: {},
  entries: {},
  p: ['entries', 'schemas', 'tabs'],
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */
const getters = {
  getQuery: s => name => s.schemas[name],
};

const mutations = {
  constructJSONschema(s, { pState }) {
    this._vm.$info('constructJSONschema(s, { pState })', JSON.stringify(s), JSON.stringify(pState));
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.JSONschema[s.p[i]];
      // this._vm.$debug(`Found One: s[${s.p[i]}] = ${JSON.stringify(pState.JSONschema[s.p[i]])}`);
    }
  },
  addTab(s, { tab }) {
    s.tabs.push(tab);
  },
  removeTab(s, { name }) {
    s.tabs.filter( (t) => {
      return t.name !== name;
    });
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
  setEntry(s, { name, entry }) {
    this._vm.$log(name, entry);
    if (name && entry) {
      s.entries[name] = entry;
    }
    // s.entries = JSON.parse(JSON.stringify(s.entries));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
