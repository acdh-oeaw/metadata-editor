<template lang="html">
  <div>
      <clearcachedialog></clearcachedialog>
      <storedialog></storedialog>
      <deletesubjectdialog></deletesubjectdialog>
      <addnewsubjectmodal></addnewsubjectmodal>
      <filesizedialog></filesizedialog>
  </div>
</template>

<script>
import clearcachedialog from './ClearCacheDialog';
import storedialog from './StoreDialog';
import deletesubjectdialog from './DeleteSubjectDialog';
import addnewsubjectmodal from './AddNewSubjectModal';
import filesizedialog from './FileSizeDialog';


export default {
  components: {
    clearcachedialog,
    storedialog,
    deletesubjectdialog,
    addnewsubjectmodal,
    filesizedialog,
  },
};
</script>

<style lang="css">
</style>
