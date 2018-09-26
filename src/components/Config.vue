<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <v-textarea
    :value="JSON.stringify(config, null , 4)"
      auto-grow
    >
    </v-textarea>
  </v-container>
</template>

<script>
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
    };
  },
  computed: {
    config() {
      return this.$store.state.config.apis;
    },
  },
};
</script>

<style lang="css">
</style>
