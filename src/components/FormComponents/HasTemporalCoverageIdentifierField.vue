<template>
<div>
  <v-text-field
    :label="name"
    :hint="hint"
    persistent-hint
    v-model="CovID"
    @input="validation(CovID)"
  ></v-text-field>
  <v-progress-linear
      v-if="loading && CovID"
      height="3"
      indeterminate
      color="primary"
    ></v-progress-linear>
  <span v-else-if="!CovID"></span>
  <span v-else-if="validID">Valid ID</span>
  <span v-else>Invalid ID</span>
</div>
</template>

<script>
// import debounce from 'debounce';
import HELPERS from '../../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */
/* eslint-disable func-names */
// ^this is necessary due to debounce.


export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
    'value',
    'hint',
  ],
  name: 'HasTemporalCoverageIdentifierField',
  data() {
    return {
      CovID: this.value || '',
      validID: false,
      loading: false,
    };
  },
  methods: {
    validation(uri) {
      this.loading = true;
      this.getPeriodByURI(uri).then((res) => {
        this.$log('covid', res);
        this.validID = res;
        this.loading = false;
      });
    },
  },
};
</script>

<style>
</style>
