<template lang="html">
  <div>
      <clearcachedialog></clearcachedialog>
      <storedialog></storedialog>
      <deletesubjectdialog></deletesubjectdialog>
      <editsubjectdialog></editsubjectdialog>
      <addnewsubjectdialog></addnewsubjectdialog>
      <filesizedialog></filesizedialog>
      <networkerrordialog></networkerrordialog>
  </div>
</template>

<script>
import clearcachedialog from './ClearCacheDialog';
import storedialog from './StoreDialog';
import deletesubjectdialog from './DeleteSubjectDialog';
import editsubjectdialog from './EditSubjectDialog';
import addnewsubjectdialog from './AddNewSubjectDialog';
import filesizedialog from './FileSizeDialog';
import networkerrordialog from './NetworkErrorDialog';


export default {
  components: {
    clearcachedialog,  // opened in storeStats
    storedialog,    // directly opens itself. -> old session restore
    editsubjectdialog,
    deletesubjectdialog,  // both opened in Store_Storetreeitem
    addnewsubjectdialog,  // opened in autoCompDefault
    filesizedialog,  // opened in Store_LoadFile
    networkerrordialog,
  },
};
</script>

<style lang="css">
</style>
