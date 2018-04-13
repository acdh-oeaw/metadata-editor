/* eslint-disable arrow-parens */
import {
  STORAGE_KEY,
  SESSION_ID,
} from './index';

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    const currentStore = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    currentStore[SESSION_ID] = { state,
      date: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStore));
  });
};

export default [localStoragePlugin];
