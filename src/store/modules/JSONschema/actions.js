/* eslint no-console: ['error', { allow: ['log'] }] */


const actions = {
  // actions only make sense if we need to bundle commits with async props
  // -> this should be a commit
  updateEntry({ state, commit, dispatch }, entry) {
    if (entry) {
      commit('setEntry', entry);
    }
  },
};

export default actions;
