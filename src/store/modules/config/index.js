/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

import defaultConf from './defaultconfig.json';

const state = {
  apis: defaultConf,
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
    this._vm.$info('constructConfig ({ pState })');
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.config[s.p[i]];
    }
  },
  setApis(s, apisObj) {
    s.apis = apisObj;
  },
  resetToDefault(s) {
    s.apis = defaultConf;
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
