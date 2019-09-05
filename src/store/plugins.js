/* eslint-disable arrow-parens */
/* eslint-disable default-case */
/* eslint-disable no-underscore-dangle */
import VuexPersistence from 'vuex-persist';

import {
  STORAGE_KEY,
} from './index';

const triggerMutations = [
  'n3/stopProcessing',
  'JSONschema/setEntry',
  'JSONschema/setSchema',
  'JSONschema/addTab',
  'JSONschema/removeTab',
  'config/setApis',
  'batchCreate/setDirectories',
  'batchCreate/setModel',
  'dialogs/openDialog',
  'dialogs/setDialog',
  'dialogs/toggleDeletePrompt',
  'dialogs/toggleNetworkPrompt',
  'app/openRightDrawer',
  'app/toggleRightDrawer',
];

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: STORAGE_KEY || 'MetaDataEditor',
  filter: (mutation) => triggerMutations.includes(mutation.type),
  reducer: (state) => ({
    n3: {
      ttlString: state.n3.ttlString,
      store: state.n3.store,
    },
    JSONschema: {
      entries: state.JSONschema.entries,
      schemas: state.JSONschema.schemas,
      unsaved: state.JSONschema.unsaved,
    },
    app: {
      drawer: state.app.drawer,
      drawerclipped: state.app.drawerclipped,
      fixed: state.app.fixed,
      config: state.app.config,
      miniVariant: state.app.miniVariant,
      rightDrawer: state.app.rightDrawer,
    },
    localStorageInfo: {
      localStorageLimit: state.localStorageInfo.localStorageLimit,
      currentStoreLength: state.localStorageInfo.currentStoreLength,
      lastEdit: state.localStorageInfo.lastEdit,
    },
    dialogs: {
      deletePrompt: state.dialogs.deletePrompt,
      networkPrompt: state.dialogs.networkPrompt,
    },
    config: {
      apis: state.config.apis,
      getLocalStorageKey: state.config.getLocalStorageKey,
    },
    batchCreate: {
      directories: state.batchCreate.directories,
      model: state.batchCreate.model,
      selected: state.batchCreate.selected,
    },
  }),
});

export default [
  vuexLocal.plugin,
];
