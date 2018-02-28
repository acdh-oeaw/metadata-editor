/* eslint no-console: ['error', { allow: ['log'] }] */


const actions = {
  setMetaData({ state, commit, dispatch }, shema) {
    if (shema) {
      commit('setMetaDataShema', shema);
    }
  },
};

export default actions;
