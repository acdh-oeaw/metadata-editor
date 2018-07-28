<template lang="html">
  <div>
      <clearcachedialog></clearcachedialog>
      <storedialog></storedialog>
      <deletesubjectdialog></deletesubjectdialog>
      <editsubjectdialog></editsubjectdialog>
      <addnewsubjectmodal></addnewsubjectmodal>
      <filesizedialog></filesizedialog>
  </div>
</template>

<script>
import clearcachedialog from './ClearCacheDialog';
import storedialog from './StoreDialog';
import deletesubjectdialog from './DeleteSubjectDialog';
import editsubjectdialog from './EditSubjectDialog';
import addnewsubjectmodal from './AddNewSubjectModal';
import filesizedialog from './FileSizeDialog';


export default {
  components: {
    clearcachedialog,  // opened in storeStats
    storedialog,    // directly opens itself. -> old session restore
    editsubjectdialog,
    deletesubjectdialog,  // both opened in Store_Storetreeitem
    addnewsubjectmodal,  // opened in autoCompDefault
    filesizedialog,  // opened in Store_LoadFile
  },
};
</script>

<style lang="css">
</style>
