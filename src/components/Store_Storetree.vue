<template>
  <v-layout row wrap class="mt-3">
    <v-flex xs12 v-for="(item, i) in rootitems" :key="i" >
      <item :uri="item.subject"></item>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import item from './Store_Storetreeitem';

import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  data() {
    return {
      rootitems: [],
    };
  },
  name: 'storetree',
  components: {
    item,
  },
  computed: {
    ...mapGetters('n3', [
      'getCount',
      'getTriples',
      'getTitle',
    ]),
  },
  watch: {
    getCount() {
      this.getRoot();
    },
  },
  methods: {
    getRoot() {
      this.rootitems = [];
      const collections = this.getTriples({ predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitleImage' });
      const persons = this.getTriples({ predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', object: 'https://vocabs.acdh.oeaw.ac.at/schema#Person' });
      const places = this.getTriples({ predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', object: 'https://vocabs.acdh.oeaw.ac.at/schema#Place' });
      const organisations = this.getTriples({ predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', object: 'https://vocabs.acdh.oeaw.ac.at/schema#Organisation' });
      console.log(persons);
      this.rootitems = [...organisations, ...persons, ...places, ...collections, ...this.rootitems];
      console.log(this.rootitems);
    },
  },
  mounted() {
    this.getRoot();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
