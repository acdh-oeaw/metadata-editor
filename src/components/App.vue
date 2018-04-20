<template>
  <div class="">
    <FundamentNav></FundamentNav>
    <router-view name="Content"></router-view>
    <FundamentFooter></FundamentFooter>
    <!-- Modal Component -->
    <b-modal v-model="modalShow" hide-footer id="askForStore" title="Session Recovery">
      <p class="my-4">Hey! you have an old session. It is from {{date}} (dd/mm/yy). Do you want to restore it?</p>
      <b-button @click="restore" size="lg" variant="primary">
        Recover
      </b-button>
      <b-button @click="discard" size="lg" variant="secondary">
        Discard
      </b-button>

    </b-modal>
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
        date: '',
        modalShow: false,
        latestSession: null,
      };
    },
    methods: {
      ...mapActions('jowl', [
        'setOntology',
        'constructJOWL',
      ]),
      ...mapActions('JSONschema', [
        'constructJSONschema',
      ]),
      ...mapActions('n3', [
        'constructN3',
      ]),
      restore() {
        // this.constructJOWL(this.latestSession);
        // this.constructJSONschema(this.latestSession);
        this.constructN3(this.latestSession);
        this.modalShow = false;
        this.deleteOldSessions();
      },
      discard() {
        this.modalShow = false;
      },
    },
    created() {
      this.setOntology('static/acdh-schema.owl');
      this.latestSession = this.getLatestSession();
      this.$log('latestSession', this.latestSession);
      this.date = this.dateToString(new Date(this.latestSession.date));
      this.modalShow = true;
    },
  };
</script>
