<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <v-textarea
      :value="config"
      auto-grow
      @input="hidden = false"
    >
    </v-textarea>
    <v-fab-transition>
      <v-btn
        fixed
        top
        v-show="!hidden"
        right
        color="primary"
        fab
        @click="setApis(JSON.parse(config)); hidden = true">
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
      hidden: true,
      config: '',
    };
  },
  methods: {
    ...mapMutations('config', [
      'setApis',
    ]),
  },
  mounted() {
    this.config = JSON.stringify(this.$store.state.config.apis, null, 4);
  },
};
</script>

<style lang="css">
</style>
