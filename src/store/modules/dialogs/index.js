/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */
const state = {
  clearcachedialog: { status: false },
  storedialog: { status: false },
  networkerrordialog: { status: false },
  deletesubjectdialog: { status: false, uri: '' },
  editsubjectdialog: { status: false, query: {}, type: '' },
  addnewsubjectdialog: { status: false, addedItem: {} },
  filesizedialog: { status: false, file: '', size: '', result: '' },
  deletePrompt: true,
  networkPrompt: true,
  failedConnections: [],
  p: ['deletePrompt', 'networkPrompt'],
};

const getters = {

};

const mutations = {
  openDialog(s, name) {
    this._vm.$debug('store dialogs setDialog', name);
    s[name].status = true;
  },
  closeDialog(s, name) {
    s[name].status = false;
  },
  switchDialog(s, name) {
    s[name].status = !s[name];
  },
  setDialog(s, { name, obj }) {
    this._vm.$debug('store dialogs setDialog', name, obj);
    s[name] = obj;
  },
  toggleDeletePrompt(s, bool) {
    s.deletePrompt = bool;
  },
  toggleNetworkPrompt(s, bool) {
    s.networkPrompt = bool;
  },
  addToFailed(s, str) {
    if (!s.failedConnections.includes(str)) s.failedConnections.push(str);
  },
  removeFromFailed(s, str) {
    this._vm.$log('removeFromFailed str:', str);
    const i = s.failedConnections.indexOf(str);
    if (i < 0) return;
    s.failedConnections.splice(i, 1);
  },
  clearFailed(s) {
    // remove dublicates
    const failed = [];
    for (let f = 0; s.failedConnections.length; f += 1) {
      if (s.failedConnections.indexOf(s.failedConnections[f]) === f) {
        failed.push(s.failedConnections[f]);
      }
    }
    s.failedConnections = failed;
  },
  constructDialogs(s, { pState }) {
    this._vm.$info('constructDialogs(s, { pState })', JSON.stringify(s), JSON.stringify(pState));
    for (let i = 0; i < s.p.length; i += 1) {
      s[s.p[i]] = pState.dialogs[s.p[i]];
    }
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
