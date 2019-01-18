<template lang="html">
  <v-dialog v-model="$store.state.dialogs[name].status" max-width="900px">
    <v-card>
      <v-card-title>
        An error occoured!
      </v-card-title>
      <v-card-text color="primary">
        Apparently you're not connected to the arche network (You probably forgot to use a VPN). The following endpoint(s) could no be reached: {{ $store.state.dialogs.failedConnections.length  ? $store.state.dialogs.failedConnections.toString().replace(/"|\[|\]/g).replace(/,/g, ', ') :  closeDialog(name) }}
        <v-checkbox
          label="Don't tell me again"
          v-model="checkbox"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$router.go($router.currentRoute)" large color="error">
          Reload
        </v-btn>
        <v-btn @click="closeDialog(name)" color="secondary" large>
          Continue anyway
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

import HELPERS from '../../helpers';

export default {
  props: {
    dialog: {
      default: false,
    },
  },
  data() {
    return {
      checkbox: false,
      name: 'networkerrordialog',
    };
  },
  watch: {
    checkbox() {
      this.toggleNetworkPrompt(!this.checkbox);
    },
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('dialogs', [
      'closeDialog',
      'toggleNetworkPrompt',
    ]),
  },
  computed: {
    endpoints() {
      return this.$store.state.dialogs[this.name].endpoints;
    },
  },
};
</script>

<style lang="css">
</style>
