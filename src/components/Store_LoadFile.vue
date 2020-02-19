<template>
  <fundament-card
      caption="Load ttl from disk"
      >
      <div >
        <p>Load Data from a file.</p>
        <p>
          <v-divider></v-divider>
        </p>
        <p>
          <v-file-input label="File input" @change="onFileChange"></v-file-input>
        </p>
        <p>
          <v-divider></v-divider>
        </p>
        <p>
          <v-btn class="text-right" @click="testLimit()">testStoreLimit</v-btn>
        </p>
        <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
          {{ $store.state.localStorageInfo.localStorageLimit }} Chars Storage Capacity
          <v-progress-linear :value="$store.state.localStorageInfo.currentStoreLength/$store.state.localStorageInfo.localStorageLimit*100"></v-progress-linear>
        </div>
        <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
          {{ (""+($store.state.localStorageInfo.currentStoreLength *100/ $store.state.localStorageInfo.localStorageLimit)).substring(0,4) }}% Capacity used
        </div>
      </div>
    </fundament-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import FileSizeDialog from './Dialogs/FileSizeDialog';

import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint-disable max-len */
export default {
  mixins: [HELPERS],
  data() {
    return {
      file: '',
      sizeDialog: false,
      result: '',
    };
  },
  name: 'load',
  components: {
    FileSizeDialog,
  },
  computed: {
  },
  methods: {
    ...mapActions('localStorageInfo', [
      'safeLimitTest',
      'testLimit',
    ]),
    ...mapActions('n3', [
      'StringToStore',
    ]),
    ...mapMutations('app', [
      'openRightDrawer',
    ]),
    ...mapMutations('dialogs', [
      'setDialog',
      'closeDialog',
    ]),
    onFileChange(e) {
      this.$info('Load', 'onFileChange(e)', e);
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      if (files[0].name.split('.')[1] === 'ttl') this.loadTtl(files[0]);
      else this.loadXML(files[0]);
    },
    loadTtl(file) {
      this.$info('Load', 'loadTtl(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.result = e.target.result;
        if (e.target.result.length > (this.$store.state.localStorageInfo.localStorageLimit || 5200000) - (this.$store.state.localStorageInfo.currentStoreLength || 0)) { // this.sizeDialog = true
          this.setDialog({
            name: 'filesizedialog',
            obj: {
              status: true,
              result: this.result,
            },
          });
        } else {
          this.StringToStore(e.target.result).then(this.openRightDrawer());
        }
      };
      reader.readAsText(file);
    },
    loadXML(file) {
      this.$info('Load', 'loadXML(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.convertRDF(e.target.result).then((res) => {
          this.StringToStore(res).then(this.openRightDrawer());
          // this.StringToStore().then(this.openRightDrawer());
        });
      };
      reader.readAsText(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
