<template v-if="!loading">
  <form-schema v-if="model && !loading" @input="saveEntry(); $emit('input', model)" :schema="schema" v-model="model" @submit="submit">
    <v-btn variant="primary" @click="submit">Load into Store</v-btn>
    <v-btn @click="resetForm();" variant="secondary">Reset Form</v-btn>
  </form-schema>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapMutations, mapActions } from 'vuex';
import FormComponentWrapper from './FormComponentWrapper';
import HELPERS from '../helpers';
/* eslint no-param-reassign: ["error", { "props": false }] */

// FormSchema.setComponent('form', 'b-form', { validated: true });

// FormSchema.setComponent('email', 'b-form-input', { type: 'email' });
// FormSchema.setComponent('text', 'b-form-input', { type: 'text' });

const TYPES = [
  'Person',
  'Place',
  'Publication',
  'Organisation',
  'Agent',
  'AgentOrPlace',
  'ContainerOrReMe',
  'ContainerOrResource',
  'Main',
  'Organisation',
  'PublicationOrRepoObject',
  'CollectionOrResourceOrPublication',
  'PlaceOrPublicationOrRepoObject',
  'RepoObject',
  'anyURI',
  'date',
  'string',
  'text',
  'positiveInteger',
];

console.log('types in formfromshema', TYPES);


for (let i = 0; i < TYPES.length; i += 1) {
  const t = TYPES[i];
  console.log(t);

  FormSchema.setComponent(t, FormComponentWrapper, { type: t });
}

/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint-disable np-undev */

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'uniqueName',
  ],
  components: {
    FormSchema,
    FormComponentWrapper,
  },
  data: () => ({
    schema: false,
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
      this.$debug('schema', JSON.stringify(this.schema.properties));
      /*
      this.$info('FormFromSchema', 'resetForm');
      const keys = Object.keys(this.model);
      for (let i = 0; i < keys.length; i += 1) {
        this.$debug(keys[i]);
        this.model[keys[i]] = '';
      }
      */
    },
    submit() {
      this.$info('FormFromSchema', 'submit()', JSON.stringify(this.model));
      // here everything -> n3 store.
      /* before calling objectToStore,
      we need to filter out objects and split them further into triples
      */
      this.objectToStore({ obj: this.filterModelBeforeUpload(this.model), schema: this.schema });
    },
  },
  watch: {
  },
  computed: {
  },
  created() {
    this.$info('FormFromSchema', 'created');
    this.getMetadataByType(this.type).then((res) => {
      this.$debug('schema', res);
      this.setSchema({ name: this.type, schema: res });
      this.schema = this.filterFormSchemaModelForTypesOnlyName(res);
      // this.$debug('properties!!', JSON.stringify(this.schema.properties));
      if (!this.$store.state.JSONschema.entries[this.uniqueName]) {
        this.$store.state.JSONschema.entries[this.uniqueName] = {};
      }
      this.model = this.$store.state.JSONschema.entries[this.uniqueName];
      this.loading = false;
      this.$emit('input', this.model);
    });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
