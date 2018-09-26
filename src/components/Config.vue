<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <h1>Edit Config</h1>
    <p>
      Upon made changes, a save-button will appear, which saves you changes to you local config.<br>
      Please be mindfull on changing endpoints, you might break the application!
    </p>
    <v-textarea
      v-model="config"
      auto-grow
      box
    >
    </v-textarea>
    <v-fab-transition>
      <v-btn
        fixed
        bottom
        v-show="config !== oldConfig"
        right
        color="primary"
        fab
        @click="setApis(JSON.parse(config)); oldConfig = config;">
        <v-icon>save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      config: '',
      oldConfig: '',
    };
  },
  methods: {
    ...mapMutations('config', [
      'setApis',
    ]),
  },
  mounted() {
    this.config = JSON.stringify(this.$store.state.config.apis, null, 4);
    this.oldConfig = this.config;
  },
};
</script>

<style lang="css">
</style>
