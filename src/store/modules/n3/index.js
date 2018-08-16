import actions from './actions';
import mutations from './mutations';
/* eslint-disable no-case-declarations */

const N3 = require('n3');

const prefixes = {
  acdh: 'https://vocabs.acdh.oeaw.ac.at/schema#',
  acdhi: 'https://id.acdh.oeaw.ac.at/',
};


const state = {
  prefixes,
  module: N3,
  store: N3.Store(),
  parser: N3.Parser(),
  writer: N3.Writer(null, { prefixes }),
  processing: false,
  processingMessage: '',
  ttlString: '',
  p: ['ttlString'],
  stored: true,
  deletePrompt: true,
  update: 0,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
  getQuads: s => p => s.store.getQuads(p.subject, p.predicate, p.object, p.graph),
  getTitle: (s, g) => (subject) => {
    const type = g.getType(subject);
    switch (type.id) {
      case 'https://vocabs.acdh.oeaw.ac.at/schema#person':
      case 'https://vocabs.acdh.oeaw.ac.at/schema#Person':
        let fn = s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasFirstName', null, null);
        if (fn[0] && fn[0].object && fn[0].object.id) {
          fn = fn[0].object.id;
        }

        let ln = s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasLastName');
        if (ln[0] && ln[0].object && ln[0].object.id) ln = ln[0].object.id;
        const r = { id: `${fn} ${ln}` };
        return r;
      default:
        const d = s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle');
        if (d[0] && d[0].object && d[0].object.id) {
          return { id: d[0].object.id };
        }
        return { id: 'no id found' };
    }
  },
  getType: s => subject => s.store.getQuads(subject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')[0].object,
  getCount: s => { return { quads: s.store.size, subjects: s.store.getSubjects().length } },
  getUpdate: s => s.update,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
