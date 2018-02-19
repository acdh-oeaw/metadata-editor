/* eslint no-console: ['error', { allow: ['log'] }] */

const actions = {
  AddFilteredTriples({ state, dispatch }, triple) {
    state.store.addTriple(
      dispatch('RemovePrefix', triple.subject),
      triple.predicate,
      dispatch('RemovePrefix', triple.object),
    );
    console.log(dispatch('RemovePrefix', triple.subject));
  },
  StringToStore({ state, commit, dispatch }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        // console.log('a', triple);
        dispatch('AddFilteredTriples', triple);
        // actions.AddFilteredTriples(triple);
      } else {
        commit('updateTripleCount');
        commit('updateSubjects');
        commit('stopProcessing');
        console.log(state.store.getTriples());
      }
    });
  },
  RemovePrefix({ state }, str) {
    console.log('a', str);
    if (str.search(/b\d/) > -1) {
      return str.replace(/b\d_/, '');
    }
    return str;
  },
};

export default actions;
