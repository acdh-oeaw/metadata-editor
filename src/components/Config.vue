<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <v-textarea
      v-model="JSON.stringify(config, null , 4)"
      auto-grow
      @change="hidden = false"
    >
    </v-textarea>
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        v-show="!hidden"
        @click="hidden = true">
        <v-icon>save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import mapMutations from 'vuex';
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      hidden: true,
    };
  },
  computed: {
    config() {
      return this.$store.state.config.apis;
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
</style>
