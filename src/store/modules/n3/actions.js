/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable comma-spacing */
/* eslint-disable no-underscore-dangle */

// const d = new Date();

// some helper functions iso mixin
function RemovePrefix(str) {
  if (!str) return str;
  if (str.id && str.id.search(/b\d/) > -1) {
    const retStr = str;
    retStr.id = str.id.replace(/b\d_/, '');
    return retStr;
  }
  if (str.id) return str;
  if (str && str.search(/b\d/) > -1) {
    return str.replace(/b\d_/, '');
  }
  return str;
}

function capitalizeFirstClassLetter(str) {
  const split = str.split('#');
  return `${split[0]}#${split[1].charAt(0).toUpperCase()}${split[1].slice(1)}`;
}

const urlpattern = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
const newobjpattern = /_:.*/;


const actions = {
  /* Adds quad to Store
     for internal use only, does not update exposed props! */
  AddQuad({ state, commit }, quad) {
    state.store.addQuad(
      quad.subject,
      quad.predicate,
      quad.object,
      quad.graph,
    );
  },
  /* Removes Specific Quad from Store
     for internal use only, does not update exposed props! */
  RemoveQuad({ state }, quad) {
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
  AddFilteredQuad({ state }, quad) {
    state.store.addQuad(
      RemovePrefix(quad.subject),
      quad.predicate,
      RemovePrefix(quad.object),
      quad.graph,
    );
  },
  /* high lvl action parsing a string into quads and subsequently
     saving it to the N3.js store   */
  StringToStore({ state, commit, dispatch }, string) {
    commit('startProcessing', 'Loading File to Store...');
    state.parser.parse(string, (error, quad) => {
      if (quad) {
        dispatch('AddFilteredQuad', quad);
      } else if (error) {
        this._vm.log(error);
      } else {
        dispatch('WriteTTL');
        commit('stopProcessing');
        commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
        this._vm.$info('Added String to Store');
      }
    });
  },
  /* high lvl action removing all quads with a given subject from the store
     saving it to the N3.js store   */
  RemoveSubject({ state, dispatch, commit }, subject) {
    commit('startProcessing', 'Removing set of Quads...');
    const quads = state.store.getQuads(
      subject,
      null,
      null,
      null,
    );
    this._vm.$log(`${quads.length} quads found!`, quads);
    for (let i = 0; i < quads.length; i += 1) {
      dispatch('RemoveQuad', quads[i]);
    }
    dispatch('WriteTTL');
    commit('stopProcessing');
    commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
    this._vm.$info(`Removed ${quads.length} quads from Store`);
  },
  /* high lvl action converting an object to quads and subsequently
     saving it to the N3.js store */
  WriteSubject({ state, dispatch, commit }, subject, properties) {
    commit('startProcessing', 'Loading Object to Store...');
    const keys = Object.keys(properties);
    const values = Object.values(properties);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        // if cardinality > 1
        if (Array.isArray(values[k])) {
          for (let i = 0; i < values[k].length; i += 1) {
            const quad = {
              subject,
              predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
            };
            if (urlpattern.test(values[k][i]) || newobjpattern.test(values[k][i])) {
              quad.object = values[k][i];
            } else quad.object = `"${values[k][i]}"`;
            dispatch('AddFilteredQuad', quad);
          }
        } else {
          // if cardinality = 1
          const quad = {
            subject,
            predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
          };
          if (urlpattern.test(values[k]) || newobjpattern.test(values[k])) {
            quad.object = values[k];
          } else quad.object = `"${values[k]}"`;
          dispatch('AddFilteredQuad', quad);
        }
      }
    }
    dispatch('WriteTTL');
    commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
    commit('stopProcessing');
  },
  /*  high level action parsing JSON from a form into quads and subsequently
     saving it to the N3.js store */
  ObjectToStore({ state, commit, dispatch }, { schema, obj, id }) {
    const subject = id || `_:${schema.title.toLowerCase()}_${Date.now().valueOf().toString(36)}`;
    this._vm.$log('ObjectToStore (schema, obj, id)', schema, obj, id);
    commit('startProcessing', 'Loading Object to Store...');
    // first quad for type
    const first = {
      subject,
      predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type',
      object: capitalizeFirstClassLetter(schema.id),
    };
    dispatch('AddFilteredQuad', first);
    // create ID if not given
    if (!obj.hasIdentifier || !obj.hasIdentifier.length || obj.hasIdentifier.includes('')) {
      if (Array.isArray(obj.hasIdentifier) && obj.hasIdentifier.includes('')) obj.hasIdentifier.shift();
      // eslint-disable-next-line
      const slug = require('slugify');
      let genId;
      this._vm.$log('IDobj', obj);
      switch (schema.title.toLowerCase()) {
        case 'person':
          if (obj.hasFirstName[0] && obj.hasLastName[0]) genId = `${obj.hasFirstName[0].charAt(0).toLowerCase()}${obj.hasLastName[0]}`;
          break;
        case 'organisation':
          if (obj.hasAlternativeTitle[0]) genId = obj.hasAlternativeTitle[0].toLowerCase();
          else if (obj.HasTitle[0]) genId = slug(obj.HasTitle[0]);
          break;
        case 'place':
          genId = `place-${(obj.hasTitle[0] || '').toLowerCase()}`;
          break;
        case 'publication':
          genId = `pub-${obj.hasAuthor ? obj.hasAuthor[0].toLowerCase() : ''}${obj.hasAuthor ? obj.hasAuthor[1].toLowerCase() : ''}${obj.hasAvailableDate ? obj.hasAvailableDate[0].toLowerCase() : ''}`;
          break;
        default:
          if (obj.hasTitle) {
            if (Array.isArray(obj.hasTitle)) genId = slug(obj.hasTitle[0] || '');
            else genId = slug(obj.hasTitle || '');
          }
          break;
      }
      if (genId && genId !== 'pub-' && genId !== 'place-') {
        dispatch('AddFilteredQuad', {
          subject,
          predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier',
          object: `acdhi:${genId}`,
        });
      }
    }
    // parsing quads with props from form
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    for (let k = 0; k < keys.length; k += 1) {
      if (values[k]) {
        if (Array.isArray(values[k])) {
          values[k] = [].concat(...values[k]);
          // flattens the array in case it might contain more arrays
          for (let i = 0; i < values[k].length; i += 1) {
            const quad = {
              subject,
              predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
            };
            if (urlpattern.test(values[k][i]) || newobjpattern.test(values[k][i])) {
              quad.object = values[k][i];
            } else quad.object = `"${values[k][i]}"`;
            dispatch('AddFilteredQuad', quad);
          }
        } else {
          const splitted = values[k].split(';;');
          for (let i = 0; i < splitted.length; i += 1) {
            const quad = {
              subject,
              predicate: `https://vocabs.acdh.oeaw.ac.at/schema#${keys[k]}`,
            };
            if (urlpattern.test(splitted[i]) || newobjpattern.test(splitted[i])) {
              quad.object = splitted[i];
            } else quad.object = `"${splitted[i]}"`;
            dispatch('AddFilteredQuad', quad);
          }
        }
      }
    }
    dispatch('WriteTTL');
    commit('localStorageInfo/getCurrentStoreLength', null, { root: true });
    commit('stopProcessing');
    return subject;
  },
  WriteTTL({ state, commit }) {
    const quads = state.store.getQuads();
    state.writer.addQuads(quads);
    state.writer.end((error, result) => {
      commit('updateTtlString', result);
      commit('resetWriter');
    });
  },
  ConstructN3({ state, commit, dispatch }, { pState }) {
    this._vm.$info('ConstructN3({ pState })', JSON.stringify(pState));
    const ttlString = pState.n3.ttlString;
    dispatch('StringToStore', ttlString);
  },
};

export default actions;
