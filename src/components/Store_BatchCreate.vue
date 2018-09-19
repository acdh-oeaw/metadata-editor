<<<<<<< HEAD
<template lang="html">
  <fundamentcard
    caption="Create batch from file"
    >
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs4>
          <input type="file" @change="onFileChange">
        </v-flex>
        <v-flex xs8>
          <v-autocomplete
            :items="filteredNames"
            v-model="name"
            label="Name"
            item-text="name"
            item-value="val"
            :hint="name"
            persistent-hint
          ></v-autocomplete>
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
            <td>{{ props.item.name }}</td>
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
      </v-data-table>
    </v-flex>
    <v-btn @click="getModel" color="primary">Submit</v-btn>
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
          this.items.names.push({ name: this.getLastDir(arr[i].name), val: arr[i].name });
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
      this.$log(this.model, this.selected);
    },
    changeSelected(val) {
      for (let i = 0; i < this.selected.length; i += 1) {
        this.model[this.model.findIndex(x => x.name === this.selected[i].name)].partOf = val;
      }
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
=======
>>>>>>> 87c8e29a0dc2f358bba1c1bdef544aea8679d061
