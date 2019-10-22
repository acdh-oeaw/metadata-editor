<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="getDialog(name).status" max-width="500px">
    <v-card>
      <v-card-title>
        Clear Cache
      </v-card-title>
      <v-card-text color="primary">
        Are you Sure to delete  {{ getCount.quads }} Quads containing
  {{ getCount.subjects }} Subjects from your Store? This can not be undone!
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
    ...mapGetters('dialogs', [
      'getDialog',
    ]),
  },
  created() {
    this.$info('ClearCacheDialog created', this.getDialog(this.name));
  },
};
</script>

<style lang="css">
</style>
