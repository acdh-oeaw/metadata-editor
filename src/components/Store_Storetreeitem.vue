<template>
  <v-layout @click="$emit('input', chosenItem)" column :class="{ greyBg: !bg, selected: this.uri === this.$route.query.uri }">
    <v-flex xs12>
      <v-layout row class="itemline" v-on:click="expanded = !expanded">
        <v-icon v-if="!expanded && children.length > 0"  class="pointer">chevron_right</v-icon>
        <v-icon v-if="expanded && children.length > 0"  class="pointer">expand_more</v-icon>
        <v-icon v-if="children.length == 0" style="opacity:0;">expand_more</v-icon>
        <v-icon v-bind:class="{ expanded: 'teal lighten-3' }">{{ typeicon(getArcheTypeString(uri.id)) }}</v-icon>
        <v-icon v-if="$store.state.JSONschema.unsaved[this.uri.id]">build</v-icon>
        <v-layout grid-list-xs class="ml-2" column justify-center>
            <div class="itemcaption caption">
              {{ title }}
            </div>
        </v-layout>
        <v-spacer></v-spacer>
        <v-flex xs1 >
          <div class="itemtoolbar">
            <v-layout row>
                <v-tooltip bottom v-if="$store.state.JSONschema.unsaved[this.uri.id]">
                  <v-icon slot="activator" @click="save" color="success">save</v-icon>
                  <span>Save Changes</span>
                </v-tooltip bottom>
                <v-tooltip bottom v-if="$store.state.JSONschema.unsaved[this.uri.id]">
                  <v-icon slot="activator"  @click="discard" color="warning">clear</v-icon>
                  <span>Discard Changes</span>
              </v-tooltip bottom>
              <v-tooltip bottom>
                <v-icon slot="activator" @click="edit" color="primary">create</v-icon>
                <span>Edit {{ title }}</span>
              </v-tooltip bottom>
              <v-tooltip bottom>
                <v-icon slot="activator" @click="clear" color="error">delete_forever</v-icon>
                <span>Delete {{ title }}</span>
              </v-tooltip bottom>
            </v-layout>
          </div>
        </v-flex>
      </v-layout >
    </v-flex>
    <transition :duration="200" name="fadeDown" mode="in-out">
      <v-flex xs12 v-if="expanded && children.length > 0">
        <v-layout row wrap v-for="(item, i) in children" :key="i" >
          <v-flex xs12>
            <item :uri="item" class="ml-2"></item>
          </v-flex>
        </v-layout>
      </v-flex>
    </transition>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import item from './Store_Storetreeitem';

/* eslint no-unused-vars: ["error", {"args": "none"}] */
/* eslint no-console: ["error", { allow: ["log"] }] */

export default {
  data() {
    return {
      expanded: false,
      children: [],
      chosenItem: {},
      title: '',
    };
  },
  name: 'item',
  props: [
    'uri',
    'bg',
    'itemFull',
  ],
  components: {
    item,
  },
  computed: {
    ...mapGetters('n3', [
      'getQuads',
      'getArcheTitle',
      'getUpdate',
      'getType',
      'getArcheTypeString',
    ]),
  },
  watch: {
    getUpdate(oldV, newV) {
      this.$info('getUpdate', oldV, newV);
      this.update();
    },
  },
  methods: {
    ...mapActions('n3', [
      'RemoveSubject',
      'ObjectToStore',
    ]),
    ...mapMutations('dialogs', [
      'setDialog',
      'closeDialog',
    ]),
    ...mapMutations('JSONschema', [
      'queryToEntry',
      'deleteEdit',
    ]),
    getChildren(uri) {
      let children = this.getQuads(
        { predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf',
          object: uri,
        });
      // in case "absolute" URIs are being used...
      if (children.length === 0) {
        const id = this.getQuads(
          {
            subject: uri,
            predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasIdentifier',
          });
        if (id.length > 0) {
          children = this.getQuads(
            { predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf',
              object: id[0].object.id,
            });
        }
      }
      if (children.length > 0) {
        let idx = children.length - 1;
        while (idx + 1) {
          this.children.push(children[idx].subject);
          idx -= 1;
        }
      }
    },
    update() {
      // TODO: there needs to be some URI validation here and in the
      // root storetree + probably in the module itself
      this.getChildren(this.uri.id);
    },
    clear() {
      if (this.$store.state.n3.deletePrompt) {
        this.setDialog({ name: 'deletesubjectdialog', obj: { status: true, uri: this.uri.id } });
      } else {
        this.RemoveSubject(this.uri.id);
      }
    },
    edit() {
      const type = this.getArcheTypeString(this.uri.id);
      let query;
      if (this.$store.state.JSONschema.unsaved[this.uri.id]) {
        this.$log('Previous Edit found!');
        query = this.$store.state.JSONschema.unsaved[this.uri.id].model;
      } else {
        this.$log('No previous Edit found!');
        query = this.QuadsToObject(this.getQuads({ subject: this.uri.id }));
      }
      this.queryToEntry({ name: 'edit', query, type, subject: this.uri.id });
      this.setDialog({ name: 'editsubjectdialog', obj: { status: true } });
    },
    save() {
      const edit = this.$store.state.JSONschema.unsaved[this.uri.id];
      this.saveSubjectChanges(
        this.uri.id,
        edit.model,
        this.$store.state.JSONschema.schemas[edit.schema],
      );
    },
    discard() {
      this.deleteEdit({ subject: this.uri.id });
    },
    typeicon(typ) {
      this.$log(typ);
      if (typ) {
        switch (typ) {
          case 'resource':
            return 'developer_board';
          case 'persons':
          case 'person':
            return 'person';
          case 'places':
          case 'place':
            return 'place';
          case 'organisations':
          case 'organisation':
            return 'device_hub';
          case 'ARCHE_CATEGORY':
            return 'folder_open';
          case 'ARCHE_LIFECYCLE_STATUS':
            return 'donut_large';
          case 'X':
            return 'highlight_off';
          case 'CHECK':
            return 'check_circle';
          case 'KEYBOARD':
            return 'keyboard';
          default: return 'folder';
        }
      }
      return 'folder';
    },
    QuadsToObject(quads) {
      const params = {};
      for (let i = 0; i < quads.length; i += 1) {
        if (params[quads[i].predicate.id.replace('https://vocabs.acdh.oeaw.ac.at/schema#', '')]) {
          params[quads[i].predicate.id.replace('https://vocabs.acdh.oeaw.ac.at/schema#', '')].push(quads[i].object.id.replace(/"/g, ''));
        } else {
          params[quads[i].predicate.id.replace('https://vocabs.acdh.oeaw.ac.at/schema#', '')] = [quads[i].object.id.replace(/"/g, '')];
        }
      }
      return params;
    },
  },
  mounted() {
    this.chosenItem = this.itemFull;
    this.update();
    this.title = this.getArcheTitle(this.uri.id).id.replace(/"/g, '');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.itemline {
  width:100%;
}

.itemtoolbar {
  position: absolute;
  right: -80px;
  width: 0px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.8;
  -webkit-transition: right 0.3s;
  transition: right 0.3s;
}

.itemline:hover .itemtoolbar {
  right: 0px;
  width: auto;
  padding-right: 10px;
  overflow: hidden;
}

.itemtoolbar .tooltip:nth-child(2) {
  padding-right: 3px;
}


.itemcaption {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.greyBg {
  background-color: #EEE;
}
.selected {
  background-color: #80CBC4;
}
</style>
