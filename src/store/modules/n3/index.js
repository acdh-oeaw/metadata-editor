import actions from './actions';

const N3 = require('./n3-browser.js');

const state = {
  module: N3.N3,
  store: N3.N3.Store(),
  parser: N3.N3.Parser(),
  tripleCount: 0,
  subjects: {},
  processing: false,
  processingMessage: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
};

const mutations = {
  updateTripleCount(s) {
    s.tripleCount = s.store.countTriples(null, null, null, null);
  },
  updateSubjects(s) {
    s.store.forSubjects((res) => {
      s.subjects[res] = s.store.getObjects(res, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0];
    }, null, null, null);
    console.log(s.subjects);
  },
  startProcessing(s, message) {
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    s.processingMessage = '';
    s.processing = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
