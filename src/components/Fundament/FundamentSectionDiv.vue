<template>
  <v-flex xs12>
    <div class="text-xs-center pb-2 mb-3 sec">
      <v-icon>{{icon}}</v-icon>{{caption}}
    </div>
  </v-flex>
</template>

<script>

  export default {
    data() {
      return {
      };
    },
    props: [
      'icon',
      'caption',
    ],
    name: 'FundamentSectionDiv',
  };
</script>
<style scoped>
.sec {
  border-bottom: 1px solid #dee2e6 !important;
  color: #6c757d;
}


</style>
