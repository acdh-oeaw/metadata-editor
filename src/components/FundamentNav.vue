<template>
<b-navbar toggleable="md" type="light" class="fixed-top bg-white box-shadow" v-if="menu">
  <div class="container">
    <b-link class="navbar-brand" :to="menu.homestate">
      <img class="mr-2" :src="menu.logo" height="35px" alt="" />
      {{ menu.title }}
    </b-link>
    <b-navbar-toggle target="navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"></b-navbar-toggle>
    <b-collapse is-nav id="navbarsExampleDefault">
      <b-navbar-nav>
          <b-nav-item class="nav-item active" v-for="item in menu.menu" :key="item.caption">
            <b-link class="nav-link" :to="item.startpage"><i :class="item.icon"></i> {{ item.caption }} <span class="sr-only">(current)</span></b-link>
          </b-nav-item>
      </b-navbar-nav>
      <div class="navbar-icons">
        <a :href="menu.repo" target="_blank" rel="noopener">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </b-collapse>
  </div>
</b-navbar>
</template>

<script>
  import HELPERS from '../helpers';

  export default {
    mixins: [HELPERS],
    props: [
      'menu',
    ],
    data() {
      return {
      };
    },
  };
</script>
