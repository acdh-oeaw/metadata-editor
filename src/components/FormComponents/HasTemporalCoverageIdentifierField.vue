<template>
<div>
  <v-text-field
    :label="name"
    :hint="hint"
    persistent-hint
    v-model="CovID"
    :rules="rules"
  ></v-text-field>
  <v-progress-linear
      v-if="loading && CovID"
      height="3"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <!--
  <span v-else-if="!CovID"></span>
  <span v-else-if="validID">Valid ID</span>
  <span v-else>Invalid ID</span>
    -->
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
    'append-icon',
  ],
  name: 'HasTemporalCoverageIdentifierField',
  data() {
    return {
      CovID: this.value || '',
      validID: false,
      loading: false,
      URIRegEx: /^([a-z0-9+.-]+):(?:\/\/(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(?::(\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?|(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*))?$/,
      rules: [(value => this.URIRegEx.test(value) || 'Invalid URI')],
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
