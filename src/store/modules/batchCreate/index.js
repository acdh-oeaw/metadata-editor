/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */


const state = {
  directories: [
    {
      name: '',
      file: [
        {
          filename: '',
          type: '',
          size: '',
          lastmod: '',
          extension: '',
          valid_file: true,
        },
      ],
    },
  ],
  p: [
    'directories',
  ],
};

const getters = {
  getDirectories: s => s.apis,
};

const mutations = {
  constructBatchCreate(s, { pState }) {
    this._vm.$info('constructBatchCreate ({ pState })');
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.batchCreate[s.p[i]];
    }
  },
  directories(s, directories) {
    s.directories = directories;
  },

};

const actions = {
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
