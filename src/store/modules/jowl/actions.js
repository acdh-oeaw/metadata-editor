/* eslint no-console: ["error", { allow: ["log"] }] */
require('./jOWL.js');

const jOWL = window.jOWL;

const actions = {
  setOntology({ commit }, path) {
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
    const sparql = jOWL.SPARQL_DL(query);
    commit('startProcessing', 'Executing Query...');
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
    const query = 'Class(?x)';
    return dispatch('makeQuery', { q, query });
  },
  fetchSubClassOf({ dispatch }, { q, c }) {
    const query = `SubClassOf(?sc, ${c})`;
    return dispatch('makeQuery', { q, query });
  },
  fetchPropertiesByURI({ dispatch }, { q, uri }) {
    const query = `PropertyValue(${uri}, ?p, ?x)`;
    return dispatch('makeQuery', { q, query });
  },
};

export default actions;
