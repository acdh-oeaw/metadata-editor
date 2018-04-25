<template lang="html">
  <!-- store deletion -->
  <b-modal  id="clearCacheModal"
            title="Clear Cache"
            ok-variant="danger"
            @ok="clearStore()">
    <p class="my-4">Are you Sure to delete  {{ $store.state.n3.tripleCount }} Triples containing
{{ Object.keys($store.state.n3.subjects).length }} Subjects from your Store? This can not be undone!</p>
    <div slot="modal-ok" size="lg" variant="danger">
      Clear
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
