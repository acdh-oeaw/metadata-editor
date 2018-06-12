<template>
<v-container class="mt-4">
  <div id="testing">
    <h3>Test Autocomplete for Vocabs</h3>
    ARCHE_CATEGORY (eg.: sound): <AutocompVocabs type='ARCHE_CATEGORY' name='Test Vocabs' v-model="testVocabs"></AutocompVocabs>
    {{ testVocabs }}<br><br>
    <AutocompDefault type='vocabstest' name='Test Vocabs via autocomplete' v-model="testVocabs2"></AutocompDefault>
    {{ testVocabs2 }} <br><br>
    ARCHE_LIFECYCLE_STATUS (eg.: active): <AutocompVocabs type='ARCHE_LIFECYCLE_STATUS' name='Test ARCHE_LIFECYCLE_STATUS' v-model="testARCHE_LIFECYCLE_STATUS"></AutocompVocabs>
    {{ testARCHE_LIFECYCLE_STATUS }}
  </div>
  <v-layout row wrap>
    <v-flex xs12 md3 class="mr-2">
      <storetree class="tree"></storetree>
    </v-flex>
    <v-flex xs12 md8>
      <formfromschema v-model="formModel" type="collection" uniqueName="uniqueFormSchema"></formfromschema>
      <p>Model for debugging: {{ formModel }}</p>
    </v-flex>
  </v-layout>
</v-container>

<!-- <main class="grid-col" role="main">
  <div class="container">
    <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
      <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
        <Storestats></Storestats>
      </div>
      <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
        <h1><a id="Cards_0"></a>Resolving Identifiers</h1>
        <p>Testing Autocompletes to resolve Identifiers</p>
        <v-tabs>
          <v-tab v-for="title in endpoints">
            {{ title }}
          </v-tab>
          <v-tab-item v-for="val in endpoints">
            <h3><a id="Cards_0"></a>{{val}}</h3>

            <h1><a id="Cards_0"></a>Form From Schema</h1>
            <p>Testing Form from Schema</p>
            <FormFromSchema :uniqueName="val" :type="val"></FormFromSchema>

          </b-tab><br>
          <div id="testing">
            <h3>Test Autocomplete for Vocabs</h3>
            ARCHE_CATEGORY (eg.: sound): <AutocompVocabs type='ARCHE_CATEGORY' name='Test Vocabs' v-model="testVocabs"></AutocompVocabs>
            {{ testVocabs }}<br><br>
            ARCHE_LIFECYCLE_STATUS (eg.: active): <AutocompVocabs type='ARCHE_LIFECYCLE_STATUS' name='Test ARCHE_LIFECYCLE_STATUS' v-model="testARCHE_LIFECYCLE_STATUS"></AutocompVocabs>
            {{ testARCHE_LIFECYCLE_STATUS }}
          </div>
        </b-tabs>
      </div>

    </div>

  </div>
</main> -->
</template>

<script>
import loadfile from './Store_LoadFile';
import storetree from './Store_Storetree';
import AutocompVocabs from './AutocompVocabs';
import formfromschema from './FormFromSchema';
import AutocompDefault from './AutocompDefault.vue';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  mixins: [HELPERS],
  components: {
    AutocompVocabs,
    loadfile,
    storetree,
    formfromschema,
    AutocompDefault,
  },
  data() {
    return {
      testModel: '',
      testVocabs: '',
      testVocabs2: '',
      formModel: '',
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
