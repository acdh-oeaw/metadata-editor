<template>
  <div class="AppBar">
    <b-nav vertical class="w-25" type="light">
      <b-nav-item class="nav-item active" v-for="item in menu.menu" :key="item.caption">
        <b-link class="nav-link" :to="item.startpage">
          <i :class="item.icon"
            v-b-tooltip.html.rightbottom
            :title="item.caption"></i>
        </b-link>
      </b-nav-item>
    </b-nav>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100px;
  background-color: #88dbdf;
  z-index: 100;
}
</style>
