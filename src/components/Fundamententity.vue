<template>
  <div class="">
    <div>
      <b-card :title="entity.title" style="max-width: 20rem;" class="flex-md-row mb-4 box-shadow">
        <p class="card-text">{{ entity.desc }} <b-badge>{{ entity.type }}</b-badge></p>
      </b-card> sdf
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
    'type',
    'format',
  ],
  data() {
    return {
      entity: { title: 'loading', desc: 'loading', type: '' },
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
          this.entity.type = 'VIAF';
        });
      } else if (this.extractHostname(this.uri) === 'id.acdh.oeaw.ac.at' && this.type) {
        this.getArcheByID(this.uri.substr(this.uri.lastIndexOf('/')), this.type)
        .then((res) => {
          console.log(res);
          this.entity.title = res[0].title;
          this.entity.desc = '';
          this.entity.type = 'ARCHE';
        });
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
