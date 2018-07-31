import actions from './actions';
import mutations from './mutations';

const N3 = require('./n3-browser.js');

const prefixes = {
  acdh: 'https://vocabs.acdh.oeaw.ac.at/schema#',
  acdhi: 'https://id.acdh.oeaw.ac.at/',
};


const state = {
  module: N3.N3,
  store: N3.N3.Store(),
  parser: N3.N3.Parser(),
  prefixes,
  writer: N3.N3.Writer(null, { prefixes }),
  tripleCount: 0,
  subjects: {},
  processing: false,
  processingMessage: '',
  ttlString: '',
  p: ['ttlString'],
  stored: true,
  deletePrompt: true,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
  getTriples: s => p => s.store.getTriples(p.subject, p.predicate, p.object),
  getTitle: (s, g) => (subject) => {
    const type = g.getType(subject);
    switch (type) {
      case 'https://vocabs.acdh.oeaw.ac.at/schema#person':
      case 'https://vocabs.acdh.oeaw.ac.at/schema#Person':
        const fn = s.store.getTriples(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasFirstName')[0].object;
        const ln = s.store.getTriples(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasLastName')[0].object;
        return `${fn} ${ln}`;
      default: return s.store.getTriples(subject, 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle')[0].object;
    }
  },
  getType: s => subject => s.store.getTriples(subject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')[0].object,
  getCount: s => s.tripleCount,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
