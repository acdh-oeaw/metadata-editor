<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <v-textarea
      v-model="config"
      auto-grow
      @change="hidden = false"
    >
    </v-textarea>
    <v-fab-transition>
      <v-btn
        fixed
        right
        color="primary"
        fab
        @click="hidden = true">
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
    };
  },
  computed: {
    config: {
      get: function() {
        return JSON.stringify(this.$store.state.config.apis, null, 4);
      },
      set: function (newValue) {
        this.setApis(JSON.parse(newValue));
      },
    },
  },
  methods: {
    ...mapMutations('config', [
      'setApis',
    ]),
  },
};
</script>

<style lang="css">
  v-btn {
    top: 100px;
  }
</style>
