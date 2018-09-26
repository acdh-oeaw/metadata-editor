<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <v-textarea
    v-model="JSON.stringify(config, null , 4)"
      auto-grow
    >
    </v-textarea>
    <v-fab-transition>
      <v-btn
        color="primary"
        fab
        v-show="JSON.stringify(config, null , 4) === JSON.stringify(getConfig, null , 4)">
        <v-icon>save</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-container>
</template>

<script>
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      config: {},
    };
  },
  created() {
    this.config = this.getConfig();
  },
};
</script>

<style lang="css">
</style>
