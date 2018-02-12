/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

import actions from './actions';
import plugins from './plugins';

const state = {
  queries: {},
  ontology: null,
  ontologyPath: '',
  processing: false,
  processingMessage: '',

};

const getters = {
  getOntology: s => s.ontology,
  getQueries: s => s.queries,
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
    s.processing = false;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  plugins,
};
