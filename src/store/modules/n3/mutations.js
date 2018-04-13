/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

const mutations = {
  updateTripleCount(s) {
    this._vm.$info('n3', 'updateTripleCount', s);
    s.tripleCount = s.store.countTriples(null, null, null, null);
  },
  /*
    fetch all subjects and corresponding objects for wich the predicate is
    http://www.w3.org/1999/02/22-rdf-syntax-ns#type and cache them
    should be commited every time a modification is made to the N3 store
  */
  updateSubject(s) {
    this._vm.$info('n3', 'updateSubject', s);
    s.store.forSubjects((res) => {
      s.subjects[res] = s.store.getObjects(res, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', null)[0];
    }, null, null, null);
  },
  startProcessing(s, message) {
    this._vm.$info('n3', 'startProcessing', message);
    s.processing = true;
    s.processingMessage = message || 'Processing...';
  },
  stopProcessing(s) {
    this._vm.$info('n3', 'stopProcessing', s);
    s.processingMessage = '';
    s.processing = false;
  },
};

export default mutations;
