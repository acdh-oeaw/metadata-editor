<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="$store.state.dialogs[name].status" max-width="500px">
    <v-card>
      <v-card-title>
        Clear Cache
      </v-card-title>
      <v-card-text color="primary">
        Are you Sure to delete  {{ $getCount }} Triples containing
  {{ Object.keys($store.state.n3.subjects).length }} Subjects from your Store? This can not be undone!
      </v-card-text>
      <v-card-actions>
        <v-btn @click="clearCache(); closeDialog(name);" large color="error">
          Discard
        </v-btn>
        <v-btn @click="closeDialog(name)" color="secondary" large>
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import HELPERS from '../../helpers';

export default {
  props: {
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      name: 'clearcachedialog',
    };
  },
  mixins: [HELPERS],
  methods: {
    close() {
      this.closeDialog(this.name);
    },
    ...mapMutations('dialogs', [
      'closeDialog',
    ]),
  },
  computed: {
    ...mapGetters('n3', [
      'getCount',
    ]),
  },
  created() {
    this.$info('ClearCacheModal created', this.$store.state.dialogs.clearcachedialog);
  },
};
</script>

<style lang="css">
</style>
