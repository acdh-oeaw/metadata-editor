<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
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
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
            <b-tabs>
              <b-tab title="Load File" active>
                <br>
                <Load></Load>
              </b-tab>
              <b-tab title="Entities" :disabled="$store.state.n3.subjects.length <= 0">
                <Entities></Entities>
                <br>
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import Load from './Load';
import Entities from './Entities';
import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
    Load,
    Entities,
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
      this.$info('Store', 'onFileChange(e)', e);
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.loadTtl(files[0]);
    },
    loadTtl(file) {
      this.$info('Store', 'loadTtl(file)', file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.StringToStore(e.target.result);
        // this.file = this.parseFromTtl(e.target.result);
      };
      reader.readAsText(file);
    },
    removeTtl(e) {
      this.$info('Store', 'removeTtl(e)', e);
      this.file = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
