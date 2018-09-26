<template lang="html">
  <v-container grid-list-md class="mt-4" id="content">
    <pre>
      {{ JSON.stringify(config, null , 4)}}
    </pre>
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
