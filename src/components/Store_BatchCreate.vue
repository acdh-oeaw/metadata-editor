<template lang="html">
  <fundamentcard
    caption="Create batch from file"
    >
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12>
          <input type="file" @change="onFileChange">
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12>
      <v-data-table
        :headers="headers"
        :items="model"
        v-model="selected"
        select-all
        item-key="hasTitle"
      >
        <template slot="items" slot-scope="props">
          <tr>
            <td>
              <v-checkbox
                v-model="props.selected"
                primary
                hide-details
              ></v-checkbox>
            </td>
            <td @click="props.expanded = !props.expanded">
              {{ props.item.hasTitle }}
              <v-icon v-if="!props.expanded">expand_more</v-icon>
              <v-icon v-else>expand_less</v-icon>
            </td>
            <td>
              <v-Autocomplete
              :items="objectsInStore"
              v-model="props.item.isPartOf"
              label="collection"
              item-text="title"
              item-value="id"
              @change="changeSelected(props.item.isPartOf)"
            ></v-Autocomplete>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-data-table
            hide-headers
            :items="filteredTitlesMethod(props.item.hasTitle)"
            item-key="val"
          >
            <template slot="items" slot-scope="props">
              <td>
                {{ props.item.val }}
              </td>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </v-flex>
    <p class="text-lg-right">
      <v-btn :disabled="selected.length === 0" @click="collectionsToStore(selected)" color="secondary">Submit {{ selected.length || '' }} Selected</v-btn>
    </p>
    <v-snackbar
      v-model="snackbar"
      top
    >
      You need to upload a JSON file!
      <v-btn
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </fundamentcard>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import fundamentcard from './Fundament/FundamentCard';
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      items: {
        titles: [],
        dirs: [],
      },
      snackbar: false,
      model: [],
      selected: [],
      objectsInStore: [],
      headers: [
        { text: 'Collection', value: 'coll' },
        { text: 'Is part of', value: 'isPartOf' },
      ],
    };
  },
  components: {
    fundamentcard,
  },
  methods: {
    ...mapActions('n3', [
      'ObjectToStore',
    ]),
    onFileChange(e) {
      this.$info('Load', 'onFileChange(e)', e);
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].type === 'application/json') this.loadJSON(files[0]);
      else this.snackbar = true;
    },
    loadJSON(file) {
      this.$info('Load', 'loadJSON(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const arr = JSON.parse(e.target.result).data;
        this.clear();
        for (let i = 0; i < arr.length; i += 1) {
          if (!this.items.dirs.some(x => x.val === arr[i].directory)) {
            this.items.dirs.push({
              dir: this.getLastDir(arr[i].directory),
              val: arr[i].directory,
            });
            this.model.push({ hasTitle: this.getLastDir(arr[i].directory), isPartOf: '' });
          }
          this.items.names.push({ name: arr[i].filename, val: arr[i].name });
        }
        this.getCollectionTitles();
        this.$log('items', this.items);
      };
      reader.readAsText(file);
    },
    getLastDir(dir) {
      // Returns the second to last if the last is empty
      return dir.split('/').slice(-1)[0] || dir.split('/').slice(-2)[0];
    },
    collectionsToStore(colls) {
      for (let i = 0; i < colls.length; i += 1) {
        this.ObjectToStore({
          schema: this.$store.state.JSONschema.schemas.collection,
          obj: colls[i],
        }, colls[i]);
      }

      this.clear();
    },
    changeSelected(val) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.model[this.model.findIndex(x =>
          x.hasTitle === this.selected[i].hasTitle)].isPartOf = val;
      }
    },
    filteredTitlesMethod(dir) {
      if (dir) return this.items.names.filter(x => x.val.indexOf(dir) >= 0);
      return this.items.names;
    },
    getCollectionTitles() {
      const collQuads = this.getAllCollections();
      for (let i = 0; i < collQuads.length; i += 1) {
        this.objectsInStore.push({
          title: this.getQuads({
            subject: collQuads[i].subject.id,
            predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle',
          })[0].object.id.slice(1, -1),
          id: collQuads[i].subject.id,
        });
      }
    },
    clear() {
      this.items = {
        names: [],
        dirs: [],
      };
      this.model = [];
      this.objectsInStore = [];
    },
  },
  computed: {
    ...mapGetters('n3', [
      'getQuads',
    ]),
  },
};
</script>

<style lang="css">
</style>
