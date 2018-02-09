<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            <nav class="collapse bd-links" id="bd-docs-nav">
              <div class="bd-toc-item active">
                <a class="bd-toc-link" href="#">Load File</a>
              </div>
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
            <h1>Load File from Disk</h1>
            <p>Load and Edit an existing ttl File</p>
            <div v-if="!file">
              <h2>Select a File</h2>
              <input type="file" @change="onFileChange">
            </div>
            <div v-else>
              <button @click="removeTtl">Remove File</button>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import Fundamententity from './Fundamententity';
import Autocomparche from './Autocomparche';
import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */

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
  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.loadTtl(files[0]);
    },
    loadTtl(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.parseFromTtl(e.target.result);
      };
      reader.readAsText(file);
    },
    removeTtl(e) {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
