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
h1:after {
  content: '';
  display: block;
  width: 60px;
  margin-left: calc(50% - 30px);
  border-top: 4px solid #80cbc4!important;
  margin-top: 20px;
  margin-bottom: 20px;
}

.border-top {
  border-top: 4px solid #80cbc4!important;
}
</style>
