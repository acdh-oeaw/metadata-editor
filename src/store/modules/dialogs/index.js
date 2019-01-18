/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-underscore-dangle */
const state = {
  clearcachedialog: { status: false },
  storedialog: { status: false },
  networkerrordialog: { status: false, endpoints: [] },
  deletesubjectdialog: { status: false, uri: '' },
  editsubjectdialog: { status: false, query: {}, type: '' },
  addnewsubjectdialog: { status: false, addedItem: {} },
  filesizedialog: { status: false, file: '', size: '', result: '' },
  deletePrompt: true,
  networkPrompt: true,
};

const getters = {

};

const mutations = {
  openDialog(s, name) {
    s[name].status = true;
  },
  closeDialog(s, name) {
    s[name].status = false;
  },
  switchDialog(s, name) {
    s[name].status = !s[name];
  },
  setDialog(s, { name, obj }) {
    this._vm.$info('store dialogs setDialog', name, obj);
    s[name] = obj;
  },
  toggleDeletePrompt(s, bool) {
    s.deletePrompt = bool;
  },
  toggleNetworkPrompt(s, bool) {
    s.networkPrompt = bool;
  },
};


export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
