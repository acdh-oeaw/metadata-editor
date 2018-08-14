/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable comma-spacing */
/* eslint-disable no-underscore-dangle */

// const d = new Date();

// some helper functions iso mixin
function RemovePrefix(str) {
  if (str.id && str.id.search(/b\d/) > -1) {
    const retStr = str;
    retStr.id = str.id.replace(/b\d_/, '');
    return retStr;
  } else if (str.id) return str;
  else if (str.search(/b\d/) > -1) {
    return str.replace(/b\d_/, '');
  }
  return str;
}

const urlpattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
const newobjpattern = /_:.*/;


const actions = {
  /* Adds triple to Store
     for internal use only, does not update exposed props! */
  AddTriple({ state, commit }, quad) {
    state.store.addQuad(
      quad.subject,
      quad.predicate,
      quad.object,
      quad.graph,
    );
  },
  /* Removes Secific Triple from Store
     for internal use only, does not update exposed props! */
  RemoveTriple({ state }, quad) {
    state.store.removeQuad(
      quad.subject,
      quad.predicate,
      quad.object,
      quad.graph,
    );
  },
  /* special action to remove the prefixes n3.js automatically adds
     when parsing blank namespaces
     see http://rubenverborgh.github.io/N3.js/docs/N3Store.html#section-124
     for internal use only, does not update exposed props! */
  AddFilteredTriple({ state }, quad) {
    state.store.addQuad(
      RemovePrefix(quad.subject),
      quad.predicate,
      RemovePrefix(quad.object),
      quad.graph,
    );
  },
  /* high lvl action parsing a string into triples and subsequently
     saving it to the N3.js store   */
  StringToStore({ state, commit, dispatch }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, triple) => {
      if (triple) {
        dispatch('AddFilteredTriple', triple);
      } else {
        dispatch('writeTTL');
        commit('updateSubject');
        commit('updateTripleCount');
        commit('stopProcessing');
        commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
        this._vm.$info('Added String to Store');
      }
    });
  },
  /* high lvl action removing all triples with a given subject from the store
     saving it to the N3.js store   */
  RemoveSubject({ state, dispatch, commit }, subject) {
    commit('startProcessing', 'Removing set of Triples...');
    const triples = state.store.getQuads(
      subject,
      null,
      null,
      null,
    );
    this._vm.$log(`${triples.length} triples found!`, triples);
    for (let i = 0; i < triples.length; i += 1) {
      dispatch('RemoveTriple', triples[i]);
    }
    dispatch('writeTTL');
    commit('updateSubject');
    commit('updateTripleCount');
    commit('stopProcessing');
    commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
    this._vm.$info(`Removed ${triples.length} triples from Store`);
  },
  /*  high level action parsing JSON from a form into triples and subsequently
     saving it to the N3.js store */
  objectToStore({ state, commit, dispatch }, { schema, obj, id }) {
    const subject = id || `_:${schema.title}_${Date.now().valueOf().toString(36)}`;
    commit('startProcessing', 'Loading Object to Store...');
    // first triple for type
    const first = {
      subject,
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: schema.id,
    };
    dispatch('AddFilteredTriple', first);
    // parsing triples with props from form
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        // if cardinality > 1
        if (Array.isArray(values[k])) {
          for (let i = 0; i < values[k].length; i += 1) {
            const triple = {
              subject,
              predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
            };
            if (urlpattern.test(values[k][i]) || newobjpattern.test(values[k][i])) {
              triple.object = values[k][i];
            } else triple.object = `"${values[k][i]}"`;
            dispatch('AddFilteredTriple', triple);
          }
        } else {
          // if cardinality = 1
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
    }
    dispatch('writeTTL');
    commit('updateTripleCount');
    commit('updateSubject');
    commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
    commit('stopProcessing');
  },
  writeTTL({ state, commit }) {
    const triples = state.store.getQuads();
    state.writer.addQuads(triples);
    state.writer.end((error, result) => {
      commit('updateTtlString', result);
      commit('resetWriter');
    });
  },
  constructN3({ state, commit, dispatch }, { pState }) {
    this._vm.$info('constructN3({ pState })', JSON.stringify(pState));
    const ttlString = pState.n3.ttlString;
    dispatch('StringToStore', ttlString);
  },
};

export default actions;
