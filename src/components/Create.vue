<template>
<v-container class="mt-4">
  <v-layout row wrap>
    <v-flex xs12 md3 class="mr-2">
      <storetree class="tree"></storetree>
    </v-flex>
    <v-flex xs12 md8>
      <loadfile></loadfile>
      <archeautocomplete type="ORGANISATIONS" name="hasCreator"></archeautocomplete>
      <archeautocomplete type="PLACES" name="hasSpatialCoverage"></archeautocomplete>
      <archeautocomplete type="PERSONS" name="hasCurator"></archeautocomplete>
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
            <AutocompArche :type='val.toUpperCase()' :name='val' v-model="testModel" v-if="val === 'Metadata'"></AutocompArche>
            <AutocompArche :type='val.toUpperCase()+"S"' :name='val' v-model="testModel" v-else></AutocompArche>
            {{testModel}}

            <h1><a id="Cards_0"></a>Form From Schema</h1>
            <p>Testing Form from Schema</p>
            <FormFromSchema :uniqueName="val" :type="val"></FormFromSchema>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</main> -->
</template>

<script>
import loadfile from './Store_LoadFile';
import storetree from './Store_Storetree';
import archeautocomplete from './AutocompArche';

import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  mixins: [HELPERS],
  components: {
    loadfile,
    storetree,
    archeautocomplete,
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
.tree {
  max-height: 80vh;
  overflow: auto;
}
</style>
