<template lang="html">
  <!-- store deletion -->
  <v-dialog
    v-model="dialog"
    fullscreen
  >
    <v-card>
      <v-card-title>
        Select From Store or Create New Subject
      </v-card-title>

      <v-card-text color="primary">
        <storetree class="tree"></storetree>
        Are you sure you want to delete the following triples?
        <v-data-table
          :items="triples"
          hide-actions
        >
          <template slot="items" slot-scope="props">
              <td class="text-xs-right">{{ props.item.predicate }}</td>
              <td>{{ props.item.object }}</td>
          </template>
        </v-data-table>
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
import { mapActions, mapMutations, mapGetters } from 'vuex';

import HELPERS from '../../helpers';
import storetree from '../Store_Storetree'

export default {
  props: {
    uri: {
      default: '',
    },
    dialog: {
      default: false,
    },
  },
  components: {
    storetree,
  },
  computed: {
    ...mapGetters('n3', [
      'getTriples',
    ]),
  },
  data() {
    return {
      checkbox: false,
      triples: [],
    };
  },
  watch: {
    checkbox() {
      this.toggleDeletePrompt(!this.checkbox);
    },
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
  created() {
    this.triples = (this.getTriples({ subject: this.uri }));
  },
};
</script>

<style lang="css">
</style>
