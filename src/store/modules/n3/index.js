import actions from './actions';

const N3 = require('./n3-browser.js');

const state = {
  module: N3.N3,
  store: N3.N3.Store(),
  parser: N3.N3.Parser(),
  tripleCount: 0,
  processing: false,
  processingMessage: '',
};

/* eslint no-param-reassign: ["error", { "props": false }] */

const getters = {
};

const mutations = {
  updateTripleCount(s) {
    s.tripleCount = s.store.countTriples(null, null, null, null);
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
