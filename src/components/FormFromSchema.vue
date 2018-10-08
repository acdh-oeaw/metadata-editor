<template v-if="!loading">
  <v-card>
  <form-schema v-if="model && !loading" @input="saveEntry(); $emit('input', model)" :schema="schema" v-model="model" @submit="submit">
    <v-btn variant="primary" @click="submit">Load into Store</v-btn>
    <v-btn @click="resetForm();" variant="secondary">Reset Form</v-btn>
  </form-schema>
  <v-snackbar
    v-model="snackbar"
    :timeout="8000"
    bottom
    >
    You need to specify a title image to upload a collection!
    <v-btn
        dark
        flat
        @click="snackbar = false; useBlank()"
      >
        Use blank
    </v-btn>
    <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
    </v-btn>
  </v-snackbar>
</v-card>
</template>

<script>
import debounce from 'debounce';
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
    blacklistRegex: /^is*/, // for name like,
    snackbar: false,
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
      'ObjectToStore',
    ]),
    saveEntry: debounce(function () {
      this.$info('FormFromSchema', 'saveEntry');
      this.setEntry({ name: this.uniqueName, entry: this.model, schema: this.type });
    }, 600),
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
      this.snackbar = false;
      // here everything -> n3 store.
      /* before calling ObjectToStore,
      we need to filter out objects and split them further into quads
      */
      if (this.type === 'collection' && !this.model.hasTitleImage) {
        if (this.$store.state.JSONschema.useDefaultTitleImage) this.useBlank();
        else this.snackbar = true;
      } else {
        this.ObjectToStore({ obj: this.filterModelBeforeUpload(this.model), schema: this.schema });
      }
    },
    useBlank() {
      this.model.hasTitleImage = 'acdhi:glaser-titleImage';
      this.submit();
    },
    /*
    sets the mapping in formFromShcema for each type (taken the actual schema)
    to the FormComponentWrapper, which handels the further mapping to actual components.
    */
    setComponents() {
      const TYPES1 = [];

      const fields = Object.keys(this.schema.properties);

      for (let i = 0; i < fields.length; i += 1) {
        if (this.schema && this.schema.properties[fields[i]].attrs &&
           this.schema.properties[fields[i]].attrs.type &&
           TYPES1.indexOf(this.schema.properties[fields[i]].attrs.type) < 0) {
          TYPES1.push(this.schema.properties[fields[i]].attrs.type);
        }
      }
      this.$debug('types in created:', TYPES1);

      for (let i = 0; i < TYPES1.length; i += 1) {
        const t = TYPES1[i];

        FormSchema.setComponent(t, FormComponentWrapper, { type: t });
      }
    },
    /*
    sets this.schema to the given schema after removing blacklisted keys
    and also copying the range property to the type property.
    also sets the components of the formSchema via setComponents.
    resets this.model to whatever is found in the store.
    */
    importSchema(schema) {
      this.$info('FormFromSchema, importSchema(schema)', schema);
      this.schema = this.copyRangeToType(schema, 'only name');
      this.schema = this.removeBlacklisted(this.schema, this.blacklistRegex);

      if (!this.$store.state.JSONschema.schemas[this.type]) {
        this.setSchema({ name: this.type, schema: this.schema });
      }
      this.setComponents();
      if (!this.$store.state.JSONschema.entries[this.uniqueName]) {
        this.setEntry({ name: this.uniqueName, entry: {}, schema: this.type });
      }

      this.model = this.$store.state.JSONschema.entries[this.uniqueName].model;
      // Mapping
      this.loading = false;
      this.$emit('input', this.model);
      this.$debug('after import schema:', this.schema);
    },
    /*
    gets the schema of the given type (this.type) from the storage or from
    getMetadataByType if it is not found in store.
    after that it calls importSchema to load it to give it to the formschema.
    */
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
    float: right;
    width: 50%;
    box-sizing: border-box;
    padding: 5px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  label span {
    display: none;
  }
  label small {
    display: none;
  }
  </style>
