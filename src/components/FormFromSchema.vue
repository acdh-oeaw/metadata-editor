<template v-if="!loading">
  <v-card>
    <v-toolbar dark color="primary" fixed v-if="edit">
      <v-btn icon dark @click.native="setDialog({ name, obj: { query: {} } });">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Subject</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat variant="primary" @click="submit">Load into Store</v-btn>
        <v-btn flat @click="resetForm();" variant="secondary">Reset Form</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  <form-schema v-if="model && !loading" @input="saveEntry(); $emit('input', model)" :schema="schema" v-model="model" @submit="submit">
    <v-btn variant="primary" @click="submit">Load into Store</v-btn>
    <v-btn @click="resetForm();" variant="secondary">Reset Form</v-btn>
  </form-schema>
</v-card>
</template>

<script>
import FormSchema from '@formschema/native';
import { mapMutations, mapActions } from 'vuex';
import FormComponentWrapper from './FormComponentWrapper';
import HELPERS from '../helpers';

/* eslint no-param-reassign: ["error", { "props": false }] */
/* eslint-disable no-irregular-whitespace */
/* eslint no-console: ['error', { allow: ['log'] }] */
/* eslint-disable np-undev */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable no-lonely-if */

export default {
  mixins: [HELPERS],
  props: {
    type: {
      default: '',
    },
    edit: {
      default: '',
    }, // if exists contains query from store.
    uniqueName: {
      default: 'onlyoneForm',
    },
  },
  components: {
    FormSchema,
    FormComponentWrapper,
  },
  data: () => ({
    schema: false,
    model: false,
    loading: true,
    name: 'editsubjectdialog',
    blacklistRegex: /^is*/, // for name like
  }),
  methods: {
    ...mapMutations('JSONschema', [
      'setSchema',
      'setEntry',
      'setDialog',
    ]),
    ...mapMutations('dialogs', [
      'setDialog',
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
      this.$info('FormFromSchema', 'submit()', this.model);
      // here everything -> n3 store.
      /* before calling objectToStore,
      we need to filter out objects and split them further into triples
      */
      this.objectToStore({ obj: this.filterModelBeforeUpload(this.model), schema: this.schema });
    },
    setComponents() {
      const TYPES1 = [];

      const fields = Object.keys(this.schema.properties);

      for (let i = 0; i < fields.length; i += 1) {
        if (this.schema.properties[fields[i]].attrs &&
           this.schema.properties[fields[i]].attrs.type) {
          TYPES1.push(this.schema.properties[fields[i]].attrs.type);
        }
      }
      this.$debug('types in created:', TYPES1);

      for (let i = 0; i < TYPES1.length; i += 1) {
        const t = TYPES1[i];
        FormSchema.setComponent(t, FormComponentWrapper, { type: t });
      }
    },
    updateModel(params) {
      this.$info('FormFromSchema, updateModel(params)', params);
      const keys = Object.keys(this.model);
      for (let i = 0; i < keys.length; i += 1) {
        if (params[keys[i]]) {
          this.model[keys[i]] = params[keys[i]];
        } else {
          if (Array.isArray(this.model[keys[i]])) {
            this.model[keys[i]] = [];
          } else {
            this.model[keys[i]] = '';
          }
        }
      }
      this.$log('entries', this.$store.state.JSONschema.entries[this.uniqueName]);
      this.saveEntry();
      this.setComponents();
    },
    importSchema(schema) {
      this.$info('FormFromSchema, importSchema(schema)', schema);
      this.schema = this.copyRangeToType(schema, 'only name');
      this.$debug('schema after copyRangeToType', this.schema);
      this.schema = this.removeBlacklisted(this.schema, this.blacklistRegex);

      this.setSchema({ name: this.type, schema: this.schema });
      this.setComponents();
      if (!this.$store.state.JSONschema.entries[this.uniqueName]) {
        this.$store.state.JSONschema.entries[this.uniqueName] = {};
      }

      this.model = this.$store.state.JSONschema.entries[this.uniqueName];
      // Mapping
      this.loading = false;
      this.$emit('input', this.model);
      this.$debug('after import schema:', this.schema);
    },
    initSchema() {
      this.$info('FormFromSchema', 'initSchema');
      if (!this.type) { return; }
      if (this.$store.state.JSONschema.schemas && this.$store.state.JSONschema.schemas[this.type]) {
        this.$info('Metadata found in store! Type:', this.type);
        this.importSchema(this.$store.state.JSONschema.schemas[this.type]);
        this.$debug('schema test, in store', this.schema);
      } else {
        this.$info('Metadata found not in store');
        this.getMetadataByType(this.type).then((res) => {
          this.$info('Fetching Metadata');
          this.importSchema(res);
          this.$debug('schema test, not in store', this.schema);
        });
      }
    },
  },
  watch: {
    edit(after, before) {
      this.$log('watch edit, before, after', before, after);
      if (after) {
        this.$debug('edit stuff', after);
        this.updateModel(after);
        this.setComponents();
      }

      this.$debug('test if blank edit works');
    },
    type() {
      this.initSchema();
    },
  },
  mounted() {
    this.$info('FormFromSchema', 'mounted');
    this.initSchema();
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
