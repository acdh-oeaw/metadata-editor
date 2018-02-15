<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            <nav class="collapse bd-links" id="bd-docs-nav">
              <div class="bd-toc-item">
                <a class="bd-toc-link" href="#">Load Schema</a>
              </div>
              <div class="bd-toc-item" v-if="this.getOntology">
                <button @click="">Unload Schema</button>
              </div>
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
            <div v-if="!this.getOntology" >
              <h1>Load Schema from Disk</h1>
              <p>Load an existing Schema File</p>
            </div>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import HELPERS from '../helpers';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
  },
  data() {
    return {
    };
  },
  methods: {
    ...mapActions('jowl', [
      'setOntology',
      'fetchClasses',
      'fetchSubClassOf',
      'fetchPropertiesByURI',
    ]),
  },
  computed: {
    ...mapGetters('jowl', [
      'getQuery',
    ]),
    getOntology() {
      return this.$store.state.jowl.ontology;
    },
  },
  created() {
    this.fetchClasses({ q: 'classes' }).then((res) => {
      let idx = res.length - 1;
      while (idx + 1) {
        this.fetchPropertiesByURI({ q: res[idx]['?x'].name, uri: res[idx]['?x'].URI });
        idx -= 1;
      }
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
