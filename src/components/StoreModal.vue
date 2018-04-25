<template lang="html">
    <b-modal @ok="clearStore()" v-model="modalShow" hide-footer id="askForStore" title="Session Recovery">
      <p class="my-4">Hey! you have an old session. It is from {{date}} (dd/mm/yy). Do you want to restore it?</p>
      <b-button @click="restore" size="lg" variant="primary">
        Recover
      </b-button>
      <b-button @click="discard" size="lg" variant="secondary">
        Discard
      </b-button>
    </b-modal>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HELPERS from '../helpers';

export default {
  data() {
    return {
      modalShow: false,
      latestSession: null,
      date: '',
    };
  },
  mixins: [HELPERS],
  methods: {
    ...mapMutations('JSONschema', [
      'constructJSONschema',
    ]),
    ...mapActions('n3', [
      'constructN3',
    ]),
    discard() {
      this.modalShow = false;
      this.deleteOldSessions();
    },
    restore(reload = true) {
      // this.constructJOWL(this.latestSession);
      this.constructJSONschema(this.latestSession);
      this.constructN3(this.latestSession);
      this.modalShow = false;
      this.deleteOldSessions();
      if (reload) {
        this.$router.go(this.$router.currentRoute);
      }
    },
  },
  created() {
    this.latestSession = this.getLatestSession();
    if (this.latestSession) {
      this.$log('latestSession', this.latestSession);
      this.date = this.dateToString(new Date(this.latestSession.date));
      if (Date.now() - this.latestSession.date < 300000) {
        this.restore(false);
      } else {
        this.modalShow = true;
      }
    }
  },
};
</script>

<style lang="css">
</style>
