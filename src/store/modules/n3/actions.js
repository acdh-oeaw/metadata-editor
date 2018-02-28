/* eslint no-console: ['error', { allow: ['log'] }] */


// some helper functions iso mixin
function RemovePrefix(str) {
  if (str.search(/b\d/) > -1) {
    return str.replace(/b\d_/, '');
  }
  return str;
}

const actions = {
  AddTriple({ state, dispatch }, triple) {
    state.store.addTriple(
      triple.subject,
      triple.predicate,
      triple.object,
    );
  },
  /* special action to remove the prefixes n3.js automatically adds when parsing
     blank namespaces before adding the triple
     see http://rubenverborgh.github.io/N3.js/docs/N3Store.html#section-124 */
  AddFilteredTriple({ state }, triple) {
    state.store.addTriple(
      RemovePrefix(triple.subject),
      triple.predicate,
      RemovePrefix(triple.object),
    );
  },
  StringToStore({ state, commit, dispatch }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        // console.log('a', triple);
        dispatch('AddFilteredTriple', triple);
        // actions.AddFilteredTriples(triple);
      } else {
        commit('updateTripleCount');
        commit('updateSubject');
        commit('stopProcessing');
        console.log(state.store.getTriples());
      }
    });
  },
  setMetaData({ state, commit, dispatch }, shema) {
    if (shema) {
      commit('setMetaDataShema', shema);
    }
  },
};

export default actions;
