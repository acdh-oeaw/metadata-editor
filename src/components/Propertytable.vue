<template>
  <div class="">
    <h3>Properties</h3>
    <b-table striped hover :items="tabledata"></b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HELPERS from '../helpers';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
  },
  props: ['uri'],
  data() {
    return {
      tabledata: [],
    };
  },
  methods: {
    ...mapActions('jowl', [
      'fetchClasses',
      'fetchSubClassOf',
      'fetchPropertiesByURI',
    ]),
  },
  computed: {
    ...mapGetters('jowl', [
      'getQuery',
    ]),
  },
  watch: {
    uri: function getProps(newClass) {
      this.tabledata = [];
      this.fetchPropertiesByURI({ q: newClass, uri: newClass }).then((res) => {
        let idx = res.length - 1;
        while (idx + 1) {
          this.tabledata.push({
            name: res[idx]['?p'].name,
            type: res[idx]['?p'].type,
            range: res[idx]['?p'].range,
          });
          idx -= 1;
        }
      });
    },
  },
  created() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
