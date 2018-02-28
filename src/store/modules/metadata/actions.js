/* eslint no-console: ['error', { allow: ['log'] }] */


const actions = {
  setMetaData({ state, commit, dispatch }, schema) {
    if (schema) {
      commit('setmetaDataSchema', schema);
    }
  },
};

export default actions;
