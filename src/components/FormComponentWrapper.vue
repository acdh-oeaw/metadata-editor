<template>
  <div>
    <component
      @input="$emit('input', selectedValue)"
      v-if="component"
      :label="label"
      v-model="selectedValue"
      :name="name"
      :is="component"
      :type="mappedType"
      :hint="name"
      persistent-hint
    >
    </component>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import autocompdefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
import HasTitleImageField from './HasTitleImageField';
import AutocompVocabs from './AutocompVocabs';
import BetterDatePicker from './BetterDatePicker';
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
    HasTitleImageField,
    AutocompVocabs,
    BetterDatePicker,
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
        date: { type: '', name: 'BetterDatePicker' },
        string: defaultComponentObject,
        text: defaultComponentObject,
        positiveinteger: defaultComponentObject,
      },
      // for Mapping matching names to components.
      componentNameMap: {
        hasLifeCycleStatus: { name: 'AutocompVocabs', type: 'ARCHE_LIFECYCLE_STATUS' },
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
    hasTitleImage(name) {
      if (name === 'hasTitleImage') {
        this.component = 'hasTitleImageField';
        this.selectedValue = this.value;
        // this.$info('FormComponentWrapper created', this.component, this.selectedValue);
        return true;
      }
      return false;
    },
  },
  computed: {
    label() {
      const schemas = Object.keys(this.$store.state.JSONschema.schemas);
      for (let i = 0; i < schemas.length; i += 1) {
        if (this.$store.state.JSONschema.schemas[schemas[i]].properties[this.name]) {
          return this.$store.state.JSONschema.schemas[schemas[i]].properties[this.name].title;
        }
      }
      return '';
    },
  },
  created() {
    // if this -> mapping happens in the hasIdentifierFunciton
    if (this.hasIdentifier(this.name)) { return; }
    if (this.hasTitleImage(this.name)) { return; }

    let c = this.componentNameMap[this.name];
    if (!c) {
      const typeL = this.type.toLowerCase();
      c = this.componentTypeMap[typeL];
    }

    if (!c) {
      c = { type: this.type, name: 'autocompdefault' };
    }

    this.component = c.name;
    this.mappedType = c.type;
    if (this.type === 'date' && Array.isArray(this.value)) {
      this.selectedValue = this.value[0];
    } else {
      this.selectedValue = this.value;
    }
  },
  updated() {
    if (this.value) {
      if (this.type === 'date' && Array.isArray(this.value)) {
        this.selectedValue = this.value[0];
      } else {
        this.selectedValue = this.value;
      }
    }
  },
};
</script>
