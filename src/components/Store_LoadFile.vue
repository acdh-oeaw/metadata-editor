<template>
  <fundamentcard
      caption="Load ttl from disk"
      >
      <div >
        <p>Load Data from a file. See available file types and data formats in the documentation</p>
        <p>[TEST FOR LOCALSTORAGE AND SOME STORE STATS SHOULD GO HERE]</p>
        <p>.</p>        
        <input type="file" @change="onFileChange">
      </div>
    </fundamentcard>
</template>

<script>
import { mapActions } from 'vuex';
import fundamentcard from './Fundament/FundamentCard';

import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  data() {
    return {
      file: '',
    };
  },
  name: 'load',
  components: {
    fundamentcard,
  },
  computed: {
  },
  methods: {
    ...mapActions('n3', [
      'StringToStore',
    ]),
    ...mapActions('app', [
      'toggleAppMode',
    ]),
    onFileChange(e) {
      this.$info('Load', 'onFileChange(e)', e);
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.loadTtl(files[0]);
    },
    loadTtl(file) {
      this.$info('Load', 'loadTtl(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.StringToStore(e.target.result).then(this.toggleAppMode());
      };
      reader.readAsText(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
