/* eslint no-console: ['error', { allow: ['log'] }] */


const actions = {
  setMetaData({ state, commit, dispatch }, schema) {
    if (schema) {
      commit('setMetaDataSchema', schema);
    }
  },
  updateEntry({ state, commit, dispatch }, entry) {
    if (entry) {
      commit('setEntry', entry);
    }
  },
};

export default actions;
