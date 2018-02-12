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
  makeQuery({ commit, state }, { name, query }) {
    const sparql = jOWL.SPARQL_DL(query);
    commit('startProcessing', 'Executing Query...');
    return new Promise((resolve, reject) => {
      sparql.execute((results) => {
        commit('setQuery', name, results);
        commit('stopProcessing');
        resolve(results);
      }, (error) => {
        commit('stopProcessing');
        reject(error);
      });
    });
  },
  fetchPropertiesByURI({ commit, state }, { queryname, uri }) {
    const sparql = jOWL.SPARQL_DL(`PropertyValue(${uri}, ?p, ?x)`);
    console.log(sparql);
    commit('startProcessing', 'Executing Query...');
    return sparql.execute((results) => {
      commit('setQuery', queryname, results);
      commit('stopProcessing');
      console.log(results);
      return Promise.resolve(results);
    }, (error) => {
      commit('stopProcessing');
      return Promise.reject(error);
    });
  },
};

export default actions;
