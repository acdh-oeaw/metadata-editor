<template>
  <div class="">
    <div class="appbartoggle" v-on:click="appbar = !appbar">
      <i class="fas fa-arrow-right"  style="color:#000000" v-if="!appbar"></i>
      <i class="fas fa-arrow-left" style="color:#ffffff" v-if="appbar"></i>
    </div>
    <div style="display: flex; flex-direction: row; ">
      <transition :duration="200" name="slideLeft" mode="out-in">
        <FundamentAppBar :menu="menu" v-if="appbar"></FundamentAppBar>
      </transition>
      <div style="display: flex; flex-direction: column;width:100%;">
        <FundamentNav :menu="menu" v-if="!appbar"></FundamentNav>
        <div class="mt-3">
          <transition :duration="250" name="fadeUp" mode="out-in">
            <router-view name="Content"></router-view>
          </transition>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <!-- store recovery -->
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
  import axios from 'axios';
  import { mapActions, mapMutations } from 'vuex';
  import FundamentNav from './FundamentNav';
  import FundamentAppBar from './FundamentAppBar';
  import HELPERS from '../helpers';

  /* eslint no-console: ["error", { allow: ["log"] }] */
  /* eslint no-return-assign: "off" */

  export default {
    components: {
      FundamentNav,
      FundamentAppBar,
    },
    mixins: [HELPERS],
    data() {
      return {
        menu: {},
        date: '',
        appbar: false,
        modalShow: false,
        latestSession: null,
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
      axios.get('/static/nav.json')
        .then(res => (this.menu = res.data))
        .catch(error => this.$log(error));
      this.setOntology('static/acdh-schema.owl');
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .appbartoggle {
    position: fixed;
    top:20px;
    left: 20px;
    z-index: 1000000;
    font-size: xx-large;
    cursor: pointer;
  }
</style>
