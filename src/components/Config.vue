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
      <v-tooltip left>
        <v-btn
          slot="activator"
          color="primary"
          fab
          @click="resetButton">
          <v-icon>restore</v-icon>
        </v-btn>
        <span>Reset to Default</span>
      </v-tooltip>
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
        @click="saveButton">
        <v-icon>save</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarText }}
      <v-btn flat color="primary" @click.native="snackbar = false; resetButton()">Reset to default</v-btn>
      <v-btn flat color="primary" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
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
      snackbarText: '',
      snackbar: false,
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
      else {
        this.snackbarText = 'You need to upload a JSON file!';
        this.snackbar = true;
      }
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
    saveButton() {
      if (this.isJsonString(this.config)) {
        if (JSON.parse(this.config).ARCHE2 && JSON.parse(this.config).ARCHE) {
          this.setApis(JSON.parse(this.config));
          this.oldConfig = this.config;
        } else {
          this.snackbarText = 'Your config is missing essential ARCHE keys!';
          this.snackbar = true;
        }
      } else {
        this.snackbarText = 'Your config is not a valid JSON file!';
        this.snackbar = true;
      }
    },
    isJsonString(str) {
      try {
        JSON.parse(str);
      } catch (e) {
        return false;
      }
      return true;
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
