<!-- TODO: specify types the user can select and return ID  -->

<template lang="html">
  <!-- store deletion -->
  <v-dialog  v-model="$store.state.dialogs[name].status" fullscreen>
    <v-card>
      <v-card-title>
        Select From Store or Create New Subject
      </v-card-title>
      <v-card-text  color="primary">
        <storetree v-model="storeTreeSelection" class="tree"></storetree>
        <p>Select an item from the stored items above. this will return the identifier of the subject. Or you can create a new Entry [based on your tree selection] below. (not impemented yet)</p>
        <form v-if="storeTreeSelection">
          <v-text-field label="subject" v-if="storeTreeSelection.subject" placeholder="Placeholder" v-model="storeTreeSelection.subject.value"></v-text-field>
          <v-text-field label="predicate" v-if="storeTreeSelection.predicate" placeholder="Placeholder" v-model="storeTreeSelection.predicate.value"></v-text-field>
          <v-text-field label="object"  v-if="storeTreeSelection.object" placeholder="Placeholder" v-model="storeTreeSelection.object.value"></v-text-field>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel();" color="secondary" large>
          Cancel
        </v-btn>
        <v-btn :disabled="!storeTreeSelection" @click="addItem();" color="primary" large>
          Select
        </v-btn>
      </v-card-actions>

      <p>selected Item: {{ storeTreeSelection }}</p>
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
      name: 'addnewsubjectdialog',
      storeTreeSelection: {},
    };
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('dialogs', [
      'closeDialog',
      'setDialog',
    ]),
    addItem() {
      this.setDialog({
        name: this.name,
        obj: {
          status: false,
          addedItem: this.storeTreeSelection,
        },
      });
    },
    cancel() {
      this.setDialog({
        name: this.name,
        obj: {
          status: false,
          addedItem: false,
        },
      });
    },
  },
};
</script>

<style lang="css">
</style>
