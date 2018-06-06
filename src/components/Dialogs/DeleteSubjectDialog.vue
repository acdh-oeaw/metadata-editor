<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title>
        Delete Subject
      </v-card-title>
      <v-card-text color="primary">
        Are you sure you want to delete the following triples?
        <v-checkbox
          label="Don't ask me again"
          v-model="checkbox"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="RemoveSubject(uri); close();" large color="error">
          Delete
        </v-btn>
        <v-btn @click="close" color="secondary" large>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

import HELPERS from '../../helpers';

export default {
  props: {
    uri: {
      default: '',
    },
    dialog: {
      default: false,
    }
  },
  data() {
    return {
      checkbox: false,
    };
  },
  watch: {
      checkbox() {
        this.toggleDeletePrompt(!this.checkbox);
      }
  },
  mixins: [HELPERS],
  methods: {
    ...mapActions('n3', [
      'RemoveSubject',
    ]),
    ...mapMutations('n3', [
      'toggleDeletePrompt',
    ]),
    close() {
      this.$emit('update:dialog', false);
    },
  },
};
</script>

<style lang="css">
</style>
