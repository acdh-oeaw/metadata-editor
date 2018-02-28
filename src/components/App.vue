<template>
  <div class="">
    <FundamentNav></FundamentNav>
    <router-view name="Content"></router-view>
    <FundamentFooter></FundamentFooter>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import FundamentNav from './FundamentNav';
  import FundamentFooter from './FundamentFooter';
  import HELPERS from '../helpers';

  /* eslint no-console: ["error", { allow: ["log"] }] */
  export default {
    components: {
      FundamentNav,
      FundamentFooter,
    },
    mixins: [HELPERS],
    data() {
      return {
      };
    },
    methods: {
      ...mapActions('jowl', [
        'setOntology',
      ]),
      ...mapActions('metadata', [
        'setMetaData',
      ]),
    },
    created() {
      this.setOntology('static/acdh-schema.owl');
      this.getMetadataFromApi().then((response) => {
        console.log('i am alive getMetadataFromApi');
        this.setMetaData(response);
      });
    },
  };
</script>
