<template>
  <v-select
    :loading="loading"
    :items="items"
    :rules="[() => select.length > 0 || 'You must choose at least one']"
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
      <!-- ARCHE -->
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
  </v-select>
</template>

<script>
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
  name: 'AutocompDefault',
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: this.value || [],
    };
  },
  watch: {
    search() {
      this.querySelections(this.search);
    },
  },
  methods: {
    querySelections(val) {
      this.loading = true;
      // this.$info(vm);

      this.splitToGetMultipleCalls(val, this.type)
      .then((res) => {
        this.$debug('res win', res);
        let results = [];
        if (Array.isArray(res) && res[0]) {
          this.$debug('autocompde res', res);
          results = res;
        }

        // map to items //title url type
        for (let i = 0; i < results.length; i += 1) {
          const it = results[i];
          if (it.title) {
            this.items.push({ title: it.title, uri: it.uri, type: it.type });
          } else if (it.prefLabel) {
            this.items.push({ title: it.prefLabel, uri: it.uri, type: it.type });
          }
        }

        // manual typed word
        this.items.push({ title: val, uri: val, type: 'keyboard' });
        this.loading = false;
      })
      .catch((res) => {
        this.$debug('res fail', res);
        this.loading = false;
      });
    },
    /*
    typeicon(type) {
      return this.IconByRepoType(type);
    },
    */
  },
  created() {
    if (this.value) {
      this.querySelections('a');
    }
  },
};
</script>
