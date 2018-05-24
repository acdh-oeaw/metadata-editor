<template>
    <v-select
<<<<<<< HEAD
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
      item-text="preLabel"
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
            <v-icon>{{typeicon(type)}}</v-icon>
          </v-avatar>
          {{ data.item.prefLabel }}
        </v-chip>
      </template>
      <template slot="item" slot-scope="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-tile-content v-text="data.item"></v-list-tile-content>
        </template>
        <template v-else>
          <v-list-tile-avatar>
            <v-icon>{{typeicon(type)}}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title v-html="data.item.prefLabel"></v-list-tile-title>
            <v-list-tile-sub-title v-html="data.item.uri"></v-list-tile-sub-title>
          </v-list-tile-content>
        </template>
=======
      label="name"
      :filterable="false"
      :options="options"
      v-model="selectedValue"
      @search="onSearch"
      @input="$emit('input', selectedValue)">

      <template slot="no-options">
        type to retrieve Options from Vocabs.
      </template>
      <template slot="option" slot-scope="option">
        <div class="d-center">
          <b-badge>VOCABS</b-badge> {{ option.prefLabel }}
          </div>
      </template>
      <template slot="selected-option" scope="option">
        <div class="selected d-center">
          <b-badge>VOCABS</b-badge> {{ option.prefLabel }}
        </div>
>>>>>>> remotes/vuetify/master
      </template>
    </v-select>
</template>

<script>
<<<<<<< HEAD
=======
import debounce from 'debounce';
>>>>>>> remotes/vuetify/master
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

export default {
  mixins: [HELPERS],
  props: [
<<<<<<< HEAD
    'type',
    'name',
  ],
  name: 'AutocompVocabs',
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
      this.querySelections(val);
    },
  },
  methods: {
    querySelections() {
      this.loading = true;
      // this.$info(vm);
      this.getVocabsByID(escape((this.search || '').trim()), this.type)
      .then((res) => {
        if (Array.isArray(res)) this.items = res.results;
        this.$log(this.items);
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
    },
    typeicon(type) {
      return this.IconByRepoType(type);
    },
  },
  created() {

  },
};
</script>
=======
    'type', 'name',
  ],
  data() {
    return {
      options: [],
      selectedValue: '',
    };
  },
  methods: {
    onSearch(search, loading) {
      this.$info('AutocompVocabs', 'onSearch(search, loading)', search, loading);
      loading(true);
      this.search(loading, search, this);
    },
    search: debounce((loading, search, vm) => {
      vm.$info(vm);
      vm.getVocabsByID(search.trim(), vm.type)
      .then((res) => {
        if (Array.isArray(res.results)) vm.options = res.results;
        else vm.options = [];
        loading(false);
      });
    }, 350),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  height: auto;
  max-width: 2.5rem;
  margin-right: 1rem;
}

.d-center {
  display: flex;
  align-items: center;
}

.selected img {
  width: auto;
  max-height: 23px;
  margin-right: 0.5rem;
}

.v-select .dropdown li {
  border-bottom: 1px solid rgba(112, 128, 144, 0.1);
}

.v-select .dropdown li:last-child {
  border-bottom: none;
}

.v-select .dropdown li a {
  padding: 10px 20px;
  width: 100%;
  font-size: 1.25em;
  color: #3c3c3c;
}

.v-select .dropdown-menu .active > a {
  color: #fff;
}
</style>
>>>>>>> remotes/vuetify/master
