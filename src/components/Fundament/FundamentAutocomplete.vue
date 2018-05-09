<template>
    <v-select
      :loading="loading"
      :items="items"
      :rules="[() => select.length > 0 || 'You must choose at least one']"
      :search-input.sync="search"
      v-model="select"
      :label="type"
      autocomplete
      multiple
      cache-items
      chips
      required
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
            <v-icon>person</v-icon>
          </v-avatar>
          {{ data.item.title }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-avatar>
            <v-icon>person</v-icon>
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
import HELPERS from '../../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
  mixins: [HELPERS],
  props: [
    'type', 'name',
  ],
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: [],
    };
  },
  watch: {
    search(val) {
      return val && this.querySelections(val);
    },
  },
  methods: {
    querySelections() {
      this.loading = true;
      // this.$info(vm);
      this.getArcheByID(escape(this.search), this.type)
      .then((res) => {
        if (Array.isArray(res)) this.items = res;
        console.log(this.items);
        this.loading = false;
      });
    },
  },
};
</script>
