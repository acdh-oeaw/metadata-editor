<template>
  <div class="">
    <FundamentNav></FundamentNav>
    <main>
      <router-view name="Content"></router-view>
    </main>
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
