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
        :index="index"
        :properties="properties"
        persistent-hint
        rows="2"
        auto-grow
        :append-icon="(properties.required && index === 0) ? '*' : ''"
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
import { mapGetters } from 'vuex';

import HELPERS from '../../helpers';
import autocompdefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
import HasTitleImageField from './HasTitleImageField';
import AutocompVocabs from './AutocompVocabs';
import BetterDatePicker from './BetterDatePicker';
import AnyUriField from './AnyUriField';
// import HasTemporalCoverageIdentifierField from './HasTemporalCoverageIdentifierField';
/* eslint no-param-reassign: ["error", { "props": false }] */

const defaultComponentObject = {
  type: '',
  name: 'v-text-field',
};
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
        date: 'BetterDatePicker',
        string: defaultComponentObject,
        text: defaultComponentObject,
        anyURI: 'AnyUriField',
        // anyURI: defaultComponentObject,
        positiveinteger: defaultComponentObject,
        literal: defaultComponentObject,
        '': defaultComponentObject,
      },
      // for Mapping matching names to components.
      componentNameMap: {
        hasLifeCycleStatus: { name: 'AutocompVocabs', type: 'ARCHE_LIFECYCLE_STATUS' },
        hasCategory: { name: 'AutocompVocabs', type: 'ARCHE_CATEGORY' },
        hasAccessRestriction: { name: 'AutocompVocabs', type: 'ARCHE_ACCESS_RESTRICTIONS' },
        hasDescription: 'v-textarea',
        hasAppliedMethodDescription: 'v-textarea',
        hasArrangement: 'v-textarea',
        hasCompleteness: 'v-textarea',
        hasEditorialPractice: 'v-textarea',
        hasExtent: 'v-textarea',
        hasNamingScheme: 'v-textarea',
        hasNote: 'v-textarea',
        hasSeriesInformation: 'v-textarea',
        hasTableOfContents: 'v-textarea',
        hasTechnicalInfo: 'v-textarea',
        hasWKT: 'v-textarea',
        hasTitleImage: 'hasTitleImageField',
        hasIdentifier: 'HasIdentifierField',
        // hasTemporalCoverageIdentifier: 'HasTemporalCoverageIdentifierField',
      },
    };
  },
  computed: {
    ...mapGetters('JSONschema', [
      'getSchema',
    ]),
    properties() {
      const schemas = Object.keys(this.getSchema());
      for (let i = 0; i < schemas.length; i += 1) {
        if (this.getSchema(schemas[i]).properties[this.name]) {
          return this.getSchema(schemas[i]).properties[this.name];
        }
      }
      return '';
    },
  },
  created() {
    let c = this.componentNameMap[this.name];
    this.$log('type', this.type, this.name, this.value);
    if (!c) {
      // const typeL = this.type.toLowerCase();
      c = this.componentTypeMap[this.type];
    }
    if (!c) c = { type: this.type, name: 'autocompdefault' };
    if (typeof c !== 'object') c = { name: c, type: '' };
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
