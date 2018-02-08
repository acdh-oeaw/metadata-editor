import axios from 'axios';
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
    },
    TIMEOUT: 1000,
    PARAMS: {
      _format: 'json',
    },
    HEADERS: {},
  },
  VIAF: {
    BASEURL: 'https://www.viaf.org/viaf/search/',
    ENDPOINTS: {
      BASE: '',
    },
    TIMEOUT: 5000,
    PARAMS: {
    },
    HEADERS: {
      httpAccept: 'application/json',
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
    // getViafData(id) {
    //   this.$debug("getViafData(id)", APIS.VIAF, APIS.ARCHE);
    //   if (id) {
    //     return APIS.VIAF.BASE.get("",{
    //       params: {
    //         query: id
    //       }
    //     }
    //     ).then(function(response) {
    //         this.$debug("response", response.data.searchRetrieveResponse.records[0]);
    //         return Promise.resolve(response.data.searchRetrieveResponse.records[0]);
    //       }.bind(this), function(error) {
    //         this.$debug("errortree, request failed", error);
    //         return Promise.reject(error);
    //       }.bind(this));
    //     } else {
    //       this.$debug("errortree, no id");
    //       return Promise.reject("no ID was given");
    //   }
    // }
  },
  created() {

  },
};
