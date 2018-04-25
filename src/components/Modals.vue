<template lang="html">
  <!-- Modals -->
  <!-- store recovery -->
  <div>
    <b-modal @ok="clearStore()" v-model="modalShow" hide-footer id="askForStore" title="Session Recovery">
      <p class="my-4">Hey! you have an old session. It is from {{date}} (dd/mm/yy). Do you want to restore it?</p>
      <b-button @click="restore" size="lg" variant="primary">
        Recover
      </b-button>
      <b-button @click="discard" size="lg" variant="secondary">
        Discard
      </b-button>

    </b-modal>
    <!-- store deletion -->
    <b-modal  id="clearCacheModal"
              title="Clear Cache"
              ok-variant="danger"
              @ok="clearStore()">
      <p class="my-4">Are you Sure to delete  {{ $store.state.n3.tripleCount }} Triples containing
  {{ Object.keys($store.state.n3.subjects).length }} Subjects from your Store? This can not be undone!</p>
      <div slot="modal-ok" size="lg" variant="danger">
        Clear
      </div>
      <div slot="modal-cancel" size="lg" variant="secondary">
        Cancel
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  data() {
    return {
      modalShow: false,
      latestSession: null,
      date: '',
    };
  },
  methods: {
    ...mapActions('jowl', [
      'setOntology',
      'constructJOWL',
    ]),
    ...mapMutations('JSONschema', [
      'constructJSONschema',
    ]),
    ...mapActions('n3', [
      'constructN3',
    ]),
    ...mapMutations('app', [
      'toggleMode',
    ]),
    clearStore() {
      this.$info('clearStore');
      this.clearCache();
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
    discard() {
      this.modalShow = false;
      this.deleteOldSessions();
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
