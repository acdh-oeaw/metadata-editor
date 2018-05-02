<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="clearDialog">
    <v-card>
      <v-card-title>
        Clear Cache
      </v-card-title>
    </v-card>
    <v-card-text>
      Are you Sure to delete  {{ $store.state.n3.tripleCount }} Triples containing
  {{ Object.keys($store.state.n3.subjects).length }} Subjects from your Store? This can not be undone!
    </v-card-text>
    <v-card-actions>
      <v-btn @click="clearStore()" large color="error">
        Discard
      </v-btn>
      <v-btn color="secondary" @click.stop="clearDialog = false">
        Close
      </v-btn>
    </v-card-actions>
  </v-dialog>
</template>

<script>
import HELPERS from '../../helpers';

export default {
  mixins: [HELPERS],
};
</script>

<style lang="css">
</style>
