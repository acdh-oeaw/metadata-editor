<template>
  <v-layout row wrap @click="setCollections">
    <v-expansion-panel>
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>folder</v-icon> Collections / Resources</div>
        <v-autocomplete
          @input="setRootCollections(); $debug('hai');"
          v-if="selectRootManually"
          :items="collectionNames"
          v-model="collectionNames_select"
          label="Please select all root collections"
          multiple
          chips
          deletable-chips
          >
        </v-autocomplete>
        <v-card v-if="collections">
          <v-flex xs12 v-for="(item, i) in collections" :key="i" >
            <item @input="$emit('input', passThroughItem)"  v-model="passThroughItem" :uri="item.subject" :itemFull="item" :bg="!i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
      <!--
        <v-expansion-panel-content>
          <div slot="header"><v-icon large color='teal lighten-3'>developer_board</v-icon> Resources</div>
          <v-card>
            <v-flex xs12 v-for="(item, i) in resources" :key="i" >
              <item @input="$emit('input', passThroughItem)" v-model="passThroughItem" :uri="item.subject" :itemFull="item" :bg="i%2"></item>
            </v-flex>
          </v-card>
        </v-expansion-panel-content>
      -->
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>person</v-icon> People</div>
        <v-card>
          <v-flex xs12 v-for="(item, i) in persons" :key="i" >
            <item @input="$emit('input', passThroughItem)"  v-model="passThroughItem" :uri="item.subject" :itemFull="item"  :bg="i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>work</v-icon> Projects</div>
        <v-card>
          <v-flex xs12 v-for="(item, i) in projects" :key="i" >
            <item @input="$emit('input', passThroughItem)"  v-model="passThroughItem" :uri="item.subject" :itemFull="item"  :bg="i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>device_hub</v-icon> Organisations</div>
        <v-card>
          <v-flex xs12 v-for="(item, i) in organisations" :key="i" >
            <item @input="$emit('input', passThroughItem)"  v-model="passThroughItem" :uri="item.subject" :itemFull="item"  :bg="i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>place</v-icon> Places</div>
        <v-card>
          <v-flex xs12 v-for="(item, i) in places" :key="i" >
            <item @input="$emit('input', passThroughItem)" v-model="passThroughItem" :uri="item.subject" :itemFull="item" :bg="i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
      <v-expansion-panel-content>
        <div slot="header"><v-icon large color='teal lighten-3'>chrome_reader_mode</v-icon> Publications</div>
        <v-card>
          <v-flex xs12 v-for="(item, i) in publications" :key="i" >
            <item @input="$emit('input', passThroughItem)" v-model="passThroughItem" :uri="item.subject" :itemFull="item" :bg="i%2"></item>
          </v-flex>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import item from './Store_Storetreeitem';

import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  props: {
    selectRootManually: {
      default: false,
    },
  },
  data() {
    return {
      collectionNames: [], // list of all collection and projectnames
      collectionNames_select: [], // selection of v-autocomplete
      collections: [], // actual root elements
      projects: [],
      persons: [],
      places: [],
      organisations: [],
      publications: [],
      resources: [],
      passThroughItem: {},
    };
  },
  name: 'storetree',
  components: {
    item,
  },
  computed: {
    ...mapGetters('n3', [
      'getUpdate',
      'getQuads',
      'getQuadsByType',
    ]),
    ...mapGetters('JSONschema', [
      'getUnsavedChanges',
    ]),

  },
  watch: {
    getUpdate(oldV, newV) {
      this.$info('getUpdate', oldV, newV);
      this.collections = {};
      this.projects = {};
      this.persons = {};
      this.places = {};
      this.publications = {};
      this.organisations = {};
      this.resources = {};
      setTimeout(() => this.getRoot(), 100);
      // this.getRoot();
    },
    getUnsavedChanges(oldV, newV) {
      this.$info(oldV, newV);
      this.getRoot();
    },
    n3() {
      this.getRoot();
    },
  },
  methods: {
    ...mapActions('n3', [
      'AddFilteredQuad',
      'AddQuad',
    ]),
    setCollections() {
      this.collectionNames = this.getAllCollections().map(v => v.subject.value);
    },
    // to be implemented
    SetAsRootCollection(subject) {
      /*
        this.AddQuad({
        subject: `_:${this.collectionNames_select[i]}`,
        predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitleImage',
        object: ''});
      */
    },
    altesSetRootCollections() {
      this.$debug('setRootCollections', this.collectionNames_select);
      let collections = [];
      for (let i = 0; i < this.collectionNames_select.length; i += 1) {
        // setHasTitleImage(this.collectionNames_select[i]);

        collections = collections.concat(this.getQuads({
          subject: `_:${this.collectionNames_select[i]}`,
          predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' },
          ),
        );
      }
      this.getRoot();
      this.collections = this.collections.concat(collections);
      this.$debug('this.collections', JSON.stringify(this.collections));
      this.collections = this.collections.filter((val, pos) =>
        (this.collections.indexOf(val) === pos),
      );
      // this.getRoot();
      this.$forceUpdate();
    },
    // find all root collections by checking for isPartOf and hasPart properties
    setRootCollections() {
      // all collections:
      const collections = this.getQuadsByType('Collection');
      const projects = this.getQuadsByType('Project');

      // all isPartOf-property quads
      const partOfCollsSubjects = this.getQuads({ predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf' }).map(coll => coll.subject.value);
      const hasPartCollsObject = this.getQuads({ predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasPart' }).map(coll => coll.object.value);

      /*
        filter out collections, which subjects appear neither in the
        partOfCollsSubjects or in the hasPartCollsObject.
      */
      const collectionsWithoutPartOf = collections.filter(coll =>
        !partOfCollsSubjects.includes(coll.subject.value)
        && !hasPartCollsObject.includes(coll.object.value),
      );

      this.$debug('collections', collections, 'partOfColls', 'partOfCollsSubjects', partOfCollsSubjects, 'collectionsWithoutPartOf', collectionsWithoutPartOf);
      return collectionsWithoutPartOf.concat(projects);
    },
    getRoot() {
      this.$info('getRoot()');
      this.collections = this.setRootCollections();
      this.projects = this.getQuadsByType('Project');
      this.persons = this.getQuadsByType('Person');
      this.places = this.getQuadsByType('Place');
      this.publications = this.getQuadsByType('Publication');
      this.organisations = this.getQuadsByType('Organisation');
      this.resources = this.getQuadsByType('Resource');
      this.$forceUpdate();
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
