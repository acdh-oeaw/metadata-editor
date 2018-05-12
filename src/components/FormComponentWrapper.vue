<template>
  <div>
    <component v-if="component" v-model="selectedValue" :name="name" :is="component" :type="mappedType"></component>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import archeautocomplete from './AutocompArche';
/* eslint no-param-reassign: ["error", { "props": false }] */

const defaultComponentObject =
  {
    type: '',
    name: 'v-text-field',
  }
;

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
      selectedValue: null,
      loading: false,
      component : null,
      mappedType : null,
      componentMap: {   // contains objects with 2 props: name -> component name; type -> prop to give to component.
        agent : { type: 'persons', name: 'archeautocomplete' },
        containerorreme: defaultComponentObject,
        containerorresource: defaultComponentObject,
        main: defaultComponentObject,
        organisation: { type: 'organisations', name: 'archeautocomplete' },
        publicationorrepoobject: { type: 'publications', name: 'archeautocomplete' },
        repoobject: { type: 'persons', name: 'archeautocomplete' },
        anyuri: defaultComponentObject,
        date: { type: '', name: 'v-date-picker' },
        string: defaultComponentObject,
      },
    };
  },
  methods: {

  },
  created() {
    this.$info('FormComponentWrapper created');

    const typeL = this.type.toLowerCase();
    const c = this.componentMap[typeL];
    this.$debug('c', c);
    this.component = c.name;
    if (c.type) {
      this.mappedType = c.type;
    }
  },
};
</script>
