<template>
  <v-container grid-list-md class="mt-4">
    <v-tabs icons-and-text centered>
      <v-tab key="fileload">
        Load from File
        <v-icon>insert_drive_file</v-icon>
      </v-tab>
      <v-tab key="storeload">
        Load from Database
        <v-icon>storage</v-icon>
      </v-tab>
      <v-tab key="viewtree">
        View Item Tree
        <v-icon>storage</v-icon>
      </v-tab>
        <v-tab-item key="fileload">
          <v-flex xs12>
              <loadfile></loadfile>
          </v-flex>
        </v-tab-item>
        <v-tab-item key="storeload">
          <v-flex xs12>
              [SPARQL query / loader goes here]
          </v-flex>
        </v-tab-item>
        <v-tab-item key="viewtree">
          <v-flex xs12>
            <storetree></storetree>
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
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
