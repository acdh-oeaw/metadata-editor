
const state = {
  tabs: [{ name: 'person', type: 'person' }, { name: 'place', type: 'place' }, { name: 'organisation', type: 'organisation' }, { name: 'collection', type: 'collection' }, { name: 'project', type: 'project' }],
  schemas: {},
  entries: {}, /* = { model: {..actual entries go here..},
    schema: 'schematype* corresponding to a key in schemas goes here' */
  unsaved: {},
  unsaveChanges: false, /* this is used like a switch to tedect,
  if unsaved was  changed, since sadly watchers on objects fail. */
  useDefaultTitleImage: false,
  p: ['entries', 'schemas', 'unsaved'],
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable no-underscore-dangle */

const getters = {
  getQuery: s => name => s.schemas[name],
  getUnsavedChanges: s => s.unsaveChanges,
  getUnsaved: s => s.unsaved,
  getSchema: s => schema => s.schemas[schema],

};

const actions = {
  getUnsaved() {
    return state.unsaved;
  },
  getSchema(schema) {
    return state.schemas[schema];
  },
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
    this._vm.$info('setEntry: name, entry', name, entry);
    if (name && entry && schema) s.entries[name] = { model: entry, schema };
  },
  saveEdit(s, { subject, model, schema }) {
    this._vm.$info('saveEdit(name, entry, schema)', name, schema);
    if (subject && model && schema) {
      s.unsaved[subject] = { model, schema };
      s.unsaveChanges = !s.unsaveChanges;
    }
  },
  toggleTitleImage(s) {
    s.useDefaultTitleImage = !s.useDefaultTitleImage;
  },
  deleteEdit(s, { subject }) {
    this._vm.$info('deleteEdit(subject)', subject);
    delete s.unsaved[subject];
    s.unsaveChanges = !s.unsaveChanges;
  },
  deleteAllEdits(s) {
    s.unsaved = {};
    s.unsaveChanges = !s.unsaveChanges;
  },
  saveAllEdits() {

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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
