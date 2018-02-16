<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            <nav class="collapse bd-links" id="bd-docs-nav">
              <div class="bd-toc-item">
                <a class="bd-toc-link" href="#">Load File</a>
              </div>
              <div class="bd-toc-item">
                {{ $store.state.n3.tripleCount }}
              </div>
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
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
        </div>
      </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Fundamententity from './Fundamententity';
import Autocomparche from './Autocomparche';
import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
    Fundamententity,
    Autocomparche,
  },
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
    removeTtl(e) {
      this.file = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
