/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

const mutations = {
  updateTripleCount(s) {
    s.tripleCount = s.store.countTriples(null, null, null, null);
  },
  /*
    fetch all subjects and corresponding objects for wich the predicate is
    http://www.w3.org/1999/02/22-rdf-syntax-ns#type and cache them
    should be commited every time a modification is made to the N3 store
  */
  updateSubject(s) {
    s.store.forSubjects((res) => {
      s.subjects[res] = s.store.getObjects(res, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0];
    }, null, null, null);
  },
  startProcessing(s, message) {
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    this._vm.$debug('stopProcessing called');
    s.processingMessage = '';
    s.processing = false;
  },
  updateTtlString(s, ttlString) {
    s.ttlString = ttlString;
  },
  resetWriter(s) {
    s.writer = s.module.Writer(null, { prefixes: { acdh: 'https://vocabs.acdh.oeaw.ac.at/schema#' } });
  },
  updateStorageStatus(s, bool) {
    s.stored = bool;
  },
  toggleDeletePrompt(s, bool) {
    s.deletePrompt = bool;
  },
};

export default mutations;
