import actions from './actions';
import mutations from './mutations';

const N3 = require('./n3-browser.js');

const state = {
  module: N3.N3,
  store: N3.N3.Store(),
  parser: N3.N3.Parser(),
  writer: N3.N3.Writer(null, {}),
  tripleCount: 0,
  subjects: {},
  processing: false,
  processingMessage: '',
  ttlString: '',
  p: ['ttlString'],
};

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint no-console: ["error", { allow: ["log"] }] */

const getters = {
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
