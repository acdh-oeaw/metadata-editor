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
            <FormFromSchema uniqueName="mainSchema" :type="val"></FormFromSchema>
          </b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</main>
</template>

<script>
import Fundamententity from './Fundamententity';
import Storestats from './StoreStats';
import AutocompArche from './AutocompArche';
import FormFromSchema from './FormFromSchema';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  mixins: [HELPERS],
  components: {
    Fundamententity,
    AutocompArche,
    FormFromSchema,
    Storestats,
  },
  data() {
    return {
      testModel: '',
      endpoints: ['Person', 'Organisation', 'Place', 'Concept', 'Publication', 'Metadata'],
    };
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
