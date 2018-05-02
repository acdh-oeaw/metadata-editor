<template lang="html">
  <!-- Dialogs -->
  <!-- store recovery -->
  <div>
    <store-dialog></store-dialog>
    <clear-cache-dialog></clear-cache-dialog>
  </div>
</template>

<script>
import ClearCacheDialog from './ClearCacheDialog';
import StoreDialog from './StoreDialog';

export default {
  components: {
    StoreDialog,
    ClearCacheDialog,
  },
};
</script>

<style lang="css">
</style>
