<template>
  <div>
    <component @input="$emit('input', selectedValue)" v-if="component" v-model="selectedValue" :name="name" :is="component" :type="mappedType"></component>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import autocompdefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
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
  },
  name: 'FormComponentWrapper',
  data() {
    return {
      selectedValue: this.value,
      loading: false,
      component: null,
      mappedType: null,
      // for Mapping easy components of direct input without API calls.
      componentMap: {
        // contains objects with 2 props: name -> component name;
        // type -> prop to give to component.
        date: { name: 'v-date-picker' },
        string: defaultComponentObject,
        text: defaultComponentObject,
        positiveinteger: defaultComponentObject,
      },
      blacklist: [/^is.*/],
    };
  },
  methods: {
    hasIdentifier(name) {
      if (name === 'hasIdentifier') {
        this.component = 'HasIdentifierField';
        this.selectedValue = this.value;
        this.$info('FormComponentWrapper created', this.component, this.selectedValue);
        return true;
      }
      return false;
    },
    onBlacklist(name) {
      let onList = false;
      this.blacklist.forEach(r => {
        this.$debug('regexCheck, r, name', r, name);
        this.$debug('      check: ',r.exec(name));
        if(r.exec(name) !== null) {
          onList = true;
        }
      });
      return onList;
    }
  },
  created() {
    // hasIdentifier;
    if (this.hasIdentifier(this.name)) { return; }
    const typeL = this.type.toLowerCase();
    let c = this.componentMap[typeL];
    if (!c) {
      c = { type: this.type, name: 'autocompdefault' };
    }
    this.$info('FormComponentWrapper created', c )
    if (this.selectedValue) {
      this.$info('  selectedValue:', selectedValue);
    }
    this.component = c.name;
    this.mappedType = c.type;
    this.selectedValue = this.value;
  },

  updated() {
    this.selectedValue = this.value;
  },
};
</script>
