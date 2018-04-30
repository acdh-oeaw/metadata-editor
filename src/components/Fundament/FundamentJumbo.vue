<template>
  <v-parallax :src="src" height="250" class="mt-4 border-top">
    <v-layout column align-center justify-center>
      <h1>{{caption}}</h1>
      <p>{{subtitle}}</p>
    </v-layout>
  </v-parallax>
</template>

<script>

  export default {
    data() {
      return {
      };
    },
    props: [
      'src',
      'caption',
      'subtitle',
    ],
    name: 'FundamentJumbo',
  };
</script>
<style scoped>



</style>
