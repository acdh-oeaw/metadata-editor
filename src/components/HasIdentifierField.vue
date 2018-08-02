<template>
  <div>
    <v-text-field
      v-model="select"
      :label="name"
      :rules = "[() => status || 'Failed to fetch Data from the API',() => select.length > 0 || 'This field may not be empty', () => valid || 'Please choose a valid identifier', (!this.exists || !this.forbidExistingIdentifiers) || 'Please choose an non existing Identifier']"
      required
      @input="querySelections(select); $emit('input', select)"
      >
    </v-text-field>
    <template v-if="!loading && select.length > 0">
      <p v-if="status">
        <span class="notExists" v-if="valid">valid Identifier:</span>
        <span class="exists" v-else>invalid Identifier</span>
        <span :class="{exists: forbidExistingIdentifiers}" v-if="exists && valid">does already exist as an identifier in ARCHE</span>
        <span class="notExists" v-if="!exists && valid">does not exist as an identifier in ARCHE</span>
      </p>
    </template>
    <template v-if="loading && select.length > 0">
      <p>loading...</p>
    </template>
    <!--<template v-if="!loading && !status && select.length > 0">
      <p>Failed to fetch Data from the API...</p>
    </template> -->
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
      loading: true,
      exists: false,
      valid: false,
      status: false,
      items: [],
      search: null,
      select: this.value || [],
    };
  },
  methods: {
    ...mapMutations('dialogs', [
      'setDialog',
      'setDialogPromise',
    ]),
    querySelections(val) {
      let value;
      if (val && !Array.isArray(val)) {
        value = val.replace(/^\s+|\s+$/g, '');
      } else {
        return;
      }
      this.$debug('querySelections(val)', value);
      this.loading = true;
      this.isIdentifier(value)
        .then((res) => {
          this.loading = false;
          switch (res) {
            case 1: // valid free identifier
              this.valid = true;
              this.exists = false;
              this.status = true;
              break;
            case -1: // valid already taken identifier
              this.valid = true;
              this.exists = true;
              this.status = true;
              break;
            case -3: // no answer from server
              this.valid = false;
              this.exists = false;
              this.status = false;
              break;
          // ----------------
            case 0:
            case -2:
            default:
              this.valid = false;
              this.exists = false;
              this.status = true;
              break;
          }
          this.$debug('res exists identifier', res);
        });
    },
  },
  watch: {
    search() {
      this.querySelections(this.search);
    },
  },
  created() {
    /* if (this.value) {
      // this.$log('selection', this.select, this.value);
      for (let i = 0; i < this.value.length; i += 1) {
        this.items.push({ title: this.value[i], uri: this.value[i], type: '' });
      }
    } */
    this.querySelections(this.value);
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
