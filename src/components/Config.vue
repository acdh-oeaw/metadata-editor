<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <h1>Edit Config</h1>
    <p>
      Upon made changes, a save-button will appear, which saves you changes to you local config.<br>
      Please be mindful on changing endpoints, you might break the application!
    </p>
      <v-flex xs12>
        <input type="file" @change="onFileChange">
      </v-flex>
    <v-textarea
      v-model="config"
      auto-grow
      box
    >
    </v-textarea>
    <v-speed-dial
      v-model="fab"
      bottom
      fixed
      right
      direction="top"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        fab
      >
        <v-icon>menu</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn
        color="primary"
        fab
        @click="resetButton">
        <v-icon>restore</v-icon>
      </v-btn>
      <v-btn
        :disabled="config !== oldConfig"
        color="primary"
        fab
        @click="downloadBlob(config, 'config.json')">
        <v-icon>get_app</v-icon>
      </v-btn>
      <v-btn
        :disabled="config === oldConfig"
        color="primary"
        fab
        @click="setApis(JSON.parse(config)); oldConfig = config;">
        <v-icon>save</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      config: '',
      oldConfig: '',
      fab: false,
    };
  },
  methods: {
    ...mapMutations('config', [
      'setApis',
      'resetToDefault',
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
        this.config = e.target.result;
        this.setApis(JSON.parse(e.target.result));
        this.oldConfig = this.config;
      };
      reader.readAsText(file);
    },
    resetButton() {
      this.resetToDefault();
      this.config = JSON.stringify(this.$store.state.config.apis, null, 4);
      this.oldConfig = this.config;
    },
  },
  mounted() {
    this.config = JSON.stringify(this.$store.state.config.apis, null, 4);
    this.oldConfig = this.config;
  },
};
</script>

<style lang="css">
</style>
