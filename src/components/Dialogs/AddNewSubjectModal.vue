<!-- TODO: specify types the user can select and return ID  -->

<template lang="html">
  <!-- store deletion -->
  <v-dialog  v-model="$store.state.dialogs[name].status" fullscreen>
    <v-card>
      <v-card-title>
        Select From Store or Create New Subject
      </v-card-title>
      <v-card-text color="primary">
        <storetree class="tree"></storetree>
        <p>Select an item form in store saved items above. Currently nothing happens, but shortly, this will return the identifier of the subject.</p>        
      </v-card-text>
      <v-card-actions>
        </v-btn>
        <v-btn @click="closeDialog(name)" color="secondary" large>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';

import HELPERS from '../../helpers';
import storetree from '../Store_Storetree';

export default {
  components: {
    storetree,
  },
  computed: {
    item() {
      return this.$store.state.dialogs[this.name].item;
    }
  },
  data() {
    return {
      name: 'addnewsubjectmodal',
    };
  },
  watch: {
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
