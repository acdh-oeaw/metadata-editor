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
        item-key="name"
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
              {{ props.item.name }}
              <v-icon v-if="!props.expanded">expand_more</v-icon>
              <v-icon v-else>expand_less</v-icon>
            </td>
            <td>
              <v-Autocomplete
              :items="items.dirs"
              v-model="props.item.partOf"
              :hint="props.item.partOf"
              label="collection"
              item-text="dir"
              item-value="val"
              @change="changeSelected(props.item.partOf)"
            ></v-Autocomplete>
            </td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-data-table
            hide-headers
            :items="filteredNamesMethod(props.item.name)"
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
      <v-btn :disabled="selected.length === 0" @click="getSelected" color="secondary">Submit Selected</v-btn>
      <v-btn :disabled="model.length === 0" @click="getModel" color="primary">Submit All</v-btn>
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
import fundamentcard from './Fundament/FundamentCard';

export default {
  data() {
    return {
      items: {
        names: [],
        dirs: [],
      },
      dir: '',
      name: '',
      snackbar: false,
      model: [],
      search: '',
      selected: [],
      headers: [
        { text: 'Collection', value: 'col' },
        { text: 'Is part of', value: 'partOf' },
      ],
    };
  },
  components: {
    fundamentcard,
  },
  methods: {
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
        this.items = {
          names: [],
          dirs: [],
        };
        this.model = [];
        for (let i = 0; i < arr.length; i += 1) {
          if (!this.items.dirs.some(x => x.val === arr[i].directory)) {
            this.items.dirs.push({
              dir: this.getLastDir(arr[i].directory),
              val: arr[i].directory,
            });
            this.model.push({ name: arr[i].directory, partOf: '' });
          }
          this.items.names.push({ name: arr[i].filename, val: arr[i].name });
        }
        this.$log('items', this.items);
      };
      reader.readAsText(file);
    },
    getLastDir(dir) {
      // Returns the second to last if the last is empty
      return dir.split('/').slice(-1)[0] || dir.split('/').slice(-2)[0];
    },
    getModel() {
      this.$log(this.model);
    },
    getSelected() {
      this.$log(this.selected);
    },
    changeSelected(val) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.model[this.model.findIndex(x => x.name === this.selected[i].name)].partOf = val;
      }
    },
    filteredNamesMethod(dir) {
      if (dir) return this.items.names.filter(x => x.val.indexOf(dir) >= 0);
      return this.items.names;
    },
  },
  computed: {
    filteredNames() {
      if (this.dir) return this.items.names.filter(x => x.val.indexOf(this.dir) >= 0);
      return this.items.names;
    },
  },
};
</script>

<style lang="css">
</style>
