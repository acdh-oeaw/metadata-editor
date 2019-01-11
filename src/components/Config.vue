<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <h1>Edit Config</h1>
    <p>
      Upon made changes, a save-button will appear, which saves you changes to you local config.<br>
      Please be mindful on changing endpoints, you might break the application!
    </p>
    <p>
      <v-select
          v-model="select"
          :items="items"
          label="Select something you want to configure!"
          item-text="name"
          item-value="json"
          @change="config = select.json; oldConfig = config"
          return-object
        >
      </v-select>
    </p>
    <v-flex xs12>
      <input type="file" @change="onFileChange">
    </v-flex>
    <v-textarea
      v-model="config"
      auto-grow
      box
      :readonly="this.select.name !== 'config'"
    >
    </v-textarea>
    <v-divider inset></v-divider>

    <v-switch
      label="Ask before deleting subjects"
      v-model="deletePrompt"
    ></v-switch>
    <v-switch
      label="Show if you're connected to Arche"
      v-model="networkPrompt"
    ></v-switch>

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
      <v-tooltip left>
      <v-btn
        :disabled="config !== oldConfig"
        slot="activator"
        color="primary"
        fab
        @click="downloadBlob(config, `${select.name}.json`)">
        <v-icon>get_app</v-icon>
      </v-btn>
      <span>{{ config === oldConfig? 'Download the saved Config' : 'Please save your Config before downloading it.' }} </span>
    </v-tooltip>
    <v-tooltip left>
      <v-btn
        :disabled="config === oldConfig"
        color="primary"
        slot="activator"
        fab
        @click="saveButton">
        <v-icon>save</v-icon>
      </v-btn>
      <span>{{ config !== oldConfig? 'Save changes to the Config' : 'Save Changes, active after changes are detected.' }}</span>
    </v-tooltip>
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
      select: { name: 'config', json: JSON.stringify(this.$store.state.config.apis, null, 4) },
    };
  },
  methods: {
    ...mapMutations('config', [
      'setApis',
      'resetToDefault',
    ]),
    ...mapMutations('JSONschema', [
      'setSchema',
    ]),
    ...mapMutations('dialogs', [
      'toggleNetworkPrompt',
      'toggleDeletePrompt',
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
        if (this.select.name === 'config') this.setApis(JSON.parse(e.target.result));
        else this.setSchema({ name: this.select.name, schema: JSON.parse(e.target.result) });
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
        if (this.select.name === 'config') {
          if ((JSON.parse(this.config).ARCHE2 && JSON.parse(this.config).ARCHE)) {
            this.setApis(JSON.parse(this.config));
            this.oldConfig = this.config;
          } else {
            this.snackbarText = 'Your config is missing essential ARCHE keys!';
            this.snackbar = true;
          }
        } else {
          this.setSchema({ name: this.select.name, schema: JSON.parse(this.config) });
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
  computed: {
    items() {
      const arr = [
        {
          name: 'config',
          json: JSON.stringify(this.$store.state.config.apis, null, 4),
        },
      ];
      const schemas = Object.keys(this.$store.state.JSONschema.schemas);
      for (let i = 0; i < schemas.length; i += 1) {
        arr.push({
          name: schemas[i],
          json: JSON.stringify(
            this.$store.state.JSONschema.schemas[schemas[i]],
            null,
            4,
          ),
        });
      }
      return arr;
    },
    networkPrompt: {
      get() {
        return this.$store.state.dialogs.networkPrompt;
      },
      set(val) {
        this.toggleNetworkPrompt(val);
      }
    },
    deletePrompt: {
      get() {
        return this.$store.state.dialogs.deletePrompt;
      },
      set(val) {
        this.toggleDeletePrompt(val);
      }
    },
  },
  mounted() {
    this.config = JSON.stringify(this.$store.state.config.apis, null, 4);
    this.oldConfig = this.config;
    this.fab = true;
  },
};
</script>

<style lang="css">
</style>
