/* eslint no-console: ["error", { allow: ["log"] }] */
require('./jOWL.js');

const jOWL = window.jOWL;

const actions = {
  setOntology({ state, commit }, path) {
    commit('jowl/startProcessing', 'Loading Ontology...');
    return new Promise((resolve, reject) => {
      jOWL.load(path, () => {
        commit('jowl/setOntologyPath', path);
        commit('jowl/setOntology', jOWL);
        commit('jowl/stopProcessing');
        resolve(jOWL);
      }, (error) => {
        commit('jowl/stopProcessing');
        reject(error);
      });
    });
  },
  makeQuery({ commit, state }, { q, query }) {
    const sparql = jOWL.SPARQL_DL(query);
    commit('jowl/startProcessing', 'Executing Query...');
    return new Promise((resolve, reject) => {
      sparql.execute({ onComplete: (res) => {
        commit('jowl/stopProcessing');
        if (res.results) {
          commit('jowl/setQuery', q, res.results);
          resolve(res.results);
        } else if (res.error) {
          reject(res.error);
        }
      } });
    });
  },
  fetchClasses({ commit, state }, { q }) {
    const query = 'Class(?x)';
    return this.dispatch('jowl/makeQuery', { q, query });
  },
  fetchSubClassOf({ commit, state }, { q, c }) {
    const query = `SubClassOf(?sc, ${c})`;
    return this.dispatch('jowl/makeQuery', { q, query });
  },
  fetchPropertiesByURI({ commit, state }, { q, uri }) {
    const query = `PropertyValue(${uri}, ?p, ?x)`;
    return this.dispatch('jowl/makeQuery', { q, query });
  },
};

export default actions;
