<template>
  <transition appear :duration="250" name="fadeLeft">
    <v-card style="border-top: 5px solid #80cbc4!important;">
      <v-card-media :src="src" v-if="src" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0" v-text="caption"></h3>
          <slot></slot>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn
          flat
          class="teak lighten-3"
          :to="link"
          >
        More</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
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
      'link',
    ],
    name: 'FundamentJumbo',
  };
</script>
<style scoped>

h3:after {
  content: '';
  display: block;
  width: 50px;
  border-top: 5px solid #80cbc4!important;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
