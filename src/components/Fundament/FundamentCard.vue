<template>
  <transition appear :duration="250" name="fadeLeft">
    <v-card class="border-top mb-3">
      <v-card-media :src="src" v-if="src" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <v-flex xs12>
          <h3 class="headline mb-0" v-text="caption"></h3>
          <slot></slot>
        </v-flex>
      </v-card-title>
      <v-card-actions v-if="link">
        <v-btn
          flat
          class="teak lighten-3"
          :to="link"
          >
        {{ button ||'Start' }}</v-btn>
      </v-card-actions>
    </v-card>
  </transition>
</template>

<script>
  export default {
    props: [
      'src',
      'caption',
      'link',
      'button',
    ],
    name: 'FundamentJumbo',
  };
</script>
