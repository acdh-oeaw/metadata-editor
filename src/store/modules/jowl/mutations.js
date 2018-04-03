/* eslint-disable no-underscore-dangle */
/* eslint no-param-reassign: ["error", { "props": false }] */

const mutations = {
  setQuery(s, { name, result }) {
    this._vm.$info('jowl', 'setQuery', name, result);
    s.queries[name] = result;
    this._vm.$log(s.queries);
  },
  setOntologyPath(s, path) {
    this._vm.$info('jowl', 'setOntologyPath', s, path);
    s.ontologyPath = path;
  },
  setOntology(s, ontology) {
    this._vm.$info('jowl', 'setOntology', s, ontology);
    s.ontology = ontology;
  },
  startProcessing(s, message) {
    this._vm.$info('jowl', 'startProcessing', s, message);
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    this._vm.$info('jowl', 'stopProcessing', s);
    s.processingMessage = '';
    s.processing = false;
  },
};

export default mutations;
