import axios from 'axios';

//this could go to an external file, to be excluded from commits etc
const  CONFIG = {
  ARCHE:{
    BASEURL: 'https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/',
    ENDPOINTS: {
      PERSONS:'persons/',
      BASE:'',
      ORGANISATIONS:'organisations/',
      PLACES:'places/',
      CONCEPTS:'concepts/',
      PUBLICATIONS:'publications/'
    },
    TIMEOUT: 1000,
    PARAMS: {
      '_format':'json'
    },
    HEADERS:{}
  },
  VIAF: {
    BASEURL: 'https://www.viaf.org/viaf/search/',
    ENDPOINTS: {
      BASE:'',
    },
    TIMEOUT: 5000,
    PARAMS: {
      httpAccept: 'application/json'
    },
    HEADERS:{}
  }
}

var APIS = {};
//////////////////////////////////////////////////////////////////////

function buildFetchers(extconf){
  var fetchers = {};
  if(extconf) Object.assign(CONF, extconf);
  for (var c in CONFIG){
    var conf = CONFIG[c];
    fetchers[c] = {};
    for (var ep in conf.ENDPOINTS) {
      fetchers[c][ep] = axios.create({
        baseURL: conf.BASEURL + conf.ENDPOINTS[ep],
        timeout: conf.TIMEOUT,
        params: conf.PARAMS,
        headers: conf.HEADERS
      })
    }
  }
  return fetchers;
}

APIS = buildFetchers();

export default {
  methods: {

    getEndpointDataLike(endpoint, like) {
      this.$info("getEndpointDataLike(endpoint, like)", endpoint, like);
      if (like) {
        return APIS.ARCHE.BASE.get(endpoint + "/" + like)
          .then(function(response) {
            var results = {};
            if (typeof(response.data) === 'object') {
              results = response.data;
            } else {
              results = false;
            }
            return results;
          }.bind(this), function(response) {
            return false;
          });
      } else {
        return Promise.resolve({});
      }
    },

    getViafData(id) {
      this.$debug("getViafData(id)", APIS.VIAF, APIS.ARCHE);
      if (id) {
        return APIS.VIAF.BASE.get("",{
          params: {
            query: id
          }
        }
        ).then(function(response) {
            this.$debug("response", response.data.searchRetrieveResponse.records[0]);
            return Promise.resolve(response.data.searchRetrieveResponse.records[0]);
          }.bind(this), function(error) {
            this.$debug("errortree, request failed", error);
            return Promise.reject(error);
          }.bind(this));
        } else {
          this.$debug("errortree, no id");
          return Promise.reject("no ID was given");
      }
    }
  },
  created: function() {}
}
