import axios from 'axios';
// import exampleAPI from '../../static/example_api.json';
// import exampleAPI from '../../static/newsletter.json';

/* eslint no-console: ["error", { allow: ["log"] }] */
// this could go to an external file, to be excluded from commits etc
const CONFIG = {
  ARCHE: {
    BASEURL: 'https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/',
    ENDPOINTS: {
      PERSONS: 'persons/',
      BASE: '',
      ORGANISATIONS: 'organisations/',
      PLACES: 'places/',
      CONCEPTS: 'concepts/',
      PUBLICATIONS: 'publications/',
      METADATA: 'getMetadata/',
    },
    TIMEOUT: 1000,
    PARAMS: {
      _format: 'json',
    },
    HEADERS: {},
  },
  VIAF: {
    BASEURL: 'https://www.viaf.org/viaf/',
    ENDPOINTS: {
      BASE: '',
      SEARCH: 'search',
    },
    TIMEOUT: 5000,
    PARAMS: {
      httpAccept: 'application/json',
    },
    HEADERS: {},
  },
};

let APIS = {};

function buildFetchers(extconf) {
  const fetchers = {};
  // let ep = [];
  if (extconf) Object.assign(CONFIG, extconf);
  const c = Object.keys(CONFIG);
  let idx = c.length - 1;
  while (idx + 1) {
    const d = Object.keys(CONFIG[c[idx]].ENDPOINTS);
    let idy = d.length - 1;
    fetchers[c[idx]] = {};
    while (idy + 1) {
      fetchers[c[idx]][d[idy]] = axios.create({
        baseURL: CONFIG[c[idx]].BASEURL + CONFIG[c[idx]].ENDPOINTS[d[idy]],
        timeout: CONFIG[c[idx]].TIMEOUT,
        params: CONFIG[c[idx]].PARAMS,
        headers: CONFIG[c[idx]].HEADERS,
      });
      idy -= 1;
    }
    idx -= 1;
  }
  return fetchers;
}

APIS = buildFetchers();

export default {
  data() {
    return {
      APIS,
    };
  },
  methods: {
    /* fetches the JSON-schema from the specified API in the config and returns it.
      */
    getMetadataByType(type) {
      return APIS.ARCHE.METADATA.get(`${type}/`).then(response => Promise.resolve(response.data));
    },
    getViafByID(id) {
      if (id) {
        return APIS.VIAF.BASE.get(`${id}/`).then((response) => {
          console.log('response', response.data);
          return Promise.resolve(response.data);
        }, (error) => {
          console.log('errortree, request failed', error);
          return Promise.reject(error);
        });
      }
      console.log('errortree, no id');
      return Promise.reject('no ID was given');
    },
    getArcheByID(id, type) {
      console.log(id, type, APIS.ARCHE[type]);
      if (id && type && APIS.ARCHE[type]) {
        return APIS.ARCHE[type].get(`${id}`).then((response) => {
          console.log('response', response.data);
          return Promise.resolve(response.data);
        }, (error) => {
          console.log('errortree, request failed', error);
          return Promise.reject(error);
        });
      }
      return Promise.reject('no ID or Type was given');
    },
    setInitialData(err, key, post) {
      if (err) {
        this.error = err.toString();
      } else {
        this[key] = post;
      }
    },
  },
  created() {
  },
};
