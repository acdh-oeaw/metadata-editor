<template>
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
    <b-alert variant="success" show v-if="$store.state.n3.stored">All Stored</b-alert>
    <b-alert variant="danger" show v-if="!$store.state.n3.stored">Quota Exceeded</b-alert>
    <div class="bd-toc-item">
      <b-button-group vertical>
        <b-button  @click="downloadBlob" variant="primary">Download</b-button>
        <b-button  disabled variant="light"></b-button>
        <b-button  v-b-modal="'clearCacheModal'" variant="danger">Clear Store</b-button>
      </b-button-group>
    </div>
  </nav>
</template>

<script>

import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  components: {
  },
  data() {
    return {
      blob: '',
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
  },
};
</script>

<style scoped>
</style>
