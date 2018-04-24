<template>
<div class="AppBar bg-white box-shadow">
  <Storetree></Storetree>
  <Storestats></Storestats>
</div>
</template>

<script>
  import HELPERS from '../helpers';
  import Storestats from './StoreStats';
  import Storetree from './StoreTree';

  export default {
    mixins: [HELPERS],
    components: {
      Storestats,
      Storetree,
    },
    props: [
      'menu',
    ],
    data() {
      return {
      };
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.AppBar {
  position: fixed;
  top: 0px;
  right: 0px;
  height: 100vh;
  width: 300px;
  z-index: 100;
}
</style>
