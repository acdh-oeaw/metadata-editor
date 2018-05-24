<template>
  <div style="height: 50%;overflow: auto;">
    <nav class="collapse bd-links" id="bd-docs-nav">
      <div class="bd-toc-item">
        <a class="bd-toc-link" href="#">Store Stats</a>
      </div>
      <div class="bd-toc-item">
        {{ $store.state.n3.tripleCount }} Triples
      </div>
      <div class="bd-toc-item">
        {{ Object.keys($store.state.n3.subjects).length }} Subjects
      </div>
      <div class="bd-toc-item">
        {{ $store.state.localStorageInfo.currentStoreLength }} Current Store Length
      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ $store.state.localStorageInfo.localStorageLimit }} Chars Storage Capacity
<<<<<<< HEAD
        <v-progress-linear :value="$store.state.localStorageInfo.currentStoreLength/$store.state.localStorageInfo.localStorageLimit*100"></v-progress-linear>
=======
        <b-progress :value="$store.state.localStorageInfo.currentStoreLength/$store.state.localStorageInfo.localStorageLimit" :max="1"></b-progress>
>>>>>>> remotes/vuetify/master
      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ (""+($store.state.localStorageInfo.currentStoreLength *100/ $store.state.localStorageInfo.localStorageLimit)).substring(0,4) }}% Capacity used
      </div>
      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
      Space for ~{{ Math.floor(($store.state.localStorageInfo.localStorageLimit - $store.state.localStorageInfo.currentStoreLength)
      *($store.state.n3.tripleCount/$store.state.localStorageInfo.currentStoreLength) ) }} Triples left.
      </div>
<<<<<<< HEAD
      <v-alert color="success" show v-if="$store.state.n3.stored">All Stored</v-alert>
      <v-alert color="error" show v-if="!$store.state.n3.stored">Quota Exceeded</v-alert>
=======
      <b-alert variant="success" show v-if="$store.state.n3.stored">All Stored</b-alert>
      <b-alert variant="danger" show v-if="!$store.state.n3.stored">
        <h5>Quota Exceeded!</h5>
        <p>To save your work, make sure to download it by clicking the button below before closing or reloading this page</p>
      </b-alert>
>>>>>>> remotes/vuetify/master
      <div class="bd-toc-item">
        <div>
          <v-btn block @click="downloadBlob" color="primary">Download</v-btn>
        </div>
        <div>
          <v-btn block @click.stop="dialog = true" color="error">Clear Store</v-btn>
          <clear-cache-dialog :dialog.sync="dialog"></clear-cache-dialog>
        </div>
        <div>
          <v-btn block @click="testLimit()">testStoreLimit</v-btn>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import HELPERS from '../helpers';
import ClearCacheDialog from './Dialogs/ClearCacheDialog';

export default {
  mixins: [HELPERS],
  components: {
    ClearCacheDialog,
  },
  data() {
    return {
      blob: '',
      dialog: false,
    };
  },
  methods: {
    downloadBlob() {
      this.blob = (window.URL || window.webkitURL)
        .createObjectURL(this.stringToBlob(this.$store.state.n3.ttlString));

      const downloadLink = document.createElement('A');
      downloadLink.setAttribute('href', this.blob);
      downloadLink.setAttribute('download', 'store.ttl');
      downloadLink.setAttribute('v-show', 'false');

      document.body.appendChild(downloadLink);

      downloadLink.click();
    },
    ...mapActions('localStorageInfo', [
      'safeLimitTest',
      'testLimit',
    ]),
  },
};
</script>

<style scoped>
  .bd-links {
    margin: 15px;
  }
  .bd-toc-item {
    margin: auto;
    width: 60%;
  }
</style>
