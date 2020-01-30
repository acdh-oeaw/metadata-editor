<template>
  <v-app>
    <fundament-nav :config="nav"></fundament-nav>
    <v-content>
      <router-view name="Content"></router-view>
      <fundament-footer :logo="logo"></fundament-footer>
    </v-content>
    <dialogs></dialogs>
  </v-app>
</template>

<script>
import dialogs from './Dialogs/Dialogs';
import nav from '../../static/nav.json';
import logo from '../../static/acdh_logo.png';

/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-return-assign: "off" */

export default {
  data() {
    return {
      nav,
      logo,
    };
  },
  name: 'App',
  components: {
    dialogs,
  },
};
</script>
