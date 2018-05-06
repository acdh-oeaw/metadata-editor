<template>
<main class="grid-col" role="main">
  <div class="container">
    <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
      <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
        <Storestats></Storestats>
      </div>
      <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
        <h1><a id="Cards_0"></a>Resolving Identifiers</h1>
        <p>Testing Autocompletes to resolve Identifiers</p>
        <b-tabs>
          <b-tab v-for="val in endpoints" :title="val">
            <h3><a id="Cards_0"></a>{{val}}</h3>
            <AutocompArche :type='val.toUpperCase()' :name='val' v-model="testModel" v-if="val === 'Metadata'"></AutocompArche>
            <AutocompArche :type='val.toUpperCase()+"S"' :name='val' v-model="testModel" v-else></AutocompArche>
            {{testModel}}
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
</main>
</template>

<script>
import FundamentEntity from './FundamentEntity';
import Storestats from './StoreStats';
import AutocompArche from './AutocompArche';
import AutocompVocabs from './AutocompVocabs';
import FormFromSchema from './FormFromSchema';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  mixins: [HELPERS],
  components: {
    FundamentEntity,
    AutocompArche,
    AutocompVocabs,
    FormFromSchema,
    Storestats,
  },
  data() {
    return {
      testModel: '',
      testVocabs: '',
      endpoints: ['Person', 'Organisation', 'Place', 'Concept', 'Publication', 'Metadata'],
      testARCHE_LIFECYCLE_STATUS: '',
    };
  },
  methods: {
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
