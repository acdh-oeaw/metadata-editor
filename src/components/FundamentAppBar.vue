<template>
<div class="AppBar">

</div>
</template>

<script>
  import HELPERS from '../helpers';

  export default {
    mixins: [HELPERS],
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
  left: 0px;
  height: 100vh;
  width: 75px;
  background-color: #88dbdf;
  z-index: 10000;
}
</style>
