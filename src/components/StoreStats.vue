<template>
  <div style="overflow: auto;">
    <nav class="collapse bd-links" id="bd-docs-nav">
      <div class="bd-toc-item">
        <h2>Store Stats</h2>
      </div>
      <div class="bd-toc-item">
        {{ getCount.quads }} Quads
      </div>
      <div class="bd-toc-item">
        {{ getCount.subjects }} Subjects
      </div>
      <div class="bd-toc-item">
        {{ $store.state.localStorageInfo.currentStoreLength }} Current Store Length
      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ $store.state.localStorageInfo.localStorageLimit }} Chars Storage Capacity
        <v-progress-linear :value="$store.state.localStorageInfo.currentStoreLength/$store.state.localStorageInfo.localStorageLimit*100"></v-progress-linear>

      </div>

      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
        {{ (""+($store.state.localStorageInfo.currentStoreLength *100/ $store.state.localStorageInfo.localStorageLimit)).substring(0,4) }}% Capacity used
      </div>
      <div class="bd-toc-item" v-if="$store.state.localStorageInfo.localStorageLimit">
      Space for ~{{ Math.floor(($store.state.localStorageInfo.localStorageLimit - $store.state.localStorageInfo.currentStoreLength)
      *(getCount.quads/$store.state.localStorageInfo.currentStoreLength) ) }} Quads left.
      </div>
      <v-alert color="success" show v-if="$store.state.n3.stored">All Stored</v-alert>
      <v-alert color="error" show v-if="!$store.state.n3.stored">Quota Exceeded</v-alert>
      <div class="bd-toc-item">
        <div>
          <v-btn block @click="downloadBlob($store.state.n3.ttlString, 'store.ttl')" color="primary">Download</v-btn>
        </div>
        <div>
          <v-btn block @click.stop="openDialog('clearcachedialog')" color="error">Clear Store</v-btn>
        </div>
        <div>
          <v-btn block @click="testLimit()">testStoreLimit</v-btn>
        </div>
      </div>
      <v-expansion-panel popout>
        <v-expansion-panel-content @click.native="getRoot()">
          <div slot="header"><v-icon large color='teal lighten-3'>build</v-icon>Unsaved edits</div>
          <v-card>
            <v-flex v-if="item && item.subject" xs12 v-for="(item, i) in items" :key="i">
              <item @input="$emit('input', passThroughItem)" :uri="item.subject" :itemFull="item"></item>
            </v-flex>
            <div v-if="this.$store.state.JSONschema.unsaved">
                <v-btn @click="saveAllSubjectChanges()" color="success">save all</v-btn>

                <v-btn @click="deleteAllEdits()" color="error">Discard All</v-btn>
            </div>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import HELPERS from '../helpers';
import ClearCacheDialog from './Dialogs/ClearCacheDialog';
import item from './Store_Storetreeitem';

export default {
  mixins: [HELPERS],
  components: {
    ClearCacheDialog,
    item,
  },
  data() {
    return {
      blob: '',
      dialog: false,
      passThroughItem: {},
      items: [],
    };
  },
  watch: {
    getUnsavedChanges(oldV, newV) {
      this.$info(oldV, newV);
      this.getRoot();
    },
  },
  methods: {
    getRoot() {
      this.items = [];
      const keys = Object.keys(this.$store.state.JSONschema.unsaved);
      this.$log('keys', keys);
      for (let i = 0; i < keys.length; i += 1) {
        this.items[i] = this.getQuads({ subject: keys[i], predicate: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type' })[0];
        this.$log('item: ', this.items[i]);
      }
    },
    saveAll() {

    },
    ...mapMutations('dialogs', [
      'openDialog',
      'closeDialog',
      'switchDialog',
    ]),
    ...mapActions('localStorageInfo', [
      'safeLimitTest',
      'testLimit',
    ]),
    ...mapActions('n3', [
      'RemoveSubject',
      'ObjectToStore',
    ]),
    ...mapMutations('JSONschema', [
      'deleteAllEdits',
      'deleteEdit',
    ]),
  },
  computed: {
    ...mapGetters('n3', [
      'getCount',
      'getQuads',
    ]),
    ...mapGetters('JSONschema', [
      'getUnsavedChanges',
      'getUnsaved',
      'getSchema',
    ]),
  },
};
</script>

<style scoped>
  .bd-links {
    margin: 15px;
  }
  .bd-toc-item {
    margin: auto;
    width: 60%;
  }
</style>
