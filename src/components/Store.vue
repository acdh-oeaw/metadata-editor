<template>
  <v-container grid-list-md class="mt-4">
    <v-tabs icons-and-text centered>
      <v-tab key="fileload">
        Load from File
        <v-icon>insert_drive_file</v-icon>
      </v-tab>
      <v-tab key="storeload">
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
        <v-flex xs12 class="mt-2">
            <loadfile></loadfile>
        </v-flex>
      </v-tab-item>
      <v-tab-item key="storeload">
        <v-flex xs12 class="mt-2">
            [SPARQL query / loader goes here]
        </v-flex>
      </v-tab-item>
      <v-tab-item key="batchcreate">
        <v-flex xs12 class="mt-2">
            [API / File loader + Mapper goes here]
        </v-flex>
      </v-tab-item>
      <v-tab-item key="viewtree">
        <v-flex xs12 class="mt-2">
          <div>
            <select class="" name="">

            </select>
            <storetree selectRootManually="true"></storetree>
          </div>
        </v-flex>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script>
import loadfile from './Store_LoadFile';
import storetree from './Store_Storetree';

import HELPERS from '../helpers';

export default {


  mixins: [HELPERS],
  components: {
    loadfile,
    storetree,
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
