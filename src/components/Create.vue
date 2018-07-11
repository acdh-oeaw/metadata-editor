<template>
  <v-container class="mt-4">
    <div id="testing">
    <p>Model for debugging: {{ formModel }}</p>
      <h3>Test Autocomplete for Vocabs</h3>
      ARCHE_CATEGORY (eg.: sound): <AutocompVocabs type='ARCHE_CATEGORY' name='ArcheLifeCycleStatus' v-model="testVocabs"></AutocompVocabs>
      {{ testVocabs }}<br><br>
      ARCHE_LIFECYCLE_STATUS (eg.: active): <FormComponentWrapper  name='ArcheCategory' v-model="testARCHE_LIFECYCLE_STATUS"></FormComponentWrapper>
      {{ testARCHE_LIFECYCLE_STATUS }}
      <FormComponentWrapper type='vocabstest' name='Test Vocabs via autocomplete' v-model="testVocabs2"></FormComponentWrapper>
      {{ testVocabs2 }} <br><br>

      <h3>Test identifier field:</h3>
      <p>existing identifier for testing is below</p>
       https://fedora.hephaistos.arz.oeaw.ac.at/rest/44/19/55/c2/441955c2-288f-462f-92e6-c15ef46804f4
       <HasIdentifierField name="no existing ID allowed" v-model="hifTest"></HasIdentifierField>

          <HasIdentifierField allowExists="true" name="allow Existing IDs"></HasIdentifierField>

        </div>
          <p>v-model for first field: {{ hifTest }}</p>
    <v-layout row wrap>
      <v-flex xs12 md3 class="mr-2">
        <storetree class="tree"></storetree>
      </v-flex>
      <v-flex xs12 md8>
        <v-tabs><v-tab
        v-for="type in ['person', 'places', 'organisations']"
        :key="type"
        ripple
      >
        {{ type }}

      </v-tab>
      <v-tab-item
        v-for="type in ['person', 'place', 'organisation']"
        :key="type"
      >
        <formfromschema v-model="formModel" :type="type" uniqueName="uniqueFormSchema"></formfromschema>
      </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import loadfile from './Store_LoadFile';
import storetree from './Store_Storetree';
import AutocompVocabs from './AutocompVocabs';
import formfromschema from './FormFromSchema';
import AutocompDefault from './AutocompDefault';
import HasIdentifierField from './HasIdentifierField';
import HELPERS from '../helpers';
import FormComponentWrapper from './FormComponentWrapper';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  mixins: [HELPERS],
  components: {
    AutocompVocabs,
    loadfile,
    storetree,
    formfromschema,
    AutocompDefault,
    HasIdentifierField,
    FormComponentWrapper,
  },
  data() {
    return {
      testModel: '',
      testVocabs: '',
      testVocabs2: '',
      formModel: '',
      hifTest: '',
      testARCHE_LIFECYCLE_STATUS: '',
      endpoints: ['Person', 'Organisation', 'Place', 'Concept', 'Publication', 'Metadata'],
    };
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree {
  max-height: 80vh;
  overflow: auto;
}
</style>
