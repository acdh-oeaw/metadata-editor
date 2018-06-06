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
/* eslint-disable no-irregular-whitespace */

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
  'RepoObject',
  'Metadata',
  'anyURI',
  'date',
  'string',
  'text',
  'positiveInteger',
  'CollectionOrPlaceOrPublicationOrResource',
  '​CollectionOrPlaceOrPublicationOrResource',
  'Agent',
  '​AgentOrPlace',
  'CollectionOrResource',
  'CollectionOrResourceOrPublication',
  '​ContainerOrReMe',
  '​ContainerOrResource',
  '​Image',
  '​Main',
  '​Metadata',
  '​Place',
  '​PlaceOrPublicationOrRepoObject',
  'PlaceOrPublicationOrRepoObject',
  '​Project',
  '​Publication',
  '​PublicationOrRepoObject',
  '​anyURI',
  'date',
  '​positiveInteger',
  '​string',
];

/*
  Agent: 15
  ​AgentOrPlace: 1
  ​CollectionOrPlaceOrPublicationOrResource: 1
  CollectionOrResource: 1
  ​CollectionOrResourceOrPublication: 2
  ​ContainerOrReMe: 1
  ​ContainerOrResource: 2
  ​Image: 1
  ​Main: 1
  ​Metadata: 1
  ​Place: 1
  ​PlaceOrPublicationOrRepoObject: 1
  ​Project: 1
  ​Publication: 1
  ​PublicationOrRepoObject: 2
  ​anyURI: 7
  ​date: 13
  ​positiveInteger: 2
  ​string: 24
*/


const unique = [];

for (let t = 0; t < TYPES.length; t += 1) {
  if (unique.indexOf(TYPES[t]) === -1) {
    unique.push(TYPES[t]);
  }
}
console.log('types in formfromshema', unique);

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
      // this.$debug('schema', JSON.stringify(this.schema.properties));
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
      this.$debug('schema before copyRangeToType', JSON.stringify(res));
      this.schema = this.copyRangeToType(res, 'only name');
      this.setSchema({ name: this.type, schema: this.schema });
      this.$debug('schema after copyRangeToType', JSON.stringify(this.schema));
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
  label {
    display: block;
    font-weight: bold;
  }
  label small {
    font-weight: normal;
  }
  label {
    margin-bottom: 20px;
    background-color: #EEE;
  }
  </style>
