/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

const mutations = {
  startProcessing(s, message) {
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    s.processingMessage = '';
    s.processing = false;
    s.update = Date.now();
  },
  updateTtlString(s, ttlString) {
    s.ttlString = ttlString;
  },
  resetWriter(s) {
    s.writer = s.module.Writer(null, { prefixes: s.prefixes });
  },
  updateStorageStatus(s, bool) {
    s.stored = bool;
  },
  toggleDeletePrompt(s, bool) {
    s.deletePrompt = bool;
  },
};

export default mutations;
