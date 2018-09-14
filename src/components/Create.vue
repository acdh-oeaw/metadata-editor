<template>
<v-container class="mt-4">
  <div id="testing" v-if="testing">
    <p>Model for debugging: {{ formModel }}</p>
    <h3>Test Autocomplete for Vocabs</h3> ARCHE_CATEGORY (eg.: sound):
    <AutocompVocabs type='ARCHE_CATEGORY' name='ArcheLifeCycleStatus' v-model="testVocabs"></AutocompVocabs>
    {{ testVocabs }}<br><br> ARCHE_LIFECYCLE_STATUS (eg.: active):
    <FormComponentWrapper name='ArcheCategory' v-model="testARCHE_LIFECYCLE_STATUS"></FormComponentWrapper>
    {{ testARCHE_LIFECYCLE_STATUS }}
    <FormComponentWrapper type='vocabstest' name='Test Vocabs via autocomplete' v-model="testVocabs2"></FormComponentWrapper>
    {{ testVocabs2 }} <br><br>

    <h3>Test identifier field:</h3>
    <p>existing identifier for testing is below:</p>
    https://id.acdh.oeaw.ac.at/pub-calvetrobin1997
    <HasIdentifierField name="allow existing Identifiers" v-model="hifTest"></HasIdentifierField>

    <HasIdentifierField forbidExistingIdentifiers="true" name="forbid Existing IDs"></HasIdentifierField>
    <p>v-model for first field: {{ hifTest }}</p>
  </div>

  <v-layout row wrap>
    <v-flex xs12 md3 class="mr-2">
      <storetree class="tree"></storetree>
    </v-flex>
    <v-flex xs12 md8>
      <v-tabs>
        <v-tab v-for="tab in tabs" :key="tab.name" ripple>
          {{ tab.name }}
        </v-tab>
        <v-tab-item v-for="(tab, index) in tabs" :key="tab.name" lazy>
          <formfromschema v-model="formModel[index]" :type="tab.type" :uniqueName="tab.name" :edit="false"></formfromschema>
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import {
  mapMutations, mapGetters,
} from 'vuex';
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
  computed: {
    tabs() {
      return this.$store.state.JSONschema.tabs;
    },
    ...mapGetters('n3', [
      'getQuads',
    ]),
  },
  data() {
    return {
      testModel: '',
      testVocabs: '',
      testVocabs2: '',
      formModel: [],
      hifTest: '',
      testARCHE_LIFECYCLE_STATUS: '',
      testing: false,
    };
  },
  methods: {
    ...mapMutations('JSONschema', [
      'addTab',
      'removeTab',
    ]),
    nameToType(name) {
      return name.substring(name.lastIndexOf('#') + 1).toLowerCase();
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree {
  max-height: 80vh;
  overflow: auto;
}
</style>
