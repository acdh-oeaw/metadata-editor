/* eslint-disable arrow-parens */
/* eslint-disable default-case */
import {
  STORAGE_KEY,
  SESSION_ID,
} from './index';


// helper for checking error code for full storage

function isQuotaExceeded(e) {
  let quotaExceeded = false;
  if (e) {
    if (e.code) {
      switch (e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if (e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}


// helper function for filtering for üroperties that need to be persistent.
const filterForPersistantProperties = function (stateObj) {
  const result = {};

  const modules = Object.keys(stateObj);
  // const values = Object.values(stateObj); // obj: {name: value }
  for (let k = 0; k < modules.length; k += 1) {
    result[modules[k]] = {};
    const m = stateObj[modules[k]];
    const p = m.p || [];
    for (let i = 0; i < p.length; i += 1) {
      result[modules[k]][p[i]] = m[p[i]];
    }
  }
  return result;
};

const localStoragePlugin = store => {
  let localStorage;
  try {
    localStorage = window.localStorage;
  } catch (e) {
    // Access denied :-(
  }

  if (localStorage) {
    store.subscribe((mutation, state) => {
      const pState = filterForPersistantProperties(state);
      const currentStore = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
      currentStore[SESSION_ID] = { pState,
        date: Date.now(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStore));
      } catch (e) {
        if (isQuotaExceeded(e)) {
          // Storage full, maybe notify user or do some clean-up

        }
      }
    });
  }
};

export default [localStoragePlugin];
