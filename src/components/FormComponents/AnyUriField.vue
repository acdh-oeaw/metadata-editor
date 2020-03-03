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
    'name',
    'value',
    'hint',
    'append-icon',
  ],
  name: 'AnyUriField',
  data() {
    return {
      CovID: this.value || '',
      validID: false,
      loading: false,
      URIRegEx: /^([a-z0-9+.-]+):(?:\/\/(?:((?:[a-z0-9-._~!$&'()*+,;=:]|%[0-9A-F]{2})*)@)?((?:[a-z0-9-._~!$&'()*+,;=]|%[0-9A-F]{2})*)(?::(\d*))?(\/(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?|(\/?(?:[a-z0-9-._~!$&'()*+,;=:@]|%[0-9A-F]{2})+(?:[a-z0-9-._~!$&'()*+,;=:@/]|%[0-9A-F]{2})*)?)(?:\?((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*))?(?:#((?:[a-z0-9-._~!$&'()*+,;=:/?@]|%[0-9A-F]{2})*))?$/,
<<<<<<< HEAD
      rules: [(value => (this.URIRegEx.test(value.toLowerCase()) || !value) || 'Invalid URI')],
=======
      rules: [(value => (this.URIRegEx.test(value) || !value) || 'Invalid URI')],
>>>>>>> 37801c88421aadb89f51c32bfaf09a44830696e5
    };
  },
  methods: {
    /*
    validation(uri) {
      this.loading = true;
      this.getPeriodByURI(uri).then((res) => {
        this.$log('covid', res);
        this.validID = res;
        this.loading = false;
      });
    },
    */
  },
};
</script>

<style>
</style>
