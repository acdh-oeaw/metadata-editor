<template>
  <div>
    <transition :duration="200" name="slideLeft" mode="out-in">
    <v-navigation-drawer
      v-if="$store.state.app.drawer"
      :mini-variant="$store.state.app.miniVariant"
      v-model="drawer"
      enable-resize-watcher
      :class="$store.state.app.config.color"
      dark
      app
      >
      <v-container
         fill-height
         @mouseover.stop="setNavDrawerMaxi()"
         @mouseleave.stop="setNavDrawerMini()"
      >
        <v-layout column justify-space-between>
          <v-list>
            <v-list-tile>
              <v-btn icon @click.stop="toggleAppMode()">
                <v-icon>view_day</v-icon>
              </v-btn>
              <v-btn icon @click.stop="toggleNavDrawerClipped()">
                <v-icon v-html="$store.state.app.drawerclipped?'first_page':'last_page'" v-if="!$store.state.app.miniVariant"></v-icon>
              </v-btn>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile
              value="true"
              v-for="(item, i) in $store.state.app.config.menu"
              :key="i"
              :to="item.startpage"
            >
                <v-btn icon>
                  <v-icon v-html="item.icon"></v-icon>
                </v-btn>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.caption"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list>
            <v-list-tile>
            </v-list-tile>
          </v-list>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    </transition>
    <transition :duration="200" name="slideRight" mode="out-in">
    <v-toolbar
      v-if="!$store.state.app.drawer"
      app
      height="90"
      class="border-bottom"
      >
      <v-btn icon @click.stop="toggleAppMode()">
        <v-icon>view_quilt</v-icon>
      </v-btn>
      <v-toolbar-title v-text="$store.state.app.config.title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
    </transition>
    <v-navigation-drawer
      :right="true"
      v-model="$store.state.app.rightDrawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

/* eslint no-console: ["error", { allow: ["log"] }] */
/* eslint no-return-assign: "off" */

export default {
  data() {
    return {
    };
  },
  name: 'FundamentNav',
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
  },
};
</script>
<style scoped>


</style>
