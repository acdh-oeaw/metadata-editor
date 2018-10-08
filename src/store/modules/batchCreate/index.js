/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */

/*

directories looks like this:
directories: {
  FulldirectoryName: {
    name: 'shortFileName',
    files: [
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
},

*/

const state = {
  directories: {},
  model: [],
  selected: [],
  p: [
    'directories',
    'model',
    'selected',
  ],
};

const getters = {
  getDirectories: s => s.directories,
  getModel: s => s.model,
  getSelected: s => s.selected,
};

const mutations = {
  constructBatchCreate(s, { pState }) {
    this._vm.$info('constructBatchCreate ({ pState })');
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.batchCreate[s.p[i]];
    }
  },
  setDirectories(s, directories) {
    s.directories = directories;
  },
  setModel(s, model) {
    s.model = model;
  },
  setSelected(s, selected) {
    s.selected = selected;
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
