/* eslint no-console: ["error", { allow: ["log"] }] */

const mutations = {
  setQuery(s, { name, result }) {
    s.queries[name] = result;
    console.log(s.queries);
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

export default mutations;
