/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-param-reassign: ["error", { "props": false }] */
export const STORAGE_KEY = 'OWL-Data';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear();
}

export const state = {
  stateObj: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{"queries": {}}'),
};

/*
the state OBJ will look like this:
stateObj{
  shema: "../resources/acdh-schema.owl",
  queries:{
    "firstSearch": {
      ...
      results:[..]
    },
    "secondSearch": {
      ...
      results:[..]
    },
  }
}
*/

export const getters = {
  getQueries: (s) => {
    console.log('getQueries called', s, s.stateObj.queries);
    return s.stateObj.queries;
  },
  getQuery: s => (name) => {
    console.log('getQuery called', name, s, s.stateObj.queries);
    return s.stateObj.queries[name];
  },
};

export const mutations = {
  setQuery(s, { name, result }) {
    const quers = this.s.stateObj.queries;
    console.log('setQuery called: ', this, s, name, result);
    // this.state.stateObj.queries[name] = result;
    quers[name] = result;
    this.s.stateObj.queries = quers;
    // $set(state.stateObj.queries, name, result);
  },
  setShema(s, shm) {
    console.log('setShema mutation was called', s, shm);
    s.stateObj.shema = shm;
  },
};
