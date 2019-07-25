<template>
  <div>
    <component
        v-for="(list, index) in selectedValue"
        @input="$emit('input', selectedValue)"
        v-if="component"
        v-model="selectedValue[index]"
        :label="name"
        :name="name"
        :is="component"
        :type="mappedType"
        :hint="(index === selectedValue.length - 1) ? properties.description : ''"
        :key="index"
        :properties="properties"
        persistent-hint
        rows="2"
        autocomplete="none"
        auto-grow
        :append-icon="isRecommended() ? '*' : ''"
      >
      </component>
      <div class="text-xs-right" v-if="component !== 'autocompdefault'">
        <v-btn
          color="primary"
          small
          icon
          flat
          :disabled="properties.maxItems <= selectedValue.length && properties.maxItems !== 0"
          @click="selectedValue.push('')">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn
          small
          icon
          flat
          :disabled="properties.minItems >= selectedValue.length"
          @click="selectedValue.pop()">
          <v-icon>remove</v-icon>
        </v-btn>
      </div>
  </div>
</template>

<script>
import HELPERS from '../../helpers';
import autocompdefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
import HasTitleImageField from './HasTitleImageField';
import AutocompVocabs from './AutocompVocabs';
import BetterDatePicker from './BetterDatePicker';
import AnyUriField from './AnyUriField';
// import HasTemporalCoverageIdentifierField from './HasTemporalCoverageIdentifierField';
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
    'schema',
  ],
  components: {
    autocompdefault,
    HasIdentifierField,
    HasTitleImageField,
    AutocompVocabs,
    BetterDatePicker,
    AnyUriField,
    // HasTemporalCoverageIdentifierField,
  },
  name: 'FormComponentWrapper',
  data() {
    return {
      selectedValue: (Array.isArray(this.value) ? this.value : [this.value]),
      loading: false,
      component: null,
      mappedType: null,
      // URIvalidation: value => /\w+:(\/?\/?)[^\s]+/.test(val) || 'Not an URI',
      // noRules: value => true,
      // for Mapping matching types to components.
      componentTypeMap: {
        // contains objects with 2 props: name -> component name;
        // type -> prop to give to component.
        date: { type: '', name: 'BetterDatePicker' },
        string: defaultComponentObject,
        text: defaultComponentObject,
        anyURI: { type: 'anyURI', name: 'AnyUriField' },
        positiveinteger: defaultComponentObject,
        literal: defaultComponentObject,
        '': defaultComponentObject,
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
        this.selectedValue = [this.value];
        // this.$info('FormComponentWrapper created', this.component, this.selectedValue);
        return true;
      }
      return false;
    },
    hasTitleImage(name) {
      if (name === 'hasTitleImage') {
        this.component = 'hasTitleImageField';
        this.selectedValue = [this.value];
        // this.$info('FormComponentWrapper created', this.component, this.selectedValue);
        return true;
      }
      return false;
    },
    isDescription(name) {
      const fieldList = [
        'hasDescription',
        'hasAppliedMethodDescription',
        'hasArrangement',
        'hasCompleteness',
        'hasEditorialPractice',
        'hasExtent',
        'hasNamingScheme',
        'hasNote',
        'hasSeriesInformation',
        'hasTableOfContents',
        'hasTechnicalInfo',
        'hasWKT',
      ];
      if (fieldList.includes(name)) {
        this.component = 'v-textarea';
        return true;
      }
      return false;
    },
    hasTemporalCoverageIdentifier(name) {
      if (name === 'hasTemporalCoverageIdentifier') {
        this.component = 'HasTemporalCoverageIdentifierField';
        this.selectedValue = [this.value];
        return true;
      }
      return false;
    },
    isRecommended() {
      if (this.properties.recommendedClass) {
        this.$log('schemas', this.properties.recommendedClass, this.schema);
        return this.properties.recommendedClass.toLowerCase().includes(this.schema);
      }
      return false;
    },
  },
  computed: {
    properties() {
      const schemas = Object.keys(this.$store.state.JSONschema.schemas);
      for (let i = 0; i < schemas.length; i += 1) {
        if (this.$store.state.JSONschema.schemas[schemas[i]].properties[this.name]) {
          return this.$store.state.JSONschema.schemas[schemas[i]].properties[this.name];
        }
      }
      return '';
    },
  },
  created() {
    // if this -> mapping happens in the hasIdentifierFunciton
    if (this.hasIdentifier(this.name)) return;
    if (this.hasTitleImage(this.name)) return;
    // if (this.hasTemporalCoverageIdentifier(this.name)) return;
    if (this.isDescription(this.name)) return;

    let c = this.componentNameMap[this.name];
    this.$log('type', this.type, this.name);
    if (!c) {
      // const typeL = this.type.toLowerCase();
      c = this.componentTypeMap[this.type];
    }
    if (!c) {
      c = { type: this.type, name: 'autocompdefault' };
    }

    this.component = c.name;
    this.mappedType = c.type;
    if (this.type === 'date' && Array.isArray(this.value)) this.selectedValue = [this.value[0]];
    else {
      this.selectedValue = (Array.isArray(this.value) ? this.value : [this.value]);
    }
  },
  updated() {
    /*
    if (this.value) {
      if (this.type === 'date' && Array.isArray(this.value)) {
        this.selectedValue = [this.value[0]];
      } else {
        this.selectedValue = [this.value];
      }
    }
    */
  },
};
</script>
