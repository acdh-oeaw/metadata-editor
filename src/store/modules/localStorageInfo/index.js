/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable comma-spacing */
/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-constant-condition */

import PI from './pi';

const STORAGE_KEY = 'MetaDataEditor';

const state = {
  localStorageLimit: null,
  tested: false,
  status: true,
  currentStoreLength: null,
  testKey: 'testStorageCapacity',
  p: ['localStorageLimit', 'tested', 'currentStoreLength'],
};

const mutations = {
  setLocalStorageLimit(s, value) {
    s.localStorageLimit = value;
  },
  constructLocalStorageInfo(s, { pState }) {
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.localStorageInfo[s.p[i]];
    }
  },
  setTested(s, value) {
    s.tested = value;
  },
  getCurrentStoreLength(s) {
    this._vm.$info('getCurrentStoreLength called', s);
    let localStorage = null;
    try {
      localStorage = window.localStorage;
    } catch (e) {
      this.status = false;
    }

    if (localStorage) {
      s.currentStoreLength = JSON.stringify(localStorage.getItem(STORAGE_KEY)).length;
      this.status = true;
    }
  },

};


const actions = {
  safeLimitTest({ state, dispatch }) {
    this._vm.$info('localStorageInfo', 'safeLimitTest');
    if (!state.localStorageLimit || state.localStorageLimit == null) {
      dispatch('testLimit');
    }
  },
  testLimit({ state, commit }) {
    this._vm.$info('localStorageInfo', 'testLimit');
    let localStorage = false;
    commit('getCurrentStoreLength');
    const cSL = state.currentStoreLength;
    try {
      localStorage = window.localStorage;
    } catch (e) {
      this._vm.$debug('localStorage does not exists');
    }
    if (localStorage) {
      this._vm.$debug('localStorage exists');
      let tenThausandChars = PI;
      let toBeSaved = '';
      this._vm.$debug('state.store.testKey', state.testKey);
      let oneMoreTry = true;
      while (true) {
        try {
          toBeSaved += tenThausandChars;
          localStorage.setItem(state.testKey, toBeSaved);
        } catch (e) {
          if (oneMoreTry) {
            oneMoreTry = false;
            tenThausandChars = PI.substring(0, 10000);
          } else {
            this._vm.$debug('setLimit because writing did not work', e, cSL, toBeSaved);
            commit('setLocalStorageLimit', cSL + toBeSaved.length);
            commit('setTested', true);
            // cleanup
            try {
              localStorage.removeItem(state.testKey);
            } catch (e) {
              this._vm.$debug('cleaning up and deleting the TestKey did not work', e);
            }

            return cSL + toBeSaved.length;
          }
        }
      }
    }
    return false;
  },
};


export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
