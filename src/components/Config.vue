<template lang="html">
  <v-container grid-list-md class="mt-4">
    <v-expansion-panel expand inset>
      <v-expansion-panel-content v-for="(item, i) in Object.keys(config)" :key="i">
        <div slot="header">{{ item }}</div>
        <v-expansion-panel-content v-if="isFolder(config[item])" v-for="(subItem, j) in Object.keys(config[item])" :key="j">
          <div slot="header">{{ subItem }}</div>
          <v-expansion-panel-content v-if="isFolder(config[item][subItem])" v-for="(subSubItem, k) in Object.keys(config[item][subItem])" :key="k">
            <div slot="header">{{ subSubItem }}</div>
          </v-expansion-panel-content>
          <v-expansion-panel-content v-else>{{subItem}}: {{ config[item][subItem] }}</v-expansion-panel-content>
        </v-expansion-panel-content>
        <v-expansion-panel-content v-else>{{ item }}: {{ config[item] }}</v-expansion-panel-content>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      config: {},
    };
  },
  created() {
    this.config = this.getConfig();
  },
  methods: {
    isFolder(obj) {
      this.$log('ibj', obj);
      if (Object.keys(obj).length > 1) return true;
      return false;
    },
  },
};
</script>

<style lang="css">
  v-Expansion-Panel v-Expansion-Panel {
    margin-left: 50px;
  }
</style>
