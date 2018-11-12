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
              item-text="hasTitle"
              item-value="id"
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
    <v-divider></v-divider>
    <v-flex xs5 offset-xs7>
      <v-text-field
        label="filter"
        v-model="filterText"
        append-icon="search"
      ></v-text-field>
    </v-flex>
    <v-flex xs12>
      <v-data-table
        :headers="resourceHeaders"
        :items="resourceItems"
        :search="filterText"
        v-model="selectedItems"
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
            <td>
              {{ props.item.hasTitle }}
            </td>
            <td>
              <v-Autocomplete
              :items="objectsInStore"
              v-model="props.item.collectionName"
              label="collection"
              item-text="hasTitle"
              item-value="hasTitle"
              @change="changeSelectedItems(props.item.collectionName)"
            ></v-Autocomplete>
            </td>
            <td>
              {{ props.item.hasIdentifier }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <p class="text-lg-right">
      <v-btn
        :disabled="selected.length === 0"
        @click="collectionsToStore(selected)"
        color="primary"
      >
        Submit {{ selected.length }} Collection(s) with {{ selectedItems.length }} Resource(s)
      </v-btn>
      <v-btn
        :disabled="selectedItems.length === 0"
        @click="resourcesToStore(selectedItems)"
        color="primary"
      >
        Submit {{ selectedItems.length }} Resource(s)
      </v-btn>

      <v-btn @click="logItems">log</v-btn>
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
import {
  mapGetters,
  mapActions,
  mapMutations,
} from 'vuex';

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
      selectedItems: [],
      selectAllitems: true,
      filterText: '',
      headers: [{
        text: 'Collection',
        value: 'coll',
      },
      {
        text: 'Is part of',
        value: 'isPartOf',
      },
      ],
      resourceHeaders: [{
        text: 'Name',
        value: 'hasTitle',
      },
      {
        text: 'Is part of',
        value: 'collectionName',
      },
      {
        text: 'Path',
        value: 'hasIdentifier',
      },
      ],
    };
  },
  components: {
    fundamentcard,
  },
  methods: {
    ...mapActions('n3', [
      'ObjectToStore',
      'RemoveQuad',
      'RemoveSubject',
      'AddQuad',
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
          this.directories[arr[i].directory] = this.directories[arr[i].directory] || {
            files: [],
          };
          this.directories[arr[i].directory].files.push(this.fileListObjectTrimm(arr[i]));
          // this.model.push({ hasTitle: this.getLastDir(arr[i].directory), isPartOf: '' });
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
      this.model = [];
      const keys = Object.keys(this.directories);
      for (let i = 0; i < keys.length; i += 1) {
        this.directories[keys[i]].name = this.getLastDir(keys[i]);
        this.model.push({
          hasTitle: this.directories[keys[i]].name,
          isPartOf: '',
          fullName: keys[i],
        });
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
      this.$debug('selectedItems', this.selectedItems);
    },
    collectionsToStore(colls) {
      for (let i = 0; i < colls.length; i += 1) {
        // filterOut fullName:
        const collection = JSON.parse(JSON.stringify(colls[i]));
        collection.hasIdentifier = collection.fullname;
        delete collection.fullName;
        this.ObjectToStore({
          schema: this.$store.state.JSONschema.schemas.collection,
          obj: collection,
        }, collection);
      }
      this.resourcesToStore(this.selectedItems);
      this.clearSelected();
    },
    resourcesToStore(res) {
      this.$log('this.selectedItems', this.selectedItems);
      for (let i = 0; i < res.length; i += 1) {
        const resource = JSON.parse(JSON.stringify(res[i]));
        this.$log('res', resource);
        this.$log('this.selected.length', this.selected.length);
        if (this.selected.length !== 0) {
          resource.isPartOf = this.getQuads({
            predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle',
            object: `"${resource.collectionName}"`,
          });
          this.$log(resource);
          if (resource.isPartOf.length !== 0) resource.isPartOf = resource.isPartOf[0].subject.id;
          else delete resource.isPartOf;
          this.$log(resource);
          delete resource.collectionName;
          this.$log('removed id');
          this.ObjectToStore({
            schema: this.$store.state.JSONschema.schemas.resource,
            obj: resource,
          }, resource);
        } else {
          this.$log('this.selectedItems', this.selectedItems);
          if (resource.collectionName) {
            this.RemoveQuad({
              subject: resource.subject,
              predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf',
              object: resource.isPartOf,
            });
            const quad = this.getQuads({
              predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle',
              object: `"${resource.collectionName}"`,
            })[0].subject.id;
            this.ObjectToStore({
              schema: this.$store.state.JSONschema.schemas.resource,
              obj: { isPartOf: quad },
              id: resource.subject,
            });
            this.$log('quad', quad, resource);
          }
        }
      }
    },
    clearSelected() {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.$info('loop', this.selected, this.directories, this.directories[this.selected[i].fullName]);
        delete this.directories[this.selected[i].fullName];
      }
      this.initModel();
      //    this.model.filter(item => !this.selected.includes(item));
      this.setModel(this.model);
      this.selected = [];
      this.$forceUpdate();
    },
    changeSelected(val) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.model[this.model.findIndex(x =>
          x.hasTitle === this.selected[i].hasTitle)].isPartOf = val;
      }
      this.setModel(this.model);
    },
    changeSelectedItems(val) {
      for (let i = 0; i < this.selectedItems.length; i += 1) {
        this.resourceItems[this.resourceItems.findIndex(x =>
          x.hasTitle === this.selectedItems[i].hasTitle)].collectionName = val;
      }
    },
    filteredTitlesMethod(dir) {
      if (dir) return this.items.names.filter(x => x.val.indexOf(dir) >= 0);
      return this.items.names;
    },
    clear() {
      // this.directories = [];
      this.model = [];
    },
    fetchSchemas(schemas) {
      for (let i = 0; i < schemas.length; i += 1) {
        if (!(
            this.$store.state.JSONschema.schemas &&
            this.$store.state.JSONschema.schemas[schemas[i]]
          )) this.getMetadataByType(schemas[i]);
      }
    },
  },
  computed: {
    ...mapGetters('n3', [
      'getQuads',
      'getQuadsByType',
      'getObjectsBySubjects',
    ]),
    ...mapGetters('batchCreate', [
      'getDirectories',
      'getModel',
      'getSelected',
    ]),
    resourceItems() {
      if (this.selected.length !== 0) {
        let arr = [];
        for (let i = 0; i < this.selected.length; i += 1) {
          const files = this.getDirectories[this.selected[i].fullName].files;
          for (let j = 0; j < files.length; j += 1) {
            const locPath = this.selected[i].fullName + files[j].name;
            arr.push({
              hasTitle: files[j].name,
              collectionName: this.selected[i].hasTitle,
              hasIdentifier: locPath,
            });
          }
        }
        // Remove duplicates by identifier
        arr = arr.filter((quad, index, self) =>
          index === self.findIndex(a => a.hasIdentifier === quad.hasIdentifier),
        );
        return arr;
      }
      return this.getObjectsBySubjects(this.getQuadsByType('Resource').map(a => a.subject.id));
    },
    objectsInStore() {
      this.$info('getCollectionTitles()');
      const collQuads = this.getAllCollections();
      const arr = [];
      for (let i = 0; i < collQuads.length; i += 1) {
        arr.push({
          hasTitle: this.getQuads({
            subject: collQuads[i].subject.id,
            predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitle',
          })[0].object.id.slice(1, -1),
          id: collQuads[i].subject.id,
        });
      }
      return arr;
    },
  },
  mounted() {
    this.directories = this.getDirectories;
    this.model = this.getModel;
    this.selected = this.getSelected || [];

    this.fetchSchemas(['collection', 'resource']);
  },
};
</script>

<style lang="css">
</style>
