<template>
  <div> FORMWRAPPER
    <archeautocomplete v-if="component==='arche'" :type="typ" :name="name" v-model="selectedValue"></archeautocomplete>

    <archeautocomplete v-else type="persons" name="SOMETHING WENT WRONG" v-model="selectedValue"></archeautocomplete>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import archeautocomplete from './AutocompArche';
/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
  ],
  components: {
    archeautocomplete,
  },
  name: 'FormComponentWrapper',
  data() {
    return {
      selectedValue: '',
      loading: false,
      component: null,
      typ: '',
    };
  },
  methods: {

  },
  created() {
    this.$info('FormComponentWrapper created');
    // for now only arche
    this.typ = `${this.type.trim()}s`;

    if (this.keyInValidTypes((this.typ).toUpperCase(), 'ARCHE')) {
      this.component = 'arche';
    }
  },
};
</script>
