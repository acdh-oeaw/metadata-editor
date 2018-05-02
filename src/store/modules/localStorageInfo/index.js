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
  currentStoreLength: null,
  testKey: 'testStorageCapacity',
  p: ['localStorageLimit', 'currentStoreLength'],
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
  getCurrentStoreLength(s) {
    this._vm.$info('getCurrentStoreLength called', s);
    let localStorage = null;
    try {
      localStorage = window.localStorage;
    } catch (e) {
      this._vm.$debug('getCurrentStoreLength failed due to access to local Storage');
    }

    if (localStorage) {
      s.currentStoreLength = JSON.stringify(localStorage.getItem(STORAGE_KEY)).length;
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
      let aHundredThausandChars = PI;
      let toBeSaved = '';
      this._vm.$debug('state.store.testKey', state.testKey);
      let tries = 2;
      while (true) {
        try {
          toBeSaved += aHundredThausandChars;
          localStorage.setItem(state.testKey, toBeSaved);
        } catch (e) {
          if (tries > 0) {
            tries -= 1;
            toBeSaved = toBeSaved.substring(0, toBeSaved.length - aHundredThausandChars.length);
            aHundredThausandChars = aHundredThausandChars
              .substring(0, aHundredThausandChars.length / 10);
          } else {
            // cleanup
            try {
              localStorage.removeItem(state.testKey);
            } catch (e) {
              this._vm.$debug('cleaning up and deleting the TestKey did not work', e);
            }
            // setLimit
            this._vm.$debug('setLimit because writing did not work', e, cSL, toBeSaved.length);
            commit('setLocalStorageLimit', cSL + toBeSaved.length);
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
