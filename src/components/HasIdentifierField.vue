<template>
  <v-select
    :loading="loading"
    :items="items"
    :rules="[() => select.length === 1 || 'You must choose exactly one']"
    :search-input.sync="search"
    v-model="select"
    :label="name"
    autocomplete
    multiple
    cache-items
    chips
    required
    item-text="title"
    item-value="uri"
    @input="$emit('input', select)"
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
        <v-list-tile-content @click="openPopUp(data.item)">
          <v-list-tile-title v-html="data.item.title"></v-list-tile-title>
          <v-list-tile-sub-title v-html="data.item.uri"></v-list-tile-sub-title>
        </v-list-tile-content>
      </template>
    </template>
  </v-select>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */


export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
    'value',
  ],
  name: 'HasIdentifierField',
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: this.value || [],
      iForDes: -1,
      manuallySelectedItem: false,
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
      // this.$info(vm);

      this.isIdentifier(val)
        .then((res) => {
          if(res) {
            this.items.push({title: val, uri: 'already Exists as identifier', type: 'X', exists: true });
          } else {
            this.items[0] = {title: val, uri: 'Does not yet exist as identifier', type: 'check', exists: true };
          }
        })
        .catch((res) => {
          this.$debug('res fail', res);
          this.loading = false;
        });
    },
    existsAsIdentifer() {
      return { title: 'Click Here to select from store or to add a new Entry', uri: 'selectFromStoreOrTypeInNewOne', type: 'keyboard', openPopUp: true };
    },
  },
  watch: {
    search() {
      this.querySelections(this.search);
    },
    newItem(after, before) {
      if (!this.manuallySelectedItem) {
        return;
      }
      if (after.delete) { // dialog got canceld
        this.select.splice(this.select.length - 1);
        this.manuallySelectedItem = false;
        return;
      }
      if (!after.changedItem) { // item did not get changed
        return;
      }
      // change occoured
      this.$info('HasIdentifierField -> newSubject before, after, manuallySelectedItem', before, after, this.manuallySelectedItem);
      this.$debug('bef aft: ', JSON.stringify(this.newItem));
      this.$debug('after exists, select:', this.select);
      this.items[this.nStoreSelected].title = this.getTitle(after.changedItem.subject);
      this.items[this.nStoreSelected].uri = after.changedItem.subject;
      if(this.items.length > this.nStoreSelected+1) {
        this.$debug('items', this.items);
        this.items.push(this.items[this.nStoreSelected+1]);
        this.items[++this.nStoreSelected] = this.storeSeletItem();
      } else {
        this.items.push(this.storeSeletItem());
      }

      this.select.splice(this.select.length - 1);
      this.select.push(after.changedItem.subject);
      this.manuallySelectedItem = false;
      this.$emit('input', this.select);
    },
    $route(to) {
      if (this.value) {
        this.$log('selection', this.select, this.value);
        for (let i = 0; i < Object.keys(to.query).length; i += 1) {
          if (Object.keys(to.query)[i] === this.name) {
            this.$log('selection name', this.value, to.query[Object.keys(to.query)[i]]);
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
        this.$log('selection items', this.items);
      }
    },
  },
  created() {
    if (this.value) {
      this.$log('selection', this.select, this.value);
      for (let i = 0; i < this.value.length; i += 1) {
        this.items.push({ title: this.value[i], uri: this.value[i], type: '' });
      }
    }
  },
  computed: {
    ...mapGetters('n3', [
      'getTitle',
    ]),
    newItem() {
      return this.$store.state.dialogs.addnewsubjectmodal;
    },
  },
};
</script>
