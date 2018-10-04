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
    <v-flex xs12> <!-- new data structure -->
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
              @click="objectsInStore.length > 0 || getCollectionTitles();"
              @change="changeSelected(props.item.isPartOf)"
            ></v-Autocomplete>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-data-table
            hide-headers
            :items="directories[props.item.fullName].files"
            item-key="filename"
          >
            <template slot="items" slot-scope="props">
              <td>
                {{ props.item.filename }}
              </td>
            </template>
          </v-data-table>
        </template>
      </v-data-table>
    </v-flex>
    <p class="text-lg-right">
      <v-btn :disabled="selected.length === 0" @click="collectionsToStore(selected)" color="secondary">Submit {{ selected.length || '' }} Selected</v-btn>
      <v-btn @click="logItems();">log</v-btn>
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
import { mapGetters, mapActions, mapMutations } from 'vuex';

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
      directories: [],
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
    ...mapMutations('batchCreate', [
      'setDirectories',
      'setModel',
      'setSelected',
    ]),
    onFileChange(e) {
      this.$info('Load', 'onFileChange(e)', e);
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].type === 'application/json') this.loadJSON(files[0]);
      else this.snackbar = true;
    },
    fileListObjectTrimm(object) {
      const obj = JSON.parse(JSON.stringify(object));
      obj.name = obj.name.replace(obj.directory, '');
      delete obj.directory;
      return obj;
    },
    loadJSON(file) {
      this.$info('Load', 'loadJSON(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const arr = JSON.parse(e.target.result).data;
        this.clear();
        for (let i = 0; i < arr.length; i += 1) {

          this.directories[arr[i].directory] = this.directories[arr[i].directory] || { files: [] };
          this.directories[arr[i].directory].files.push( this.fileListObjectTrimm(arr[i]) );

          if (!this.items.dirs.some(x => x.val === arr[i].directory)) {
            this.items.dirs.push({
              dir: this.getLastDir(arr[i].directory),
              val: arr[i].directory,
            });
            // this.model.push({ hasTitle: this.getLastDir(arr[i].directory), isPartOf: '' });
          }
          this.items.names.push({ name: arr[i].filename, val: arr[i].name });
        }
        // name and model
        this.initModel();
        this.getCollectionTitles();
        this.setDirectories(this.directories);
        this.$log('items', this.items);
      };
      reader.readAsText(file);
    },
    // name and model
    initModel() {
      const keys = Object.keys(this.directories);
      for (let i = 0; i < keys.length; i += 1) {
        this.directories[keys[i]].name = this.getLastDir(keys[i]);
        this.model.push({ hasTitle: this.directories[keys[i]].name, isPartOf: '', fullName: keys[i] });
      }
    },
    getLastDir(dir) {
      // Returns the second to last if the last is empty
      return dir.split('/').slice(-1)[0] || dir.split('/').slice(-2)[0];
    },
    logItems() {
      this.$debug('model', this.model);
      this.$debug('items', this.items);
      this.$debug('directories', this.directories);
      this.$debug('selected', this.selected);
    },
    collectionsToStore(colls) {
      for (let i = 0; i < colls.length; i += 1) {
        // filterOut fullName:
        const collection = JSON.parse(JSON.stringify(colls[i]));
        delete collection.fullName;
        this.ObjectToStore({
          schema: this.$store.state.JSONschema.schemas.collection,
          obj: collection,
        }, collection);
      }
      this.clear();
    },
    changeSelected(val) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.model[this.model.findIndex(x =>
          x.hasTitle === this.selected[i].hasTitle)].isPartOf = val;
      }
      this.setModel(this.model);
    },
    filteredTitlesMethod(dir) {
      if (dir) return this.items.names.filter(x => x.val.indexOf(dir) >= 0);
      return this.items.names;
    },
    getCollectionTitles() {
      this.$info('getCollectionTitles()');
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
    ...mapGetters('batchCreate', [
      'getDirectories',
      'getModel',
      'getSelected',
    ]),
  },
  mounted() {
    this.directories = this.getDirectories;
    this.model = this.getModel;
    this.selected = this.getSelected || [];
    this.getCollectionTitles();
  }

};
</script>

<style lang="css">
</style>
