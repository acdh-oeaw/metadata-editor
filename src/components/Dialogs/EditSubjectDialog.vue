<template lang="html">
  <!-- store deletion -->
  <v-dialog fullscreen transition="dialog-bottom-transition" v-model="$store.state.dialogs[name].status">
    <v-card>
      <v-card-text color="primary">
        <br><br>{{ type }}
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
      type: {},
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
    ]),
  },
  computed: {
    query() {
      return this.$store.state.dialogs[this.name].query;
    },
  },
  watch: {
    query() {
      this.$debug('query changed', this.query);
      if (this.query) {
        this.$log('dialogdata', this.query);
        this.type = this.$store.state.dialogs[this.name].type;
      }
    },
  },
};
</script>

<style lang="css">
</style>
