import axios from 'axios';
import rdfTranslator from 'rdf-translator';
// import exampleAPI from '../../static/example_api.json';
// import exampleAPI from '../../static/newsletter.json';

/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable spaced-comment */
/* eslint-disable arrow-body-style */

// this could go to an external file, to be excluded from commits etc


/*
const VALID_TYPES = {
  ARCHE: [
    'PERSONS',
    'ORGANISATIONS',
    'PLACES',
    'CONCEPTS',
    'PUBLICATIONS',
    'METADATA',
  ],
};
*/

/*
 atomic mapping of types to API-Calls by using APIS
 example) type: { APITYPE1: [ 'enpoint1', 'endoint2' ], APITYPE2: [ 'enpoint1', 'endoint2' ] }
 in the example above 4 apicalls would be made and all results concatted into one
 for the user to select.
 'ARCHE_ALL' is a wildcard for all endoints within ARCHE.
 used in getMultipleApiCallsByTypeAndID.
*/

// APIS = buildFetchers(CONFIG);

export default {
  data() {
    return {
      APIS: {},
    };
  },
  computed: {
    storeApis() {
      return this.$store.state.config.apis;
    },
  },
  watch: {
    storeApis() {
      this.APIS = this.buildFetchers(this.storeApis);
    },
  },
  methods: {
    /* fetches the JSON-schema from the specified API in the config and returns it.
     */
    buildFetchers(conf, extconf) {
      const fetchers = {};
      if (extconf) Object.assign(conf, extconf);
      const c = Object.keys(conf);
      let idx = c.length - 1;
      while (idx + 1) {
        const d = Object.keys(conf[c[idx]].ENDPOINTS);
        let idy = d.length - 1;
        fetchers[c[idx]] = {};
        while (idy + 1) {
          fetchers[c[idx]][d[idy]] = axios.create({
            baseURL: conf[c[idx]].BASEURL + conf[c[idx]].ENDPOINTS[d[idy]],
            timeout: conf[c[idx]].TIMEOUT,
            params: conf[c[idx]].PARAMS,
            headers: conf[c[idx]].HEADERS,
          });
          idy -= 1;
        }
        idx -= 1;
      }
      return fetchers;
    },
    getMetadataByType(type) {
      this.$debug('Helpers', 'getMetadataByType(type)', type);
      return this.APIS.ARCHE.METADATA
        .get(`${type}/en`)
        .then(response => Promise.resolve(response.data))
        .catch(res => this.$log(res));
    },
    /* fetches data from the specified viaf endpoint in the config above and returnes it.
    */
    getViafByID(id) {
      this.$info('Helpers', 'getViafByID(id)', id);
      if (id) {
        return this.APIS.VIAF.BASE
          .get(`${id}/`)
          .then((response) => {
          // this.$log('response', response.data);
            return Promise.resolve(response.data);
          }, (error) => {
            // this.$log('errortree, request failed', error);
            return Promise.reject(error);
          });
      }
      // this.$log('errortree, no id');
      return Promise.reject('no ID was given');
    },
    /*
    returns the substring of the given name from the last '#' to the end
    and returns the lower case version of it. used by Create.vue.

    eg: nameToType('https://vocabs.acdh.oeaw.ac.at/schema#Agent') -> agent
    */
    nameToType(name) {
      return name.substring(name.lastIndexOf('#') + 1).toLowerCase();
    },
    /*
    finds out if given id is a identifier in Arche by asking the checkIdentifier endpoint.
    since there are multiple types of responses the mapping below explains what each response means.
    returns:
    0 => not a valid identifier
    1 => valid free identifier
    -1 => valid already taken identifier
    -2 => no parameters were given
    -3 => answer from server failed
    */
    isIdentifier(id) {
      if (!id) { return Promise.reject(-2); }
      this.$debug('isIdentifier, id', id);
      return this.APIS.ARCHE2.ID.get(`${encodeURIComponent(id.replace('https://', ''))}`).then((response) => {
        /*
          For some reason, the api only accepts %20 instead of %2F,
          this might be fixed but for now we'll have to do it like this
        */
        this.$debug('   good response', response.data);
        return response.data[0] === 'The identifier is free' ? 1 : -1;
      })
      .catch((res) => {
        this.$debug('   bad response', res.response);
        if (res.response && res.response.data && res.response.data[0]) {
          const answer = (res.response.data[0] === 'This is not a valid ACDH identifier') ? 0 : -3;
          return answer;
        }
        return -3;
      });
    },
    /*
    fetches data from Arche on the specified endpoint using the given typ.
    */
    getArcheByID(id, typ) {
      const type = typ.toUpperCase().trim();
      this.$info('Helpers', 'getArcheByID(id, type)', id, type);
      if (id && type && this.APIS.ARCHE2[type]) {
        return this.APIS.ARCHE2[type].get(`${id}`)
          .then((response) => {
            // this.$log('response', response.data);
            return Promise.resolve(response.data);
          }, (error) => {
            // this.$log('errortree, request failed', error);
            return Promise.reject(error);
          });
      }
      return Promise.reject('no ID or Type was given');
    },
    /*
    fetches data from the vocabs endpoint of the given typ matching the given id.
    */
    getVocabsByID(id, typ) {
      const type = typ.toUpperCase();
      this.$info('Helpers', 'getVocabsByID(id, type)', id, type);
      if (id && type && this.APIS.VOCABS[type]) {
        return this.APIS.VOCABS[type].get('', {
          params: {
            query: `${id}*`,
          },
        }).then((response) => {
          // this.$log('response', response);
          return Promise.resolve(response.data);
        }, (error) => {
          // this.$log('errortree, request failed', error);
          return Promise.reject(error);
        });
      }
      return Promise.reject('failed to recieve vocabs');
    },
    /*
    function to add in a .catch function for multiple promises. not used right now.
    */
    useNull() {
      return null;
    },

    /*
    maps typs to material icons. see https://material.io/tools/icons/
    */
    typeicon(typ) {
      this.$log(typ);
      if (typ) {
        switch (typ) {
          case 'resource':
            return 'developer_board';
          case 'persons':
          case 'person':
            return 'person';
          case 'places':
          case 'place':
            return 'place';
          case 'organisations':
          case 'organisation':
            return 'device_hub';
          case 'ARCHE_CATEGORY':
            return 'folder_open';
          case 'ARCHE_LIFECYCLE_STATUS':
            return 'donut_large';
          case 'X':
            return 'highlight_off';
          case 'CHECK':
            return 'check_circle';
          case 'KEYBOARD':
            return 'keyboard';
          default: return 'folder';
        }
      }
      return 'folder';
    },

    /*
    This function can be used to set data to any key to vm (this).
    Also usable to set an error to this.error. The function currently is never used.
    */
    setInitialData(err, key, post) {
      this.$info('Helpers', 'setInitialData(err, key, post)', err, key, post);
      if (err) {
        this.error = err.toString();
      } else {
        this[key] = post;
      }
    },

    /*
    takes in entries from an autocomplete component, which is an object.
    it looks for objects as values and replaces them by the id found in the object.
    */
    filterModelBeforeUpload(model) {
      this.$info('Helpers', 'filterModelBeforeUpload(model)', model);
      const m = JSON.parse(JSON.stringify(model));
      const keys = Object.keys(model);
      const vals = Object.values(model);
      // this.$log(keys, vals, m);
      for (let i = 0; i < keys.length; i += 1) {
        if ((typeof vals[i]).toLowerCase() === 'object') {
          m[keys[i]] = this.filterForArcheID(vals[i]);
        }
      }
      return m;
    },
    /*
    searches for identifiers inside an object and returns the first identifier
    that starts with https://id.acdh.oeaw.ac.at.

    used by filterModelBeforeUpload.
    */
    filterForArcheID(obj) {
      this.$info('Helpers', 'filterForArcheID(obj)', obj);
      if (obj.identifiers) {
        return obj.identifiers.filter(str => str.indexOf('https://id.acdh.oeaw.ac.at') > -1)[0];
      }
      return obj;
    },

    /*
    copies the value of range to the position of type. and returns the model.
    * @param schema schema object obtained form the api via getMetadataByType()
    * @param type if type === 'only name' only the name of the range is taken.
    * eg. "https://vocabs.acdh.oeaw.ac.at/schema#ContainerOrResource" -> ContainerOrResource"
    **/
    copyRangeToType(schema, type) {
      this.$info('Helpers', 'copyRangeToType(model, type)', schema, type);
      if (!schema || !schema.properties) {
        return {};
      }
      const m = schema; // to be returned


      const keys = Object.keys(schema.properties);

      //debug object, lists all types
      const types = {};

      // this.$log(keys, schema);
      for (let i = 0; i < keys.length; i += 1) {
        if (!m.properties[keys[i]].attrs) m.properties[keys[i]].attrs = {};
        if (m.properties[keys[i]].range) {
          this.$log(m.properties[keys[i]]);
          let r = m.properties[keys[i]].range;
          if (type === 'only name') {
            r = r.substring(r.lastIndexOf('#') + 1);
            m.properties[keys[i]].attrs.type = r;
          } else {
            m.properties[keys[i]].attrs.type = r;
          }
          if (types[r]) {
            types[r] += 1;
          } else {
            types[r] = 1;
          }
        }
      }
      // this.$debug('FMFT: valid types:', types);

      return m;
    },
    /*
    deletes all keys of on object that match the given regEx. and returns the object.
    */
    removeBlacklisted(schema, regEx) {
      this.$info('Helpers', 'removeBlacklisted(schema, regEx)', schema, regEx);
      if (!schema || !schema.properties) {
        return {};
      }
      const m = schema; // to be returned
      const keys = Object.keys(schema.properties);
      for (let i = 0; i < keys.length; i += 1) {
        if (regEx.exec(keys[i])) {
          delete m.properties[keys[i]];
        }
      }
      return m;
    },
    // Store Functions
    /*
    gets the latest session out of the local storage.
    // TODO: since we currently obly store one session, this function coud be much shorter.
    */
    getLatestSession() {
      let localStorage;
      try {
        localStorage = window.localStorage;
      } catch (e) {
        // Access denied :-(
        return e;
      }
      let latest = {
        date: -1,
      };
      let sessions = {};
      let sessionVals = {};
      try {
        sessions = Object.keys(JSON.parse(localStorage.MetaDataEditor));
        sessionVals = Object.values(JSON.parse(localStorage.MetaDataEditor));
      } catch (e) {
        return null;
      }
      for (let i = 0; i < sessions.length; i += 1) {
        this.$log(Date.now() - sessionVals[i].date);
        // second contition is to catch the newly made session.
        if (sessionVals[i].date > latest.date && Date.now() - sessionVals[i].date > 50) {
          latest = sessionVals[i];
        }
      }
      if (latest.date === -1) {
        latest = null;
      }
      return latest;
    },
    /*
    deletes the whole local Storage of the key 'MetaDataEditor'.
    // TODO: the key is currently hardcoded. should be imported from some config.
    */
    deleteOldSessions() {
      let localStorage;
      try {
        localStorage = window.localStorage;
      } catch (e) {
        // Access denied :-(
        return e;
      }
      try {
        localStorage.setItem('MetaDataEditor', '');
      } catch (e) {
        return null;
      }
      return null;
    },
    /*
    deletes * from the local storage
    and reroutes to the current page in order do clear the vuex Storage.
    */
    clearCache() {
      this.deleteOldSessions();
      this.$router.go(this.$router.currentRoute);
    },
    /*
    returns a new Blob of the type text/ttl of the given string.
    */
    stringToBlob(str) {
      return new Blob([str], {
        type: 'text/ttl;',
      });
    },
    /*
    returns a verbose date format in the form of: yy/mm/dd hh:mm:ss
    */
    dateToString(date) {
      const y = date.getFullYear() - 2000;
      let m;
      if (date.getMonth() < 10) {
        m = '0'.toString() + (date.getMonth() + 1);
      } else {
        m = date.getMonth() + 1;
      }
      let d;
      if (date.getDate() < 10) {
        d = '0'.toString() + date.getDate();
      } else {
        d = date.getDate();
      }
      return `${y}/${m}/${d} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    saveSubjectChanges(subject, model, schema) {
      this.$debug('saveSubjectChanges(subject, model, schema)', subject, model, schema);
      this.RemoveSubject(subject);
      this.ObjectToStore({
        obj: this.filterModelBeforeUpload(model),
        schema,
        id: subject,
      });
      this.deleteEdit({ subject });
    },
    saveAllSubjectChanges() {
      const unsaved = this.getUnsaved;
      const keys = Object.keys(unsaved);
      this.$log('unsaved keys', unsaved, keys);
      for (let i = 0; i < keys.length; i += 1) {
        this.saveSubjectChanges(
          keys[i],
          unsaved[keys[i]].model,
          this.getSchema(unsaved[keys[i]].schema),
        );
      }
    },
    /**
    returns emtpy string if argument is missing
    **/
    convertRDF(rdfstring) {
      this.$log(rdfstring);
      if (rdfstring) {
        return rdfTranslator(rdfstring, 'xml', 'n3')
          .then((data) => {
            return Promise.resolve(data);
          }).catch((err) => {
            return Promise.reject(err);
          });
      }
      return '';
    },
    /**
    uses the getQuads function from n3-getters to recieve all collections in the database
    **/
    getAllCollections() {
      this.$info('helpers:getAllCollections');
      const res = this.getQuadsByType('Collection')
        .concat(this.getQuadsByType('Project'));
      // const names = res.map((v) => v.subject.value);


      this.$debug('getAllCollections', res);
      return res;
    },
    downloadBlob(str, filename) {
      const blob = (window.URL || window.webkitURL)
        .createObjectURL(this.stringToBlob(str));

      const downloadLink = document.createElement('A');
      downloadLink.setAttribute('href', blob);
      downloadLink.setAttribute('download', filename);
      downloadLink.setAttribute('v-show', 'false');

      document.body.appendChild(downloadLink);

      downloadLink.click();
    },
    checkConnections() {
      this.APIS.ARCHE.BASE
        .get('test/')
        .catch((res) => {
          if (!res.response) {
            this.addToFailed('ARCHE');
            this.setDialog({
              name: 'networkerrordialog',
              obj: {
                status: true,
              },
            });
          } else {
            this.removeFromFailed('ARCHE');
          }
        });
      this.APIS.ARCHE2.BASE
        .get('test/')
        .catch((res) => {
          if (!res.response) {
            this.addToFailed('ARCHE2');
            this.openDialog('networkerrordialog');
          } else {
            this.removeFromFailed('ARCHE2');
          }
        });
      this.APIS.VIAF.BASE
        .get('168348279/')
        .catch((res) => {
          if (!res.response) {
            this.addToFailed('VIAF');
            this.openDialog('networkerrordialog');
          } else {
            this.removeFromFailed('VIAF');
          }
        });
      this.APIS.VOCABS.ARCHE_CATEGORY
        .get('test/')
        .catch((res) => {
          if (!res.response) {
            this.addToFailed('VOCABS');
            this.openDialog('networkerrordialog');
          } else {
            this.removeFromFailed('VOCABS');
          }
        });
    },
  },
  created() {
    this.$info('Helpers', 'created');
    this.APIS = this.buildFetchers(this.storeApis);
  },
};
