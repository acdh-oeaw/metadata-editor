import axios from 'axios';
/* eslint no-console: ["error", { allow: ["log"] }] */
// this could go to an external file, to be excluded from commits etc
const CONFIG = {
  ARCHE: {
    BASEURL: 'https://fedora.apollo.arz.oeaw.ac.at/browser/api/',
    ENDPOINTS: {
      PERSONS: 'persons/',
      BASE: '',
      ORGANISATIONS: 'organisations/',
      PLACES: 'places/',
      CONCEPTS: 'concepts/',
      PUBLICATIONS: 'publications/',
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
    HEADERS: {
    },
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
    // getEndpointDataLike(endpoint, like) {
    //   this.$info("getEndpointDataLike(endpoint, like)", endpoint, like);
    //   if (like) {
    //     return APIS.ARCHE.BASE.get(endpoint + "/" + like)
    //       .then(function(response) {
    //         var results = {};
    //         if (typeof(response.data) === 'object') {
    //           results = response.data;
    //         } else {
    //           results = false;
    //         }
    //         return results;
    //       }.bind(this), function(response) {
    //         return false;
    //       });
    //   } else {
    //     return Promise.resolve({});
    //   }
    // },
    //
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
      if (id && type && APIS.ARCHE[type]) {
        return APIS.ARCHE[type].get(`${id}`).then((response) => {
          console.log('response', response.data);
          return Promise.resolve(response.data);
        }, (error) => {
          console.log('errortree, request failed', error);
          return Promise.reject(error);
        });
      }
      console.log('errortree, no id');
      return Promise.reject('no ID or Type was given');
    },
    extractHostname(url) {
      let hostname;
      if (url.indexOf('://') > -1) {
        hostname = url.split('/')[2];
      } else {
        hostname = url.split('/')[0];
      }
      hostname = hostname.split(':')[0];
      hostname = hostname.split('?')[0];
      return hostname;
    },
  },
  created() {

  },
};
