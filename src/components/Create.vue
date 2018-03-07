<template>
    <main class="grid-col" role="main">
      <div class="container">
        <div class="main-content row flex-xl-nowrap bg-white box-shadow element-border">
          <div class="col-12 col-md-3 col-xl-2 bd-sidebar">
            <nav class="collapse bd-links" id="bd-docs-nav">
            </nav>
          </div>
          <div class="col-12 col-md-9 col-xl-10 page-content-w-sidebar">
            <h1><a id="Cards_0"></a>Resolving Identifiers</h1>
            <p>Testing Autocompletes to resolve Identifiers</p>
            <h3><a id="Cards_0"></a>Persons</h3>
            <Autocomparche type='PERSONS' name='Person'></Autocomparche>
            <h3><a id="Cards_0"></a>Places</h3>
            <Autocomparche type='PLACES' name='Place'></Autocomparche>

            <h1><a id="Cards_0"></a>Form From Schema</h1>
            <p>Testing Form from Schema</p>
            <FormFromSchema type="person"></FormFromSchema>
          </div>
        </div>
      </div>
    </main>
</template>

<script>
import Fundamententity from './Fundamententity';
import Autocomparche from './Autocomparche';
import FormFromSchema from './FormFromSchema';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
  mixins: [HELPERS],
  components: {
    Fundamententity,
    Autocomparche,
    FormFromSchema,
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
