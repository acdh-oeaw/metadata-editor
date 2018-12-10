<template lang="html">
  <v-layout row wrap>
    <v-flex xs8>
      <v-menu
        v-if="!manSwitch"
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="selectedValue"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="selectedValue"
          :label="label"
          :hint="name"
          prepend-icon="event"
          readonly
          persistent-hint
        ></v-text-field>
        <v-date-picker
          v-model="selectedValue"
          @input="$emit('input', selectedValue); $refs.menu.save(selectedValue)"
          no-title
        ></v-date-picker>
      </v-menu>
      <v-text-field
        v-else
        v-model="selectedValue"
        :label="label"
        :hint="`${name} (please use YYYY-MM-DD)`"
        @input="$emit('input', selectedValue)"
        persistent-hint
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-switch label="Manual input" v-model="manSwitch"></v-switch>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'type',
    'name',
    'value',
    'label',
  ],
  data() {
    return {
      menu: false,
      manSwitch: false,
      selectedValue: '',
    };
  },
  mounted() {
    this.selectedValue = this.value;
  },
};
</script>

<style lang="css">
</style>
