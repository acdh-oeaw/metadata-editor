/* eslint-disable no-underscore-dangle */

// const d = new Date();

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
  StringToStore({ state, commit, dispatch, vue }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        dispatch('AddFilteredTriple', triple);
      } else {
        dispatch('writeTTL');
        commit('updateTripleCount');
        commit('updateSubject');
        commit('stopProcessing');
      }
    });
  },
  /*  high level action parsing an JS-Object into triples and subsequently
     saving it to the N3.js store */
  objectToStore({ state, commit, dispatch }, { schema, obj }) {
    const subject = `_:${schema.title}_${Date.now().valueOf().toString(36)}`;
    commit('startProcessing', 'Loading Object to Store...');
    // first triple for type
    const first = {
      subject,
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: schema.id,
    };
    dispatch('AddTriple', first);
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        const triple = {
          subject,
          predicate: keys[k],
          object: values[k],
        };
        dispatch('AddTriple', triple);
      }
    }
    dispatch('writeTTL');
    commit('updateTripleCount');
    commit('updateSubject');
    commit('stopProcessing');
  },
  writeTTL({ state, commit }) {
    const triples = state.store.getTriples();
    state.writer.addTriples(triples);
    state.writer.end((error, result) => {
      console.log('allbac');
      commit('updateTtlString', result);
      commit('resetWriter');
    });
  },
  constructN3({ state, commit, dispatch }, { pState }) {
    const ttlString = pState.n3.ttlString;
    dispatch('StringToStore', ttlString);
  },
};

export default actions;
