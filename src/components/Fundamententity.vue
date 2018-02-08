<template>
  <div class="">
    <div>
      <b-card :title="entity.title" style="max-width: 20rem;" class="flex-md-row mb-4 box-shadow">
        <p class="card-text">{{ entity.desc }}</p>
      </b-card>
    </div>
  </div>
</template>

<script>
import HELPERS from '../helpers';

export default {
  mixins: [HELPERS],
  name: 'Entitydisplay',
  props: [
    'uri',
    'format',
  ],
  data() {
    return {
      entity: { title: 'loading', desc: 'loading' },
      loading: true,
    };
  },
  created() {
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log(this.uri, this.format, this.APIS);
    if (this.uri && this.uri.lastIndexOf('/')) {
      const a = this.getViafData(this.uri.substr(this.uri.lastIndexOf('/')));
      console.log(a);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
