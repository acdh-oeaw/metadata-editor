<template>
    <div style="display: flex; flex-direction: row;">
      <main class="grid-col" v-bind:class="{ appmode: $store.state.app.toolbar }" role="main">
        <div class="container">
          <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
            <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
              <b-tabs>
                <b-tab title="Load File" active>
                  <br>
                  <Load></Load>
                </b-tab>
                <b-tab title="Entities" :disabled="$store.state.n3.subjects.length <= 0">
                  <Storetree></Storetree>
                  <br>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </main>
      <div >
        <transition :duration="200" name="slideRight" mode="out-in">
          <FundamentToolBar v-if="$store.state.app.toolbar"></FundamentToolBar>
        </transition>
      </div>
    </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex';

// import Load from './Load';
// import Storetree from './StoreTree';
// import FundamentToolBar from './FundamentToolBar';
import HELPERS from '../helpers';
/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  mixins: [HELPERS],
  components: {
    // Load,
    // Storetree,
    // FundamentToolBar,
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
  .grid-col {
    width: 100%;
  }
  .appmode {
    width: calc(100% - 300px)!important;
  }
</style>
