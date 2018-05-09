<template>
  <div class="" v-if="!loading">
    <form-schema v-if="model" @input="saveEntry" :schema="schema[type]" v-model="model" @submit="submit">
      <b-button variant="primary" @click="submit">Load into Store</b-button>
      <b-button @click="resetForm();" variant="secondary">Reset Form</b-button>
    </form-schema>
  </div>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapState, mapMutations, mapActions } from 'vuex';
import archeautocomplete from './AutocompArche';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

FormSchema.setComponent('form', 'b-form', { validated: true });

FormSchema.setComponent('email', 'b-form-input', { type: 'email' });
// FormSchema.setComponent('text', 'b-form-input', { type: 'text' });
FormSchema.setComponent('text', archeautocomplete, { type: 'PERSONS' });

// FormSchema.setComponent('text', AutocompArche, { type: 'PERSONS', name: 'Person' });

/* eslint no-console: ['error', { allow: ['log'] }] */

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'uniqueName',
  ],
  components: {
    FormSchema,
    archeautocomplete,
  },
  data: () => ({
    model: false,
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
    saveEntry() {
      this.$info('FormFromSchema', 'saveEntry');
      this.setEntry({ name: this.uniqueName, entry: this.model });
    },
    resetForm() {
      this.$info('FormFromSchema', 'resetForm');
      const keys = Object.keys(this.model);
      for (let i = 0; i < keys.length; i += 1) {
        this.$debug(keys[i]);
        this.model[keys[i]] = '';
      }
    },
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
  watch: {
  },
  computed: {
    ...mapState({
      // this needs to be replaced, see l60ff
      schema: $state => $state.JSONschema.schemas,
    }),
  },
  created() {
    this.$info('FormFromSchema', 'created');
    this.getMetadataByType(this.type).then((res) => {
      this.$log('schema', res);
      this.setSchema({ name: this.type, schema: res });
      this.loading = false;
    });
    if (!this.$store.state.JSONschema.entries[this.uniqueName]) {
      this.$store.state.JSONschema.entries[this.uniqueName] = {};
    }
    this.model = this.$store.state.JSONschema.entries[this.uniqueName];
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
