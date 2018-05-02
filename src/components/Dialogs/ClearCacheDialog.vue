<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="dialog">
    <v-card>
      <v-card-title>
        Clear Cache
      </v-card-title>
    </v-card>
    <v-card-text color="primary">
      Are you Sure to delete  {{ $store.state.n3.tripleCount }} Triples containing
  {{ Object.keys($store.state.n3.subjects).length }} Subjects from your Store? This can not be undone!
    </v-card-text>
    <v-card-actions>
      <v-btn @click="clearStore(); close();" large color="error">
        Discard
      </v-btn>
      <v-btn @click="close" color="secondary" large>
        Close
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import HELPERS from '../../helpers';

export default {
  props: {
    dialog: {
      default: false,
    },
  },
  mixins: [HELPERS],
  methods: {
    close() {
      this.$emit('update:dialog', false);
    },
  },
};
</script>

<style lang="css">
</style>
