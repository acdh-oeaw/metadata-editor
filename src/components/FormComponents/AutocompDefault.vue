<template>
<div>
  <v-layout row wrap>
    <v-flex xs10>
      <v-autocomplete
        :loading="loading"
        :items="items"
        :rules="[() => select.length > 0 || 'You must choose at least one']"
        :search-input.sync="search"
        v-model="select"
        :label="`${name} (type to search)`"
        :hint="hint"
        persistent-hint
        multiple
        cache-items
        chips
        required
        item-text="title"
        item-value="uri"
        @input="$emit('input', select);">
        <template slot="selection" slot-scope="data">
          <v-chip :selected="data.selected" :key="JSON.stringify(data.item)" close class="chip--select-multi" @input="data.parent.selectItem(data.item)">
            <v-avatar>
              <v-icon>{{typeicon(data.item.type)}}</v-icon>
            </v-avatar>
            {{ data.item.title }}
          </v-chip>
        </template>
        <template slot="item" slot-scope="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-tile-content v-text="data.item"></v-list-tile-content>
          </template>
          <template>
            <v-list-tile-avatar>
              <v-icon>{{typeicon(data.item.type)}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
              <v-list-tile-sub-title v-html="data.item.uri"></v-list-tile-sub-title>
            </v-list-tile-content>
          </template>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex xs2>
      <div class="text-xs-center">
        <v-tooltip open-delay="600" bottom>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="openAddNewSujectDialog()">
              <v-icon>folder_open</v-icon>
            </v-btn>
          </template>
          <span>Select from store</span>
        </v-tooltip>
      </div>
    </v-flex>
  </v-layout>
</div>
</template>

<script>
import {
  mapMutations,
  mapGetters,
} from 'vuex';
import HELPERS from '../../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */
/* eslint-disable prefer-template */

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
    'value',
    'hint',
    'properties',
  ],
  name: 'AutocompDefault',
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: this.value || [],
      iForDes: -1,
      listenForStoreSelectedItem: false,
      nStoreSelected: 0,
    };
  },
  methods: {
    ...mapMutations('dialogs', [
      'setDialog',
      'setDialogPromise',
    ]),
    ...mapMutations('JSONschema', [
      'saveNames',
    ]),
    querySelections(val) {
      this.loading = true;
      // results from api
      this.getArcheByID(`${this.type}/${val}`, 'AUTOCOMPLETE')
        .then((res) => {
          this.$debug('res win', res);
          let results = [];
          if (Array.isArray(res) && res[0]) {
            this.$debug('autocompde res', res);
            results = res;
          }
          this.mapResultsToItems(results);
          this.loading = false;
        })
        .catch((res) => {
          this.$debug('res fail', res);
          this.loading = false;
        });
    },
    mapResultsToItems(results) {
      // map to items //title url type
      for (let i = 0; i < results.length; i += 1) {
        const it = results[i];
        if (it.title) {
          if (typeof it.title === 'object') {
            const keys = Object.keys(it.title);
            for (let j = 0; j < keys.length; j += 1) {
              this.items.push({
                title: `${it.title[keys[j]]} (${keys[j]})`,
                uri: it.uri,
                type: it.type,
              });
            }
          } else {
            this.items.push({
              title: it.title,
              uri: it.uri,
              type: it.type,
            });
          }
        } else if (it.prefLabel) {
          this.items.push({
            title: it.prefLabel,
            uri: it.uri,
            type: it.type,
          });
        }
      }
      this.saveNames(this.items);
    },
    openAddNewSujectDialog() {
      this.$debug('openAddNewSujectDialog(item)');
      this.listenForStoreSelectedItem = true;
      this.setDialog({
        name: 'addnewsubjectdialog',
        obj: {
          status: true,
        },
      });
    },
  },
  watch: {
    select(from, to) {
      this.$log('select to', this.select);
      if (to.length > this.properties.maxItems && this.properties.maxItems !== 0) {
        this.select.shift();
        // couldnt decide wheter to use shift or pop for this one
      }
    },
    search() {
      this.querySelections(this.search);
    },
    newItem(after, before) {
      // other autocomp or dialog got canceld:
      if (!this.listenForStoreSelectedItem || !after.addedItem) {
        return;
      }
      this.$debug('Item has changed!');
      // getArcheTitle
      // change occoured
      this.$log('AutocompDefault -> newSubject before, after, listenForStoreSelectedItem', before, after, this.listenForStoreSelectedItem);
      this.$debug('newITem: ', JSON.parse(JSON.stringify(this.newItem)));
      let item = this.newItem.addedItem.subject.value;
      this.$log('select, items', this.select, this.items);
      // if (Array.isArray(this.select))
      item = `_:${item}`;
      this.select.push(item);
      // else this.select = [item];
      this.items.push({
        title: this.getArcheTitle(item).id.replace(/"/g, ''),
        uri: item.replace(/"/g, ''),
      });

      this.listenForStoreSelectedItem = false;
      this.$emit('input', this.select);
    },
    $route(to) {
      if (this.value) {
        // this.$log('selection', this.select, this.value);
        for (let i = 0; i < Object.keys(to.query).length; i += 1) {
          if (Object.keys(to.query)[i] === this.name) {
            // this.$log('selection name', this.value, to.query[Object.keys(to.query)[i]]);
            break;
          }
        }
        if (Array.isArray(this.value)) {
          for (let i = 0; i < this.value.length; i += 1) {
            this.items.push({
              title: this.getNameByURI(this.value[i]),
              uri: this.value[i],
              type: '',
            });
          }
        } else {
          this.items.push({
            title: this.getNameByURI(this.value),
            uri: this.value,
            type: '',
          });
        }
        // this.$log('selection items', this.items);
      }
    },
  },
  created() {
    if (this.value) {
      // this.$log('selection', this.select, this.value);
      for (let i = 0; i < this.value.length; i += 1) {
        this.items.push({
          title: this.getNameByURI(this.value[i]),
          uri: this.value[i],
          type: '',
        });
      }
    }
  },
  computed: {
    ...mapGetters('dialogs', [
      'getDialog',
    ]),
    ...mapGetters('n3', [
      'getArcheTitle',
      'getQuads',
      'getType',
      'getArcheTypeString',
    ]),
    ...mapGetters('JSONschema', [
      'getNameByURI',
    ]),
    newItem() {
      return this.getDialog('addnewsubjectdialog');
    },
  },
};
</script>
