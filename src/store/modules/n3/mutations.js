/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

const mutations = {
  /*
    fetch all subjects and corresponding objects for wich the predicate is
    http://www.w3.org/1999/02/22-rdf-syntax-ns#type and cache them
    should be commited every time a modification is made to the N3 store
  */
  startProcessing(s, message) {
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    s.processingMessage = '';
    s.processing = false;
    s.update = Date.now();
  },
  forceUpdate(s) {
    s.update = Date.now();
  },
  updateTtlString(s, ttlString) {
    s.ttlString = ttlString;
    s.ttlLength = s.ttlString.length;
  },
  resetWriter(s) {
    s.writer = s.module.Writer(null, { prefixes: s.prefixes });
  },
  updateStorageStatus(s, bool) {
    s.stored = bool;
  },
};

export default mutations;
