/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */

const state = {
  clearcachedialog: { status: false },
  storedialog: { status: false },
  deletesubjectdialog: { status: false, uri: '' },
  addnewsubjectmodal: { status: false },
  filesizedialog: { status: false, result: '' },
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
  setDialog(s, {name, obj}) {
    s[name] = obj;
  }
};


export default {
  namespaced: true,
  state,
  mutations,
};
