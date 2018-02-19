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
        <Fundamententity v-if='entity.type == "acdh:Person;"' :uri='entity["acdh:hasIdentifier"][0]' type='PERSONS'></Fundamententity>
        <Fundamententity v-if='entity.type == "acdh:Organisation;"' :uri='entity["acdh:hasIdentifier"][0]' type='ORGANISATIONS'></Fundamententity>
        <p v-if='entity.type != "acdh:Person;" && entity.type != "acdh:Organisation;"'>{{ entity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

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
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.loadTtl(files[0]);
    },
    loadTtl(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.StringToStore(e.target.result);
        // this.file = this.parseFromTtl(e.target.result);
      };
      reader.readAsText(file);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
