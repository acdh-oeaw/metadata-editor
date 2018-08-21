/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const state = {
  drawer: false,
  drawerclipped: false,
  fixed: false,
  config: {},
  miniVariant: false,
  rightDrawer: false,
  p: ['drawer',
      'drawerclipped',
      'fixed',
      'config',
      'miniVariant',
      'rightDrawer',
  ],
};

const getters = {

};

const mutations = {
  setConfig(s, config) {
    s.config = config;
  },
  toggleNavDrawerMini(s) {
    s.miniVariant = !s.miniVariant;
  },
  setNavDrawerMini(s) {
    if (!s.drawerclipped) s.miniVariant = true;
  },
  toggleNavDrawerClipped(s) {
    s.drawerclipped = !s.drawerclipped;
  },
  setNavDrawerMaxi(s) {
    s.miniVariant = false;
  },
  toggleRightDrawer(s) {
    s.rightDrawer = !s.rightDrawer;
  },
  openRightDrawer(s) {
    s.rightDrawer = true;
  },
  toggleDrawer(s) {
    s.drawer = !s.drawer;
  },
  constructApp(s, { pState }) {
    this._vm.$info('constructApp ({ pState })');
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.app[s.p[i]];
    }
  },
};

const actions = {
  toggleAppMode({ commit }) {
    commit('toggleDrawer');
    // commit('toggleRightDrawer');
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
