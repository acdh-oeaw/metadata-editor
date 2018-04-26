<template>
  <div >
    <div v-if="!file" >
      <h1>Load File from Disk</h1>
      <p>Load and Edit an existing ttl File</p>
      <div v-if="!file">
        <h2>Select a File</h2>
        <input type="file" @change="onFileChange">
      </div>
    </div>
    <div v-if="file" >
      <h1>Edit Loaded File</h1>
      <div v-for="entity in file">
        <FundamentEntity v-if='entity.type == "acdh:Person;"' :uri='entity["acdh:hasIdentifier"][0]' type='PERSONS'></FundamentEntity>
        <FundamentEntity v-if='entity.type == "acdh:Organisation;"' :uri='entity["acdh:hasIdentifier"][0]' type='ORGANISATIONS'></FundamentEntity>
        <p v-if='entity.type != "acdh:Person;" && entity.type != "acdh:Organisation;"'>{{ entity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

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
  computed: {
    ...mapGetters('n3', [
      'tripleCount',
    ]),
  },
  methods: {
    ...mapActions('n3', [
      'StringToStore',
    ]),
    ...mapMutations('app', [
      'toggleMode',
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
        this.StringToStore(e.target.result);
        this.toggleMode();
      };
      reader.readAsText(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
