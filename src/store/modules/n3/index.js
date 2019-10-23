import actions from './actions';
import mutations from './mutations';
/* eslint-disable no-case-declarations */
/* eslint-disable no-underscore-dangle */


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
  ttlLength: 0,
  p: ['ttlString'],
  stored: true,
  update: 0,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
  getQuads: s => p => s.store.getQuads(p.subject, p.predicate, p.object, p.graph),
  getArcheTitle: (s, g) => (subject) => {
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
  getArcheTypeString: s => (subject) => {
    const type = s.store.getQuads(subject, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')[0].object;
    if (type) return type.id.split('#')[1].toLowerCase();
    return null;
  },
  getObjectsBySubjects: s => (subjects) => {
    // console.log('getObjectsBySubjects', subjects);
    const arr = [];
    for (let i = 0; i < subjects.length; i += 1) {
      const quads = s.store.getQuads(subjects[i]);
      const obj = {};
      for (let j = 0; j < quads.length; j += 1) {
        obj[quads[j].predicate.id.split('#')[1]] = quads[j].object.id.replace(/"/g, '');
      }
      obj.subject = subjects[i];
      const sub = s.store.getQuads(
        undefined,
        'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier',
        obj.isPartOf,
      );
      if (sub.length) {
        obj.collectionName = s.store.getQuads(obj.subject,
        'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle')[0].object.id.replace(/"/g, '');
      }
      arr.push(obj);
    }
    return arr;
  },
  getCount: s => ({ quads: s.store.size, subjects: s.store.getSubjects().length }),
  getQuadsByType: s => type => s.store.getQuads(undefined,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    `https://vocabs.acdh.oeaw.ac.at/schema#${type}`,
  ).concat(s.store.getQuads(undefined,
    'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
    `https://vocabs.acdh.oeaw.ac.at/schema#${type.toLowerCase()}`,
  )),
  getUpdate: s => s.update,
  getTtlString: s => s.ttlString,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
