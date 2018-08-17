<!-- formFromSchema for edit functionality. -->
<template>
  <v-card>
    <v-snackbar color="success" top :timeout="snackTimeout" v-model="snackbar">
      Successfully added entity!
      <v-btn
        color="dark"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-snackbar color="error" top :timeout="snackTimeout" v-model="failSnackbar">
      You need to change something first!
      <v-btn
        color="dark"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-toolbar dark color="primary" fixed>
      <v-btn icon dark @click.native="setDialog({ name, obj: { query: {} } });">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Edit Subject</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat variant="primary" @click="saveChanges(); setDialog({ name, obj: { query: {} } });">Save Changes</v-btn>
        <v-btn flat variant="primary" @click="submit">Add as new Entity</v-btn>
        <v-btn flat @click="resetForm();" variant="secondary">Reset Form</v-btn>
      </v-toolbar-items>


    </v-toolbar>
    <v-card-text>You are currently editing the entity {{ verboseEntityDescription }}
    </v-card-text>
    You are currently editing the entity: {{ verboseEntityDescription }}
    <form-schema v-if="model && type" @input="saveEntry(); $emit('input', model)" :schema="schema" v-model="model" @submit="submit">
      <v-btn variant="primary"  @click="saveChanges();">Save Changes</v-btn>
        <v-btn variant="primary" @click="submit">Add as new Entity</v-btn>
      <v-btn @click="resetForm();" variant="secondary">Reset Form</v-btn>
    </form-schema>
</v-card>
</template>

<script>
import FormSchema from '@formschema/native';
import { mapMutations, mapActions, mapGetters } from 'vuex';
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
    oldModel: false, // this is necessary for saving changes.
    loading: true,
    name: 'editsubjectdialog',
    blacklistRegex: /^is*/, // for name like
    verboseEntityDescription: '',
    snackbar: false,
    failSnackbar: false,
    snackTimeout: 3000,
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
      'WriteSubject',
      'ObjectToStore',
      'RemoveSubject',
    ]),
    saveEntry() {
      this.$info('FormFromSchema', 'saveEntry');
      this.setEntry({ name: this.uniqueName, entry: this.model, schema: this.type });
    },
    verboseEntityDesc() {
      let s = '';
      if (this.oldModel.hasFirstName) {
        s = `${this.oldModel.hasFirstName} ${this.oldModel.hasLastName}`;
      } else {
        s = Array.isArray(this.oldModel.hasTitle) ?
          this.oldModel.hasTitle[0] : this.oldModel.hasTitle;
      }
      this.verboseEntityDescription = s;
    },
    saveChanges() {
      this.$debug('saveChanges, old model, new model', this.oldModel, this.model);
      // this.$debug('saveChanges, old model, new model', this.oldModel, this.model);
      if (this.oldModel.hasIdentifier) {
        const id = Array.isArray(this.oldModel.hasIdentifier) ?
          this.oldModel.hasIdentifier[0] : this.oldModel.hasIdentifier;
        this.$debug('id', id);
        const subjectQuad = this.getQuads({ subject: null, predicate: null, object: id });
        this.$debug('subjectQuad', subjectQuad);
        if (subjectQuad && subjectQuad[0]) {
          this.$debug('delete: ', subjectQuad[0].subject);
          this.RemoveSubject(subjectQuad[0].subject);
          this.ObjectToStore({
            obj: this.filterModelBeforeUpload(this.model),
            schema: this.schema,
            id: subjectQuad[0].subject,
          });
          this.oldModel = JSON.parse(JSON.stringify(this.model));
        }
      }
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
      /* before calling ObjectToStore,
      we need to filter out objects and split them further into quads
      */
      this.$log('compare changes', JSON.stringify(this.model), JSON.stringify(this.oldModel));
      if (JSON.stringify(this.model).replace(/\[|\]/g, '') === JSON.stringify(this.oldModel).replace(/\[|\]/g, '')) this.failSnackbar = true;
      else {
        this.ObjectToStore({ obj: this.filterModelBeforeUpload(this.model), schema: this.schema });
        this.snackbar = true;
      }
    },
    /*
    sets the mapping in formFromShcema for each type (taken the actual schema)
    to the FormComponentWrapper, which handels the further mapping to actual components.
    */
    setComponents() {
      this.$debug('setComponents: schema:', this.schema);
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
      this.$debug('FormFromSchema, importSchema(schema)', schema);
      this.schema = this.copyRangeToType(schema, 'only name');
      this.schema = this.removeBlacklisted(this.schema, this.blacklistRegex);

      this.setSchema({ name: this.type, schema: this.schema });
      this.setComponents();

      this.loading = false;
      this.$emit('input', this.model);
      this.$debug('after import schema:', this.schema);
    },
    /*
    gets the schema of the given type (this.type) from the storage
    or from getMetadataByType if it is not found in store.
    after that it calls importSchema to load it to give it to the formschema.
    */
    initSchema() {
      this.$debug('FormFromSchemaEDIT', 'initSchema');
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

  },
  computed: {
    ...mapGetters('n3', [
      'getQuads',
    ]),
  },
  created() {
    this.$debug('FormFromSchemaEDIT', 'mounted');
    this.model = this.$store.state.JSONschema.entries[this.uniqueName].model;
    this.type = this.$store.state.JSONschema.entries[this.uniqueName].schema;
    this.schema = this.$store.state.JSONschema.schemas[
      this.type
    ];
    this.oldModel = JSON.parse(JSON.stringify(this.model));
    this.initSchema();
    this.setComponents();
  },
  updated() {
    this.verboseEntityDesc();
  },
};
</script>
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
