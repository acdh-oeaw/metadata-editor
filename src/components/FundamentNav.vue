<template>
<nav class="navbar navbar-expand-md navbar-light fixed-top bg-white box-shadow">
  <div class="container">
    <a class="navbar-brand" href="../docs/index.php">
      <img class="mr-2" src="/static/fundament_logo.svg" height="35px" alt="" />
      MetaDataEditor
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <b-link class="nav-link" :to="{ name: 'start', params: { lang: 'en' }}">Home <span class="sr-only">(current)</span></b-link>
        </li>
        <li class="nav-item active">
          <b-link class="nav-link" :to="{ name: 'create', params: { lang: 'en' }}">Create <span class="sr-only">(current)</span></b-link>
        </li>
      </ul>
      <div class="navbar-icons">
        <a href="https://github.com/acdh-oeaw/fundament" target="_blank" rel="noopener">
          <i class="fab fa-github"></i>
        </a>
        <a href="#">
          <i class="fas fa-sign-in-alt"></i>
        </a>
        <a href="#">
          <i class="fas fa-search"></i>
        </a>
      </div>

    </div>
  </div>
</nav>
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
