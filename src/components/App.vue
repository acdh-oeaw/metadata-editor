<template>
  <v-app>
    <fundamentnav></fundamentnav>
    <v-content>
      <transition :duration="250" name="fadeUp" mode="out-in">
        <router-view name="Content"></router-view>
      </transition>
      <fundamentfooter></fundamentfooter>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions, mapMutations } from 'vuex';
import fundamentnav from './Fundament/FundamentNav';
import fundamentfooter from './Fundament/FundamentFooter';
/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-return-assign: "off" */

export default {
  data() {
    return {
    };
  },
  name: 'App',
  components: {
    fundamentnav,
    fundamentfooter,
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
    ...mapActions('app', [
      'toggleAppMode',
    ]),
    ...mapMutations('app', [
      'setConfig',
      'toggleNavDrawerMini',
      'setNavDrawerMini',
      'setNavDrawerMaxi',
      'toggleNavDrawerClipped',
      'toggleRightDrawer',
      'toggleDrawer',
      'toggleNavbar',
    ]),
  },
  created() {
    axios.get('/static/nav.json')
      .then(res => this.setConfig(res.data))
      .catch(error => this.$log(error));
    this.setOntology('static/acdh-schema.owl');
  },
};
</script>
