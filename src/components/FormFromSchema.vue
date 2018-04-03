<template>
  <div class="" v-if="!loading">
    <form-schema :schema="schema[type]" v-model="model" @submit="submit">
      <b-button variant="primary" @click="submit">Subscribe</b-button>
      <b-button type="reset">Reset</b-button>
    </form-schema>
  </div>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapState, mapMutations, mapActions } from 'vuex';
import AutocompArche from './AutocompArche';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

FormSchema.setComponent('form', 'b-form', { validated: true });

FormSchema.setComponent('email', 'b-form-input', { type: 'email' });
FormSchema.setComponent('text', 'b-form-input', { type: 'text' });

// FormSchema.setComponent('text', AutocompArche, { type: 'PERSONS', name: 'Person' });

/* eslint no-console: ['error', { allow: ['log'] }] */

export default {
  mixins: [HELPERS],
  props: [
    'type',
  ],
  components: {
    FormSchema,
    AutocompArche,
  },
  data: () => ({
    model: {},
    loading: true,
  }),
  methods: {
    ...mapMutations('JSONschema', [
      'setSchema',
      'setEntry',
    ]),
    ...mapActions('n3', [
      'objectToStore',
    ]),
    submit() {
      this.$info('FormFromSchema', 'submit()');
      // here everything -> n3 store.
      /* before calling objectToStore,
      we need to filter out objects and split them further into triples
      */
      this.objectToStore({ obj: this.filterModelForArcheObjects(this.model),
        schema: this.schema[this.type] });
    },
  },
  computed: {
    ...mapState({
      // this needs to be replaced, see l60ff
      schema: $state => $state.JSONschema.schemas,
      entry: $state => $state.JSONschema.entries,
    }),
  },
  created() {
    this.$info('FormFromSchema', 'created');
    this.getMetadataByType(this.type).then((res) => {
      this.$log('schema', res);
      this.setSchema({ name: this.type, schema: res });
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
