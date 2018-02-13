/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import actions from './actions';

const state = {
  queries: {},
  ontology: null,
  ontologyPath: '',
  processing: false,
  processingMessage: '',
};

const getters = {
  getQuery: s => name => s.queries[name],
};

const mutations = {
  setQuery(s, name, result) {
    s.queries[name] = result;
  },
  setOntologyPath(s, path) {
    s.ontologyPath = path;
  },
  setOntology(s, ontology) {
    s.ontology = ontology;
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
