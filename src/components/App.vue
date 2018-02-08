<template>
  <div class="">
    <FundamentNav></FundamentNav>
    <router-view name="Content"></router-view>
    <FundamentFooter></FundamentFooter>
  </div>
</template>

<script>
  import FundamentNav from './FundamentNav';
  import FundamentFooter from './FundamentFooter';

  export default {
    components: {
      FundamentNav,
      FundamentFooter,
    },
    data() {
      return {
      };
    },
  };
</script>
