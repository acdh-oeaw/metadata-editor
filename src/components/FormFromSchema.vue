<template v-if="!loading">
  <div>
  <form-schema v-if="model && !loading" @input="saveEntry();" :schema="schema" v-model="model" @submit="submit" autocomplete="off">
    <v-tooltip nudge-bottom="7" bottom :disabled="!unsavedChanges">
      <template v-slot:activator="{ on }">
        <span  v-on="on">
          <v-btn color="primary" @click="submit" :disabled="unsavedChanges">Create</v-btn>
        </span>
      </template>
      <span>The form is empty</span>
    </v-tooltip>
    <v-btn @click="resetForm" color="secondary">Reset Form</v-btn>
    * required
  </form-schema>
  <v-progress-linear v-show="loading" :indeterminate="true"></v-progress-linear>

  <v-snackbar
    v-model="snackbar"
    :timeout="8000"
    bottom
    >
    You need to specify a title image to upload a collection!
    <v-card-actions>
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
    </v-card-actions>
  </v-snackbar>
  <v-snackbar
    v-model="successSnackbar"
    :timeout="8000"
    bottom
    >
    Successfully created a subject!
    <v-btn
        dark
        flat
        @click="successSnackbar = false"
      >
        Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import debounce from 'debounce';
import FormSchema from '@formschema/native';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import FormComponentWrapper from './FormComponents/FormComponentWrapper';
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
    initModel: false,
    loading: true,
    name: 'editsubjectdialog',
    blacklistRegex: /^xx*/, // for name like,
    snackbar: false,
    successSnackbar: false,
  }),
  computed: {
    ...mapGetters('JSONschema', [
      'getSchema',
      'getEntry',
    ]),
    unsavedChanges() {
      // this.$log('model', Object.values(this.model));
      const keys = Object.keys(this.model);
      for (let i = 0; i < keys.length; i += 1) {
        if (this.model[keys[i]] && !Array.isArray(this.model[keys[i]])) return false;
        else if (Array.isArray(this.model[keys[i]])) {
          for (let j = 0; j < this.model[keys[i]].length; j += 1) {
            if (this.model[keys[i]][j]) return false;
          }
        }
      }
      return true;
    },
  },
  methods: {
    ...mapMutations('JSONschema', [
      'setSchema',
      'setEntry',
      'setDialog',
    ]),
    ...mapMutations('dialogs', [
      'setDialog',
      'openDialog',
    ]),
    ...mapActions('n3', [
      'ObjectToStore',
    ]),
    saveEntry: debounce(function () {
      this.$emit('input', this.model);
      this.$info('FormFromSchema', 'saveEntry');
      this.setEntry({ name: this.uniqueName, entry: this.model, schema: this.type });
    }, 600),
    resetForm() {
      this.loading = true;
      // this.$debug('schema', JSON.stringify(this.schema.properties));
      this.$info('FormFromSchema', 'resetForm');
      this.$debug('model', this.model);
      const keys = Object.keys(this.model);
      for (let i = 0; i < keys.length; i += 1) {
        if (this.model[keys[i]]) {
          this.model[keys[i]] = '';
          this.$log(keys[i]);
          // this.model[keys[i]] = '';
        }
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
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
        this.successSnackbar = true;
        this.resetForm();
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
      // this.$log('fields', fields);
      for (let i = 0; i < fields.length; i += 1) {
        if (this.schema && this.schema.properties[fields[i]].attrs &&
           this.schema.properties[fields[i]].attrs.type &&
           !TYPES1.includes(this.schema.properties[fields[i]].attrs.type)) {
          TYPES1.push(this.schema.properties[fields[i]].attrs.type);
        }
      }
      this.$log('types in created:', TYPES1);

      for (let i = 0; i < TYPES1.length; i += 1) {
        const t = TYPES1[i];
        this.$log('schema is: ', this.schema.title, t);
        FormSchema.setComponent(t, FormComponentWrapper, { type: t, schema: this.schema.id });
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
      this.schema = this.removeBlacklisted(this.copyRangeToType(schema, 'only name'), this.blacklistRegex);

      if (!this.getSchema(this.type)) {
        this.setSchema({ name: this.type, schema: this.schema });
      }
      this.setComponents();
      if (!this.getEntry(this.uniqueName)) {
        this.setEntry({ name: this.uniqueName, entry: {}, schema: this.type });
      }

      this.model = this.getEntry(this.uniqueName).model;
      this.initModel = this.model;
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
      if (this.getSchema() && this.getSchema(this.type)) {
        this.$info('Metadata found in store! Type:', this.type);
        this.importSchema(this.getSchema(this.type));
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
  label:not(.v-label) {
    display: inline-block;
    margin: 0 0 1em;
    width: 50%;
    box-sizing: border-box;
    padding: 5px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  label span:not(.hasid, .v-chip){
    display: none;
  }

  label small {
    display: none;
  }
  </style>
