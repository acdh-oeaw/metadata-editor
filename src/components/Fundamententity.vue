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
    if (this.uri) {
      if (this.extractHostname(this.uri) === 'viaf.org') {
        this.getViafByID(this.uri.substr(this.uri.lastIndexOf('/')))
        .then((res) => {
          this.entity.title = `${res['ns1:mainHeadings']['ns1:data'][0]['ns1:text'] ? res['ns1:mainHeadings']['ns1:data'][0]['ns1:text'] : res['ns1:mainHeadings']['ns1:data']['ns1:text']}`;
          this.entity.desc = `Born: ${res['ns1:birthDate']},
                              Died: ${res['ns1:deathDate']},
                              Nationality: ${res['ns1:nationalityOfEntity']['ns1:data']['ns1:text']},`;
        });
      } else if (this.extractHostname(this.uri) === 'id.acdh.oeaw.ac.at') {
        const a = this.getArcheByID(this.uri.substr(this.uri.lastIndexOf('/')));
        console.log(a);
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
