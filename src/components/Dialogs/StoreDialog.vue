<template lang="html">
    <v-dialog v-model="dialogShow" id="askForStore" max-width="500px" persistent>
      <v-card>
        <v-card-title>
          Session Recovery
        </v-card-title>
        <v-card-text>
          Hey! you have an old session. It is from {{date}} (DD/MM/YY hh:mm:ss). Do you want to keep it?
        </v-card-text>
        <v-card-actions>
        <v-btn @click="restore" large color="primary">
          Keep
        </v-btn>
        <v-btn @click="discard" large color="secondary">
          Discard
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import HELPERS from '../../helpers';

export default {
  data() {
    return {
      dialogShow: false,
      latestSession: null,
      date: '',
    };
  },
  mixins: [HELPERS],
  computed: {
    ...mapGetters('n3', [
      'getTtlString',
    ]),
    tabs() {
      return this.$store.state.JSONschema.tabs;
    },
  },
  methods: {
    ...mapMutations('JSONschema', [
      'constructJSONschema',
      'setSchema',
    ]),
    ...mapMutations('app', [
      'constructApp',
    ]),
    ...mapMutations('batchCreate', [
      'constructBatchCreate',
    ]),
    ...mapMutations('config', [
      'constructConfig',
    ]),
    ...mapActions('n3', [
      'ConstructN3',
      'StringToStore',
    ]),
    ...mapMutations('localStorageInfo', [
      'constructLocalStorageInfo',
    ]),
    ...mapMutations('dialogs', [
      'constructDialogs',
    ]),
    ...mapMutations('dialogs', [
      'openDialog',
      'setDialog',
      'addToFailed',
      'clearFailed',
      'removeFromFailed',
    ]),
    discard() {
      this.dialogShow = false;
      this.deleteOldSessions();
      this.initAllSchemas();
      this.$router.go(this.$router.currentRoute);
    },
    /*
    used to initialize schemas so they are ready to be worked with
    */
    initSchema(type) {
      this.$info('init Schema:', type);
      if (!type) { return; }
      if (this.$store.state.JSONschema.schemas && this.$store.state.JSONschema.schemas[type]) {
        return; // already there
      }

      this.getMetadataByType(type).then((res) => {
        // this.$log('Fetching Metadata', type, res);
        this.setSchema({ name: type, schema: res });
      });
    },
    initAllSchemas() {
      this.$debug('init all Schemas');
      for (let i = 0; i < this.tabs.length; i += 1) {
        this.initSchema(this.tabs[i].type);
      }
    },
    checkForInternet() {
      setInterval(() => {
        if (this.$store.state.dialogs.networkPrompt) this.checkConnections();
      }, 5000);
    },
    restore() {
      this.dialogShow = false;
    },
  },
  created() {
    if (this.getTtlString) this.StringToStore(this.getTtlString);
    if (this.$store.state.localStorageInfo.lastEdit) {
      // this.$log('latestSession', this.latestSession);
      this.date = this.dateToString(new Date(this.$store.state.localStorageInfo.lastEdit));
      if (Date.now() - this.$store.state.localStorageInfo.lastEdit > 3000000) {
        this.dialogShow = true;
      }
    } else {
      this.initAllSchemas();
    }
  },
};
</script>

<style lang="css">
</style>
