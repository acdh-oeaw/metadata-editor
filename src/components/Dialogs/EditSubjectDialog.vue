<template lang="html">
  <!-- store deletion -->
  <v-dialog v-model="$store.state.dialogs[name].status">
    <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="close(name)">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
      <v-card-text color="primary">
        <formfromschema v-model="data" :type="type" uniqueName="edit" :edit="query">
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
      name: 'editsubjectdialog',
      data: {},
    };
  },
  components: {
    formfromschema,
  },
  mounted() {
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
      'setDialog',
    ]),
    close(name) {
      this.setDialog({ name, obj: { query: {} } });
    },
  },
  computed: {
    query() {
      return this.$store.state.dialogs[this.name].query;
    },
    type() {
      return this.$store.state.dialogs[this.name].type;
    },
  },
  watch: {
    query() {
      this.$debug('query changed', this.query);
      if (this.query) {
        this.$log('dialogdata', this.query);
      }
    },
  },
};
</script>

<style lang="css">
</style>
