/* eslint-disable arrow-parens */
import {
  STORAGE_KEY,
} from './index';

const localStoragePlugin = store => {
  store.subscribe((mutation, state) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  });
};

export default [localStoragePlugin];
