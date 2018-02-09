<template>
<b-navbar toggleable="md" type="light" class="fixed-top bg-white box-shadow">
  <div class="container">
    <b-link class="navbar-brand" :to="{ name: 'start', params: { lang: 'en' }}">
      <img class="mr-2" src="/static/fundament_logo.svg" height="35px" alt="" />
      MetaDataEditor
    </b-link>
    <b-navbar-toggle target="navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation"></b-navbar-toggle>

    <b-collapse is-nav id="navbarsExampleDefault">
      <b-navbar-nav>
          <b-nav-item class="nav-item active">
            <b-link class="nav-link" :to="{ name: 'start', params: { lang: 'en' }}">Home <span class="sr-only">(current)</span></b-link>
          </b-nav-item>
          <b-nav-item class="nav-item active">
            <b-link class="nav-link" :to="{ name: 'load', params: { lang: 'en' }}">File Load <span class="sr-only">(current)</span></b-link>
          </b-nav-item>
          <b-nav-item class="nav-item active">
            <b-link class="nav-link" :to="{ name: 'create', params: { lang: 'en' }}">Create <span class="sr-only">(current)</span></b-link>
          </b-nav-item>
      </b-navbar-nav>
      <div class="navbar-icons">
        <a href="https://github.com/ctot-nondef/metadataeditor" target="_blank" rel="noopener">
          <i class="fab fa-github"></i>
        </a>
      </div>
    </b-collapse>
  </div>
</b-navbar>
</template>

<script>
  export default {
    data() {
      return {
        menu: '',
      };
    },
  };
</script>
