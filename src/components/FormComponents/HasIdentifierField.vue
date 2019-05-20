<template>
  <div>
    <div v-for="item, index in items">
      <v-text-field
        v-model="item.select"
        :label="name"
        :rules = "[() => item.status || 'Failed to fetch Data from the API',() => item.select.length > 0 || 'This field may not be empty', () => item.valid || 'Please choose a valid identifier', (!item.exists || !forbidExistingIdentifiers) || 'Please choose an non existing Identifier']"
        required
        @input="querySelectionsDebounce(index); emit();"
        >
      </v-text-field>
      <template v-if="!item.loading && item.select.length > 0 && item.status">
        <!-- Arche -->
        <p v-if="item.arche">
          <span class="notExists hasid" v-if="item.valid">valid Identifier:</span>
          <span class="exists haside" v-else>invalid Identifier</span>
          <span :class="{exists: forbidExistingIdentifiers, hasid: true}" v-if="item.exists && item.valid">does already exist as an identifier in ARCHE</span>
          <span class="notExists hasid" v-if="!item.exists && item.valid">does not exist as an identifier in ARCHE</span>
        </p>
        <!-- Non Arche -->
        <p v-if="!item.arche">
          <span class="notExists hasid" v-if="item.valid">Valid non-Arche URI, click <a target="_blank" :href="item.select">here</a> to see if it is actually correct.</span>
          <span class="exists hasid" v-else>invalid URI</span>
        </p>
      </template>
      <template v-if="item.loading && item.select.length > 0">
        <p>loading...</p>
      </template>
      <!--<template v-if="!loading && !status && select[i-1].length > 0">
        <p>Failed to fetch Data from the API...</p>
      </template> -->
      <v-layout row wrap>
        <v-flex xs6>
          <v-btn :disabled="items.length==1" color="warning" @click="remove(index)">Delete Identifier</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn color="success" @click="add">Add Identifier</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import debounce from 'debounce';
import { mapMutations } from 'vuex';
import HELPERS from '../../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable indent */
/* eslint-disable func-names */
// ^this is necessary due to debounce.


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
      rules: {
        apistat: item => item.status || 'Failed to fetch Data from the API',
        required: item => item.select.length > 0 || 'This field may not be empty',
        valid: item => item.valid || 'Please choose a valid identifier',
        existing: item => item.exists || 'Please choose an non existing Identifier',
      },
    };
  },
  methods: {
    ...mapMutations('dialogs', [
      'setDialog',
      'setDialogPromise',
    ]),
    emit: debounce(function () {
      const select = [];
      for (let i = 0; i < this.items.length; i += 1) {
        select.push(this.items[i].select);
      }
      this.$emit('input', select);
      this.$forceUpdate();
    }, 300),
    querySelectionsDebounce: debounce(function (i) {
      this.querySelections(i);
    }, 600),
    querySelections(i) {
      this.$info('querySelections', i);
      const val = this.items[i].select;
      this.$debug('querySelect. val, i, loading', val, i, this.loading);
      let value;
      if (val && !Array.isArray(val)) {
        value = val.replace(/^\s+|\s+$/g, '');
      } else {
        return;
      }

      if (this.isArcheURI(value)) {
        this.$info('isArcheURI', value);
        this.checkArcheId(i, value);
      } else {
        this.checkValidURI(i, value);
        this.items[i].loading = false;
      }
    },
    checkValidURI(i, value) {
      if (this.isURL(value)) {
        this.setAVES(i, false, true, false, true);
      } else {
        this.setAVES(i, false, false, false, true);
      }
    },
    isURL(url) {
      this.$info('isURL', url);
      return url.search(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi)) >= 0;
    },
    checkArcheId(i, value) {
      this.$info('checkArcheId', i, value);
      this.items[i].loading = true;
      this.isIdentifier(value)
        .then((res) => {
          this.$debug('res is:', res);
          this.items[i].loading = false;
          switch (res) {
            case 1: // valid free identifier
              this.setAVES(i, true, true, false, true);
              break;
            case -1: // valid already taken identifier
              this.setAVES(i, true, true, true, true);
              break;
            case -3: // no answer from server
              this.setAVES(i, true, false, false, false);
              break;
          // ----------------
            case 0:
            case -2:
            default:
              this.setAVES(i, true, false, false, true);
              break;
          }
          this.$debug('res exists identifier', res);
          this.$forceUpdate(); // this is somehow necessary to display reality
        });
    },
    setAVES(index, arche, valid, exists, status) {
      this.$info('setAVES', index, arche, valid, exists, status);
      this.items[index].arche = arche;
      this.items[index].valid = valid;
      this.items[index].exists = exists;
      this.items[index].status = status;
    },
    remove(index) {
      this.items.splice(index, 1);
      this.emit();
    },
    isArcheURI(uri) {
      this.$info('isArcheURI', uri);
      return uri.startsWith('https://id.acdh.oeaw.ac.at/');
    },
    add() {
      this.items.push(this.newItem());
      this.$forceUpdate();
    },
    newItem(value) {
      return {
        select: value || '',
        loading: true,
        exists: false,
        valid: false,
        status: false,
        arche: false,
      };
    },
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
    }

    for (let i = 0; i < this.items.length; i += 1) {
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
