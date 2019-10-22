<template>
  <v-container grid-list-md class="mt-4">
    <v-tabs icons-and-text centered>
      <v-tab key="fileload">
        Load from File
        <v-icon>insert_drive_file</v-icon>
      </v-tab>
      <v-tab v-if="false" key="storeload">
        Load via SPARQL
        <v-icon>share</v-icon>
      </v-tab>
      <v-tab key="batchcreate">
        Batch Create
        <v-icon>content_copy</v-icon>
      </v-tab>
      <v-tab key="viewtree">
        View Item Tree
        <v-icon>format_indent_increase</v-icon>
      </v-tab>
      <v-tab-item key="fileload">
        <loadfile></loadfile>
      </v-tab-item>
      <v-tab-item v-if="false" key="storeload">
        <v-flex xs12 class="mt-2">
            [SPARQL query / loader goes here]
        </v-flex>
      </v-tab-item>
      <v-tab-item key="batchcreate">
        <batchcreate></batchcreate>
      </v-tab-item>
      <v-tab-item key="viewtree">
        <fundamentcard caption="View items in store">
          <storetree></storetree>
        </fundamentcard>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import loadfile from './Store_LoadFile';
import storetree from './Store_Storetree';
import batchcreate from './Store_BatchCreate';
import fundamentcard from './Fundament/FundamentCard';

import HELPERS from '../helpers';

export default {


  mixins: [HELPERS],
  components: {
    loadfile,
    storetree,
    batchcreate,
    fundamentcard,
  },
  data() {
    return {
      file: '',
      res: [], // complete collection-Query
      collections: [], // only names of Collections
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
