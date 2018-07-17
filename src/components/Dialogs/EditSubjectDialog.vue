<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="$store.state.dialogs[name].status">
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="closeDialog(name)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      <v-card-text color="primary">
        <formfromschema v-model="$store.state.dialogs[this.name].query" :type="type" uniqueName="edit" :edit="$store.state.dialogs[this.name].query">
        </formfromschema>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

import formfromschema from '../FormFromSchema';
import HELPERS from '../../helpers';

export default {
  data() {
    return {
      type: '',
      name: 'editsubjectdialog',
    };
  },
  components: {
    formfromschema,
  },
  mounted() {
    this.$log('dialogdata', this.$store.state.dialogs[name].query.query);

  },
  props: {
    dialog: {
      default: false,
    },
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('dialogs', [
      'closeDialog',
    ]),
  },
};
</script>

<style lang="css">
</style>
