/* eslint no-console: ["error", { allow: ["log"] }] */
require('../../../assets/jOWL_1.0/scripts/jOWL.js');

const jOWL = window.jOWL;

const actions = {
  setOntology({ state, commit }, path) {
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
  makeQuery({ commit, state }, { q, query }) {
    const sparql = jOWL.SPARQL_DL(query);
    commit('startProcessing', 'Executing Query...');
    return new Promise((resolve, reject) => {
      sparql.execute({ onComplete: (res) => {
        commit('stopProcessing');
        if (res.results) {
          console.log(res);
          commit('setQuery', q, res.results);
          resolve(res.results);
        } else if (res.error) {
          reject(res.error);
        }
      } });
    });
  },
  fetchClasses({ commit, state }, { q }) {
    const query = 'Class(?x)';
    return this.dispatch('makeQuery', { q, query });
  },
  fetchSubClassOf({ commit, state }, { q, c }) {
    const query = `SubClassOf(?sc, ${c})`;
    return this.dispatch('makeQuery', { q, query });
  },
  fetchPropertiesByURI({ commit, state }, { q, uri }) {
    const query = `PropertyValue(${uri}, ?p, ?x)`;
    return this.dispatch('makeQuery', { q, query });
  },
};

export default actions;
