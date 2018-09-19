<template>
  <transition appear :duration="250" name="fadeLeft">
    <v-card class="border-top mb-3">
      <v-card-media :src="src" v-if="src" height="200px">
      </v-card-media>
      <v-card-title primary-title>
<<<<<<< HEAD
        <v-flex xs12>
          <h3 class="headline mb-0" v-text="caption"></h3>
          <slot></slot>
        </v-flex>
=======
        <div>
          <h3 class="headline mb-0" v-text="caption"></h3>
          <slot></slot>
        </div>
>>>>>>> 87c8e29a0dc2f358bba1c1bdef544aea8679d061
      </v-card-title>
      <v-card-actions v-if="link">
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


</style>
