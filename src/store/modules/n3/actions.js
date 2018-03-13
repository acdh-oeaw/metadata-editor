/* eslint no-console: ['error', { allow: ['log'] }] */


// some helper functions iso mixin
function RemovePrefix(str) {
  if (str.search(/b\d/) > -1) {
    return str.replace(/b\d_/, '');
  }
  return str;
}

const actions = {
  AddTriple({ state, commit }, triple) {
    state.store.addTriple(
      triple.subject,
      triple.predicate,
      triple.object,
    );
    commit('updateTripleCount');
    commit('updateSubject');
  },
  /* special action to remove the prefixes n3.js automatically adds when parsing
     blank namespaces before adding the triple, never called directly
     see http://rubenverborgh.github.io/N3.js/docs/N3Store.html#section-124 */
  AddFilteredTriple({ state }, triple) {
    state.store.addTriple(
      RemovePrefix(triple.subject),
      triple.predicate,
      RemovePrefix(triple.object),
    );
  },
  /* high lvl action parsing a TTL file into triples and subsequently
     saving it to the N3.js store   */
  StringToStore({ state, commit, dispatch }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        dispatch('AddFilteredTriple', triple);
        console.log(triple);
      } else {
        commit('updateTripleCount');
        commit('updateSubject');
        commit('stopProcessing');
        console.log(state.store.getTriples());
      }
    });
  },
  /*  high level action parsing an JS-Object into triples and subsequently
     saving it to the N3.js store */
  objectToStore({ state, commit, dispatch }, { schema, obj }) {
    commit('startProcessing', 'Parsing Object to Store...');
    // first triple for type
    // console.log(schema);
    const first = {
      subject: `_:b${state.counter}_manual`,
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: schema.id,
    };
    dispatch('AddTriple', first);
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        const triple = {
          subject: `_:b${state.counter}_manual`,
          predicate: keys[k],
          object: values[k],
        };
        dispatch('AddTriple', triple);
        // console.log(triple);
      }
    }
    commit('increaseCounter');
    commit('stopProcessing');
    commit('updateTripleCount');
    commit('updateSubject');
    commit('stopProcessing');
  },

};

export default actions;
