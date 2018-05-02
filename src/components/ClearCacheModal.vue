<template lang="html">
  <!-- store deletion -->
  <b-modal  id="clearCacheModal"
            title="Clear all Cache"
            ok-variant="danger"
            @ok="clearStore()">
    <p class="my-4">You are about to delete {{ $store.state.n3.tripleCount }} Triples containing
{{ Object.keys($store.state.n3.subjects).length }} Subjects from the n3-Store.<br><br>
All data you typed in forms will be deleted as well.<br><br>This step can not be undone. Are you sure you want to procede?</p>
    <div slot="modal-ok" size="lg" variant="danger">
      Clear Everything
    </div>
    <div slot="modal-cancel" size="lg" variant="secondary">
      Cancel
    </div>
  </b-modal>
</template>

<script>
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
};
</script>

<style lang="css">
</style>
