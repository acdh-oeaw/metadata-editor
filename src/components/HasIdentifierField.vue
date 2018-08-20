<template>
  <div>
    <div v-if="select[i-1]" v-for="i in (nIdentis+1)">
      <v-text-field
        v-model="select[i-1]"
        :label="name"
        :rules = "[() => status[i-1] || 'Failed to fetch Data from the API',() => select[i-1].length > 0 || 'This field may not be empty', () => valid[i-1] || 'Please choose a valid identifier', (!exists[i] || !forbidExistingIdentifiers) || 'Please choose an non existing Identifier']"
        required
        @input="querySelections(select[i-1], i-1); $emit('input', select)"
        >
      </v-text-field>
      <template v-if="!loading[i-1] && select[i-1].length > 0">
        <p v-if="status[i-1]">
          <span class="notExists" v-if="valid[i-1]">valid Identifier:</span>
          <span class="exists" v-else>invalid Identifier</span>
          <span :class="{exists: forbidExistingIdentifiers}" v-if="exists[i-1] && valid[i-1]">does already exist as an identifier in ARCHE</span>
          <span class="notExists" v-if="!exists[i-1] && valid[i-1]">does not exist as an identifier in ARCHE</span>
        </p>
      </template>
      <template v-if="loading[i-1] && select[i-1].length > 0">
        <p>loading...</p>
      </template>
      <!--<template v-if="!loading && !status && select[i-1].length > 0">
        <p>Failed to fetch Data from the API...</p>
      </template> -->
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */


export default {
  mixins: [HELPERS],
  props: [
    'name',
    'value',
    'forbidExistingIdentifiers',
  ],
  name: 'HasIdentifierField',
  data() {
    return {
      nIdentis: 1,
      loading: [],
      exists: [],
      valid: [],
      status: [],
      search: null,
      select: [],
    };
  },
  methods: {
    ...mapMutations('dialogs', [
      'setDialog',
      'setDialogPromise',
    ]),
    querySelections(val, i) {
      let value;
      if (val && !Array.isArray(val)) {
        value = val.replace(/^\s+|\s+$/g, '');
      } else {
        return;
      }
      this.$debug('querySelections(val)', value);
      this.loading[i] = true;
      this.isIdentifier(value)
        .then((res) => {
          this.loading[i] = false;
          switch (res) {
            case 1: // valid free identifier
              this.valid[i] = true;
              this.exists[i] = false;
              this.status[i] = true;
              break;
            case -1: // valid already taken identifier
              this.valid[i] = true;
              this.exists[i] = true;
              this.status[i] = true;
              break;
            case -3: // no answer from server
              this.valid[i] = false;
              this.exists[i] = false;
              this.status[i] = false;
              break;
          // ----------------
            case 0:
            case -2:
            default:
              this.valid[i] = false;
              this.exists[i] = false;
              this.status[i] = true;
              break;
          }
          this.$debug('res exists identifier', res);
        });
    },
  },
  watch: {
    search() {
      // this.querySelections(this.search);
    },
  },
  created() {
    this.querySelections(this.value);
    if(Array.isArray(this.value)) {
      // array
      this.nIdentis = this.value.length;
    }
    for (let i = 0; i < this.nIdentis; i += 1) {
      this.select[i] = this.value[i];
      this.loading[i] = true;
      this.exists[i] = false;
      this.valid[i] = false;
      this.status[i] = false;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree {
  max-height: 80vh;
  overflow: auto;
}

.exists {
  color: red;
}
.notExists {
  color: green;
}
</style>
