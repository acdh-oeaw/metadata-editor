<template>
  <div>
    <component @input="$emit('input', selectedValue)" v-if="component" v-model="selectedValue" :name="name" :is="component" :type="mappedType"></component>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import autocompdefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
import AutocompVocabs from './AutocompVocabs';
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
    'value',
  ],
  components: {
    autocompdefault,
    HasIdentifierField,
    AutocompVocabs,
  },
  name: 'FormComponentWrapper',
  data() {
    return {
      selectedValue: this.value,
      loading: false,
      component: null,
      mappedType: null,
      // for Mapping matching types to components.
      componentTypeMap: {
        // contains objects with 2 props: name -> component name;
        // type -> prop to give to component.
        date: { name: 'v-date-picker' },
        string: defaultComponentObject,
        text: defaultComponentObject,
        positiveinteger: defaultComponentObject,
      },
      // for Mapping matching names to components.
      componentNameMap: {
        ArcheLifeCycleStatus: { name: 'AutocompVocabs', type: 'ARCHE_LIFECYCLE_STATUS' },
        ArcheCategory: { name: 'AutocompVocabs', type: 'ARCHE_CATEGORY' },
      },
    };
  },
  methods: {
    hasIdentifier(name) {
      if (name === 'hasIdentifier') {
        this.component = 'HasIdentifierField';
        if (Array.isArray(this.value)) {
          this.selectedValue = this.value;
        } else {
          this.selectedValue = this.value;
        }
        // this.$info('FormComponentWrapper created', this.component, this.selectedValue);
        return true;
      }
      return false;
    },
  },
  created() {
    // hasIdentifier;
    if (this.hasIdentifier(this.name)) { return; }

    let c = this.componentNameMap[this.name];
    if (!c) {
      const typeL = this.type.toLowerCase();
      c = this.componentTypeMap[typeL];
    }

    if (!c) {
      c = { type: this.type, name: 'autocompdefault' };
    }
    // this.$info('FormComponentWrapper created', c);
    if (this.selectedValue) {
      // this.$info('  selectedValue:', this.selectedValue);
    }
    this.component = c.name;
    this.mappedType = c.type;
    this.selectedValue = this.value;
  },
  updated() {
    if (this.value) {
      // hasIdentifier;
      if (!this.hasIdentifier(this.name)) {
        this.selectedValue = this.value;
      }
    }
  },
};
</script>
