/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable comma-spacing */

// const d = new Date();

// some helper functions iso mixin
function RemovePrefix(str) {
  if (str.search(/b\d/) > -1) {
    return str.replace(/b\d_/, '');
  }
  return str;
}

const urlpattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
const newobjpattern = /_:.*/;


const actions = {
  AddTriple({ state }, triple) {
    state.store.addTriple(
      triple.subject,
      triple.predicate,
      triple.object,
    );
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
    this._vm.$log(first);
    dispatch('AddFilteredTriple', first);
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        const triple = {
          subject,
          predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
        };
        if (urlpattern.test(values[k]) || newobjpattern.test(values[k])) {
          triple.object = values[k];
        } else triple.object = `"${values[k]}"`;
        dispatch('AddFilteredTriple', triple);
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
