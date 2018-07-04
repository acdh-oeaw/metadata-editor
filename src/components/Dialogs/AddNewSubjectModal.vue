<!-- TODO: specify types the user can select and return ID  -->

<template lang="html">
  <!-- store deletion -->
  <v-dialog  v-model="$store.state.dialogs[name].status" fullscreen>
    <v-card>
      <v-card-title>
        Select From Store or Create New Subject
      </v-card-title>
      <v-card-text color="primary">
        <storetree v-model="storeTreeSelection" class="tree"></storetree>
        <p>Select an item from the stored items above. Currently nothing happens, but shortly, this will return the identifier of the subject.</p>
        <p>item: {{ item }}</p>
        <p>currently selected: {{ storeTreeSelection }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteItem(); closeDialog(name);" color="secondary" large>
          Cancel
        </v-btn>
        <v-btn :disabled="!storeTreeSelection" @click="ChangeItem();" color="primary" large>
          Select
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex';

import HELPERS from '../../helpers';
import storetree from '../Store_Storetree';

export default {
  components: {
    storetree,
  },
  computed: {
    item() {
      return this.$store.state.dialogs[this.name].item;
    },
  },
  data() {
    return {
      name: 'addnewsubjectmodal',
      storeTreeSelection: '',
    };
  },
  watch: {
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('dialogs', [
      'closeDialog',
      'setDialog',
    ]),
    ChangeItem() {
      this.setDialog({
        name: this.name,
        obj: {
          status: false,
          item: this.item,
          changedItem: this.storeTreeSelection,
        },
      });
    },
    deleteItem() {
      this.setDialog({
        name: this.name,
        obj: {
          status: false,
          obj: {
            item: this.item,
          },
        },
      });
    },
  },
};
</script>

<style lang="css">
</style>
