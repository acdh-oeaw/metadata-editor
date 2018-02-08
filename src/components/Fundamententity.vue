<template>
  <div class="card flex-md-row mb-4 box-shadow">
    <div class="card-body">
      <h3 class="mb-0"><a class="text-dark" href="#">Card Title</a></h3>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a class="btn btn-main btn-outline-primary btn-sm" href="#" role="button">Read More</a>
    </div>
    <img class="card-img-right flex-auto d-none d-md-block" alt="Thumbnail" height="250px" src="/path/to/image">
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
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
