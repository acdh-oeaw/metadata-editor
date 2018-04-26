<template>
  <div class="">
    <div class="appbartoggle" v-on:click="toggleMode">
      <i class="fas fa-arrow-right"  style="color:#000000" v-if="!$store.state.app.appbar"></i>
      <i class="fas fa-arrow-left" style="color:#ffffff" v-if="$store.state.app.appbar"></i>
    </div>
    <div style="display: flex; flex-direction: row; ">
      <transition :duration="200" name="slideLeft" mode="out-in">
        <FundamentAppBar :menu="menu" v-if="$store.state.app.appbar"></FundamentAppBar>
      </transition>
      <div style="display: flex; flex-direction: column;width:100%;">
        <FundamentNav :menu="menu" v-if="!$store.state.app.appbar"></FundamentNav>
        <div class="mt-3">
          <transition :duration="250" name="fadeUp" mode="out-in">
            <router-view name="Content"></router-view>
          </transition>
        </div>
      </div>
    </div>
    <modals></modals>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapActions, mapMutations } from 'vuex';
  import FundamentNav from './FundamentNav';
  import FundamentAppBar from './FundamentAppBar';
  import Modals from './Modals';
  import HELPERS from '../helpers';

  /* eslint no-console: ["error", { allow: ["log"] }] */
  /* eslint no-return-assign: "off" */

  export default {
    components: {
      FundamentNav,
      FundamentAppBar,
      Modals,
    },
    mixins: [HELPERS],
    data() {
      return {
        menu: {},
        appbar: false,
      };
    },
    methods: {
      ...mapActions('jowl', [
        'setOntology',
        'constructJOWL',
      ]),
      ...mapMutations('JSONschema', [
        'constructJSONschema',
      ]),
      ...mapActions('n3', [
        'constructN3',
      ]),
      ...mapMutations('app', [
        'toggleMode',
      ]),
    },
    created() {
      axios.get('/static/nav.json')
        .then(res => (this.menu = res.data))
        .catch(error => this.$log(error));
      this.setOntology('static/acdh-schema.owl');
    },
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .appbartoggle {
    position: fixed;
    top:20px;
    left: 20px;
    z-index: 1000000;
    font-size: xx-large;
    cursor: pointer;
  }
</style>
