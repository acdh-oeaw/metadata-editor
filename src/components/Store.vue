<template>
  <v-container grid-list-md class="mt-4">
    <v-tabs fixed-tabs icons-and-text centered>
      <v-tab href="#fileload">
        Load from File
        <v-icon>insert_drive_file</v-icon>
      </v-tab>
      <v-tab href="#storeload">
        Load from Store
        <v-icon>storage</v-icon>
      </v-tab>
      <v-tab href="#viewtree">
        View Item Tree
        <v-icon>storage</v-icon>
      </v-tab>
    </v-tabs>
    <v-layout justify-space-around row wrap>
      <v-flex xs12>
          <loadfile></loadfile>
      </v-flex>
      <v-flex xs12>
          <loadfile></loadfile>
      </v-flex>
      <v-flex xs12>
          <loadfile></loadfile>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import loadfile from './Store_LoadFile';

import HELPERS from '../helpers';

export default {


  mixins: [HELPERS],
  components: {
    loadfile,
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
