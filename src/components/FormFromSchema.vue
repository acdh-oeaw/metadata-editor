<template>
  <div class="" v-if="!loading">
    <form-schema :schema="schema" v-model="model" @submit="submit">
      <b-button variant="primary" @click="submit">Subscribe</b-button>
      <b-button type="reset">Reset</b-button>
    </form-schema>
  <p class="paragraphToBeDeleted">just for testing, this paragraph will be deleted: {{ entry }}</p>

  </div>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapState, mapActions } from 'vuex';
import Autocomparche from './Autocomparche';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

FormSchema.setComponent('form', 'b-form', { validated: true });

FormSchema.setComponent('email', 'b-form-input', { type: 'email' });
FormSchema.setComponent('text', 'b-form-input', { type: 'text' });
FormSchema.setComponent('persons', Autocomparche, { type: 'PERSONS', name: 'Person' });

/* eslint no-console: ['error', { allow: ['log'] }] */

export default {
  mixins: [HELPERS],
  props: [

  ],
  components: {
    FormSchema,
    Autocomparche,
  },
  data: () => ({
    model: {},
    schema: {},
    loading: true,
  }),
  methods: {
    submit() {
      // console.log('submited', this.shema, e);
      this.updateEntry(this.model);
    },
    ...mapActions('metadata', [
      'updateEntry',
    ]),
  },
  computed: {
    ...mapState({
      // this needs to be replaced, see l60ff
      // schema: $state => $state.metadata.metaDataSchema,
      entry: $state => $state.metadata.entry,
    }),
  },
  created() {
    this.getMetadataByType('person').then((res) => {
      this.schema = res;
      this.loading = false;
    });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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

small {
  display: none;
}

label span {
  width: 200px;
}
</style>
