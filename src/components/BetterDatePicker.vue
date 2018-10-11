<template lang="html">
  <v-menu
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
