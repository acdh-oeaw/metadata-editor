<template>
  <div class="wrapperToBeDeleted">
  <form-schema :schema="schema" v-model="model" @submit="submit">
    <b-button @click="submit">Subscribe</b-button>
  </form-schema>
  <p class="paragraphToBeDeleted">just for testing, this paragraph will be deleted: {{ entry }}</p>

  </div>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapState, mapActions } from 'vuex';
import BootstrapVue from 'bootstrap-vue';

/* eslint no-param-reassign: ["error", { "props": false }] */

FormSchema.setComponent('form', 'b-form', { validated: true });

FormSchema.setComponent('email', 'b-form-input', { type: 'email' });
FormSchema.setComponent('text', 'b-form-input', { type: 'text' });
FormSchema.setComponent('description', 'b-form-input');
/*
FormSchema.setComponent('checkbox', 'b-form-checkbox');
FormSchema.setComponent('radio', 'b-form-radio');
FormSchema.setComponent('select', 'b-form-select');
*/

export default {
  props: [

  ],
  components: {
    FormSchema,
    BootstrapVue,
  },
  data: () => ({
    model: {},
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
      schema: $state => $state.metadata.metaDataSchema,
      entry: $state => $state.metadata.entry,
    }),
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
