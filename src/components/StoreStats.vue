<template>
  <div style="height: 50%;overflow: auto;">
    <nav class="collapse bd-links" id="bd-docs-nav">
      <div class="bd-toc-item">
        <a class="bd-toc-link" href="#">Store Stats</a>
      </div>
      <div class="bd-toc-item">
        {{ getCount }} Triples
      </div>
      <div class="bd-toc-item">
        {{ Object.keys($store.state.n3.subjects).length }} Subjects
      </div>
      <div class="bd-toc-item">
        {{ $store.state.localStorageInfo.currentStoreLength }} Current Store Length
      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ $store.state.localStorageInfo.localStorageLimit }} Chars Storage Capacity
        <v-progress-linear :value="$store.state.localStorageInfo.currentStoreLength/$store.state.localStorageInfo.localStorageLimit*100"></v-progress-linear>

      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ (""+($store.state.localStorageInfo.currentStoreLength *100/ $store.state.localStorageInfo.localStorageLimit)).substring(0,4) }}% Capacity used
      </div>
      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
      Space for ~{{ Math.floor(($store.state.localStorageInfo.localStorageLimit - $store.state.localStorageInfo.currentStoreLength)
      *(getCount/$store.state.localStorageInfo.currentStoreLength) ) }} Triples left.
      </div>
      <v-alert color="success" show v-if="$store.state.n3.stored">All Stored</v-alert>
      <v-alert color="error" show v-if="!$store.state.n3.stored">Quota Exceeded</v-alert>
      <div class="bd-toc-item">
        <div>
          <v-btn block @click="downloadBlob" color="primary">Download</v-btn>
        </div>
        <div>
          <v-btn block @click.stop="openDialog('clearcachedialog')" color="error">Clear Store</v-btn>
        </div>
        <div>
          <v-btn block @click="testLimit()">testStoreLimit</v-btn>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
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
    ...mapMutations('dialogs', [
      'openDialog',
      'closeDialog',
      'switchDialog',
    ]),
    ...mapActions('localStorageInfo', [
      'safeLimitTest',
      'testLimit',
    ]),
  },
  computed: {
    ...mapGetters('n3', [
      'getCount',
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
