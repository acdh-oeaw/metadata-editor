import actions from './actions';

const N3 = require('./n3-browser.js');

const state = {
  module: N3.N3,
  store: N3.N3.Store(),
  parser: N3.N3.Parser(),
  processing: false,
  processingMessage: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */

const getters = {
  tripleCount: s => ({ subject, predicate, object, graph }) =>
    s.store.countTriples(subject, predicate, object, graph),
};

const mutations = {
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
