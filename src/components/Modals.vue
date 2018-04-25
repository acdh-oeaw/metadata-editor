<template lang="html">
  <!-- Modals -->
  <!-- store recovery -->
  <div>
    <store-modal></store-modal>
    <clear-cache-modal></clear-cache-modal>
  </div>
</template>

<script>
import ClearCacheModal from './ClearCacheModal';
import StoreModal from './StoreModal';

export default {
  components: {
    StoreModal,
    ClearCacheModal,
  },
};
</script>

<style lang="css">
</style>
