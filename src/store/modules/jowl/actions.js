/* eslint-disable no-underscore-dangle */
/* eslint no-console: ["error", { allow: ["log"] }] */
require('./jOWL.js');

const jOWL = window.jOWL;

const actions = {
  setOntology({ commit }, path) {
    this._vm.$info('jowl', 'setOntology', path);
    commit('startProcessing', 'Loading Ontology...');
    return new Promise((resolve, reject) => {
      jOWL.load(path, () => {
        commit('setOntologyPath', path);
        commit('setOntology', jOWL);
        commit('stopProcessing');
        resolve(jOWL);
      }, (error) => {
        commit('stopProcessing');
        reject(error);
      });
    });
  },
  makeQuery({ commit }, { q, query }) {
    this._vm.$info('jowl', 'makeQuery', q, query);
    const sparql = jOWL.SPARQL_DL(query);
    commit('startProcessing', `Executing Query ${query}`);
    return new Promise((resolve, reject) => {
      sparql.execute({ onComplete: (res) => {
        commit('stopProcessing');
        if (res.results) {
          commit('setQuery', { name: q, result: res.results });
          resolve(res.results);
        } else if (res.error) {
          reject(res.error);
        }
      } });
    });
  },
  fetchClasses({ dispatch }, { q }) {
    this._vm.$info('jowl', 'fetchClasses', q);
    const query = 'Class(?x)';
    return dispatch('makeQuery', { q, query });
  },
  fetchSubClassOf({ dispatch }, { q, c }) {
    this._vm.$info('jowl', 'fetchSubClassOf', q, c);
    const query = `SubClassOf(?sc, ${c})`;
    return dispatch('makeQuery', { q, query });
  },
  fetchPropertiesByURI({ dispatch }, { q, uri }) {
    this._vm.$info('jowl', 'fetchPropertiesByURI', q, uri);
    const query = `PropertyValue(${uri}, ?p, ?x)`;
    return dispatch('makeQuery', { q, query });
  },
};

export default actions;
