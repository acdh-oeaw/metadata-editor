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
  getTriples: s => p => s.store.getQuads(p.subject, p.predicate, p.object, p.graph),
  getCount: s => s.store.size,
  getSubjectCount: s => s.store.getSubjects().length,
  getType: s => subject => s.store.getQuads(subject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')[0].object,
  getUpdate: s => s.update,
  getTitle: (s, g) => (subject) => {
    const type = g.getType(subject);
    switch (type.id) {
      case 'https://vocabs.acdh.oeaw.ac.at/schema#person':
      case 'https://vocabs.acdh.oeaw.ac.at/schema#Person':
        const fn = s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasFirstName')[0].object.id;
        const ln = s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasLastName')[0].object.id;
        const r = { id: `${fn} ${ln}` };
        return r;
      default: return s.store.getQuads(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle')[0].object;
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
