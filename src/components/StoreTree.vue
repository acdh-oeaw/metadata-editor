<template>
  <div style="height:50%; overflow: auto;">
    
  </div>
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
  .bd-links {
    margin: 15px;
  }
</style>
