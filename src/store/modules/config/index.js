/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

const state = {
  apis: {
    ARCHE: {
      BASEURL: 'https://arche-curation.minerva.arz.oeaw.ac.at/browser/api/',
      ENDPOINTS: {
        PERSONS: 'persons/',
        BASE: '',
        ORGANISATIONS: 'organisations/',
        PLACES: 'places/',
        CONCEPTS: 'concepts/',
        PUBLICATIONS: 'publications/',
        METADATA: 'getMetadata/',
        AUTOCOMPLETE: 'getData/',
        ID: 'checkIdentifier/',
      },
      TIMEOUT: 15000,
      PARAMS: {
        _format: 'json',
      },
      HEADERS: {},
    },
    ARCHE2: {
      BASEURL: 'https://arche-curation.minerva.arz.oeaw.ac.at/browser/api/',
      ENDPOINTS: {
        PERSONS: 'persons/',
        BASE: '',
        ORGANISATIONS: 'organisations/',
        PLACES: 'places/',
        CONCEPTS: 'concepts/',
        PUBLICATIONS: 'publications/',
        METADATA: 'getMetadata/',
        AUTOCOMPLETE: 'getData/',
        ID: 'checkIdentifier/',
      },
      TIMEOUT: 15000,
      PARAMS: {
        _format: 'json',
      },
      HEADERS: {},
    },
    VIAF: {
      BASEURL: 'https://www.viaf.org/viaf/',
      ENDPOINTS: {
        BASE: '',
        SEARCH: 'search',
      },
      TIMEOUT: 5000,
      PARAMS: {
        httpAccept: 'application/json',
      },
      HEADERS: {},
    },
    VOCABS: {
      BASEURL: 'https://vocabs.acdh.oeaw.ac.at/rest/v1/',
      ENDPOINTS: {
        ARCHE_CATEGORY: 'arche_category/search/',
        ARCHE_LIFECYCLE_STATUS: 'arche_lifecycle_status/search/',
      },
      TIMEOUT: 5000,
      PARAMS: {
      },
      HEADERS: {},
    },
  },
  localStorageKey: 'MetaDataEditor',
  p: [
    'apis',
    'localStorageKey',
  ],
};

const getters = {
  getLocalStorageKey: s => s.localStorageKey,
  getApis: s => s.apis,
};

const mutations = {
  constructConfig(s, { pState }) {
    this._vm.$info('constructApp ({ pState })');
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.app[s.p[i]];
    }
  },
  setApis(s, apisObj) {
    s.apis = apisObj;
  },

};

const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
