/* eslint no-console: ['error', { allow: ['log'] }] */

const actions = {
  AddFilteredTriples(state, triple) {
    state.store.addTriple({
      subject: actions.RemovePrefix(triple.subject),
      predicate: actions.RemovePrefix(triple.predicate),
      object: actions.RemovePrefix(triple.object),
    });
  },
  StringToStore({ state, commit }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        actions.AddFilteredTriples(state, triple);
      } else {
        commit('updateTripleCount');
        commit('updateSubjects');
        commit('stopProcessing');
        console.log(state.store.getTriples());
      }
    });
  },
  RemovePrefix(str) {
    if (str.search(/b\d/) > -1) {
      return str.replace(/b\d_/, '');
    }
    return str;
  },
};

export default actions;
