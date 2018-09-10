<template>
  <div>
    <div v-for="item, index in items">
      <v-text-field
        v-model="item.select"
        :label="name"
        :rules = "[() => item.status || 'Failed to fetch Data from the API',() => item.select.length > 0 || 'This field may not be empty', () => item.valid || 'Please choose a valid identifier', (!item.exists || !forbidExistingIdentifiers) || 'Please choose an non existing Identifier']"
        required
        @input="querySelections(index); emit();"
        >
      </v-text-field>
      <template v-if="!item.loading && item.select.length > 0">
        <p v-if="item.status">
          <span class="notExists" v-if="item.valid">valid Identifier:</span>
          <span class="exists" v-else>invalid Identifier</span>
          <span :class="{exists: forbidExistingIdentifiers}" v-if="item.exists && item.valid">does already exist as an identifier in ARCHE</span>
          <span class="notExists" v-if="!item.exists && item.valid">does not exist as an identifier in ARCHE</span>
        </p>
      </template>
      <template v-if="item.loading && item.select.length > 0">
        <p>loading...</p>
      </template>
      <!--<template v-if="!loading && !status && select[i-1].length > 0">
        <p>Failed to fetch Data from the API...</p>
      </template> -->
      <v-btn :disabled="items.length==1" color="warning" @click="remove(index);">Delete Identifier</v-btn>
    </div>
    <v-btn color="success" @click="add();">Add Identifier</v-btn>

  </div>
</template>

<script>
import debounce from 'debounce';
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
      items: [],
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
    emit: debounce(function() {
      let select = [];
      for(let i = 0; i < this.items.length; i += 1){
        select.push(this.items[i].select);
      }
      this.$emit('input', select);
      this.$forceUpdate();
    }, 300),
    querySelections: debounce(function (i) {
      const val = this.items[i].select;
      this.$debug('querySelect. val, i, loading', val, i, this.loading);
      let value;
      if (val && !Array.isArray(val)) {
        value = val.replace(/^\s+|\s+$/g, '');
      } else {
        return;
      }
      this.items[i].loading = true;
      this.isIdentifier(value)
        .then((res) => {
          this.$debug('res is:', res);
          this.items[i].loading = false;
          switch (res) {
            case 1: // valid free identifier
              this.setVES(i, true, false, true);
              break;
            case -1: // valid already taken identifier
              this.setVES(i, true, true, true);
              break;
            case -3: // no answer from server
              this.setVES(i, false, false, false);
              break;
          // ----------------
            case 0:
            case -2:
            default:
              this.setVES(i, false, false, true);
              break;
          }
          this.$debug('res exists identifier', res);
          this.$forceUpdate(); // this is somehow necessary to display reality
        });
    }, 600),
    setVES(index, valid, exists, status) {
      this.items[index].valid = valid;
      this.items[index].exists = exists;
      this.items[index].status = status;
    },
    remove(index) {
      this.items.splice(index, 1);
      this.emit();
    },
    add() {
      this.items.push(this.newItem());
      this.$forceUpdate();
    },
    newItem(value) {
      return {
        select: value  || '',
        loading: true,
        exists: false,
        valid: false,
        status: false,
      };
    }
  },
  created() {
    let val = this.value;
    if (Array.isArray(val)) {
      // array
    } else {
      val = [];
      val.push(this.value);
    }
    for (let i = 0; i < val.length; i += 1) {
      this.items.push(this.newItem(val[i]));
      this.querySelections(i);
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
