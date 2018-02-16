/* eslint no-console: ["error", { allow: ["log"] }] */

const actions = {
  StringToStore({ state, commit }, string) {
    let c = 0;
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple, prefixes) => {
      if (triple) {
        state.store.addTriple(triple.subject, triple.predicate, triple.object);
        c += 1;
      } else {
        console.log(`Parsed ${c} triples to store.`, prefixes);
      }
    });
  },
};

export default actions;
