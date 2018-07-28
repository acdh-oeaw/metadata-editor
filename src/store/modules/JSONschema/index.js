
const state = {
  tabs: [{ name: 'place', type: 'place' }, { name: 'person', type: 'person' }, { name: 'organisation', type: 'organisation' }],
  schemas: {},
  entries: {},
  p: ['entries', 'schemas', 'tabs', ],
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
    s.tabs.filter(t => t.name !== name);
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
    this._vm.$info(name, entry);
    if (name && entry) {
      s.entries[name] = entry;
    }
    // s.entries = JSON.parse(JSON.stringify(s.entries));
  },
  /*
  converts a guven query (data from n3-store) to a usable model for a formFromSchema
  and sets it to entrys using the given name.
  assumes that the wanted schema, is already fetched. if it is not, nothing happens
  */
  queryToEntry(s, { name, query, type }) {
    this._vm.$info('queryToEntry: name, query, type', name, query, type);
    if(!s.schemas[type] || !name || !type) { return; }

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
    this._vm.$debug('what happened:', m, type);
    s.entries[name] = {};
    s.entries[name].model = m;
    s.entries[name].schema = type;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
