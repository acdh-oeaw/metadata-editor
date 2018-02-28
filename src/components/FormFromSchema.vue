<template>
  <form-schema :schema="schema" v-model="model" @submit="submit">
    <button type="submit">Subscribe</button>
  </form-schema>
</template>

<script>
import FormSchema from 'vue-json-schema';
import { mapState } from 'vuex';
/* eslint no-param-reassign: ["error", { "props": false }] */
export default {
  props: [

  ],
  components: {
    FormSchema,
  },
  data: () => ({
    model: {},
  }),
  methods: {
    submit(e) {
      // console.log('submited', this.shema, e);
      alert(e);
    },
  },
  computed: {
    ...mapState({
      schema: $state => $state.metadata.metaDataSchema,
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
