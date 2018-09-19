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
            :items="items.dirs"
            v-model="dir"
            label="Directory"
            item-text="dir"
            item-value="val"
            :hint="dir"
            persistent-hint
          ></v-autocomplete>
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
    [API / File loader + Mapper goes here]
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
        for (let i = 0; i < arr.length; i += 1) {
          this.items.dirs.push({ dir: this.getLastDir(arr[i].directory), val: arr[i].directory });
          this.items.names.push({ name: this.getLastDir(arr[i].name), val: arr[i].name });
        }
        this.$log('items', this.items);
        this.$forceUpdate();
      };
      reader.readAsText(file);
    },
    getLastDir(dir) {
      // Returns the second to last if the last is empty
      return dir.split('/').slice(-1)[0] || dir.split('/').slice(-2)[0];
    },
  },
  computed: {
    filteredNames() {
      if (this.dir) {
        return this.items.names.filter(x => x.val.indexOf(this.dir) >= 0);
      }
      return this.items.names;
    },
  },
};
</script>

<style lang="css">
</style>
