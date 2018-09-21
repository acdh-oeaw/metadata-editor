<template>
  <div>
    <v-autocomplete
      :loading="loading"
      :items="items"
      :rules="[() => select.length > 0 || 'You must choose at least one']"
      :search-input.sync="search"
      v-model="select"
      :label="name"
      multiple
      cache-items
      chips
      required
      item-text="title"
      item-value="uri"
      @input="$emit('input', select);"
      >
      <template slot="selection" slot-scope="data">
        <v-chip
          :selected="data.selected"
          :key="JSON.stringify(data.item)"
          close
          class="chip--select-multi"
          @input="data.parent.selectItem(data.item)"
        >
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
    <v-btn @click="openAddNewSujectDialog()">select from store</v-btn>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */
/* eslint-disable prefer-template */

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
    'value',
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
    querySelections(val) {
      this.loading = true;
      // results from api
      this.getArcheByID(this.type + '/' + val, 'AUTOCOMPLETE')
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
          this.items.push({ title: it.title, uri: it.uri, type: it.type });
        } else if (it.prefLabel) {
          this.items.push({ title: it.prefLabel, uri: it.uri, type: it.type });
        }
      }
    },
    openAddNewSujectDialog() {
      this.$debug('openAddNewSujectDialog(item)');
      this.listenForStoreSelectedItem = true;
      this.setDialog({
        name: 'addnewsubjectmodal',
        obj: {
          status: true,
        },
      });
    },
  },
  watch: {
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
      this.$debug('newITem: ', JSON.stringify(this.newItem));
      const item = this.newItem.addedItem;
      // let title = this.getArcheTitle(item.subject.value);
      this.select.push(item.subject.value);
       this.items.push(
        {
          title: item.subject.value,
          uri: item.subject.value,
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
            this.items.push({ title: this.value[i], uri: this.value[i], type: '' });
          }
        } else {
          this.items.push({ title: this.value, uri: this.value, type: '' });
        }
        // this.$log('selection items', this.items);
      }
    },
  },
  created() {
    if (this.value) {
      // this.$log('selection', this.select, this.value);
      for (let i = 0; i < this.value.length; i += 1) {
        this.items.push({ title: this.value[i], uri: this.value[i], type: '' });
      }
    }
  },
  computed: {
    ...mapGetters('n3', [
      'getArcheTitle',
      'getQuads',
      'getType',
      'getArcheTypeString',
    ]),
    newItem() {
      return this.$store.state.dialogs.addnewsubjectmodal;
    },
  },
};
</script>
