<template>
  <main>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="container-fluid">
      <div class="jumbotron" style="background-image: url(/static/intro_bg.jpg);">
        <div class="container">
          <h1>MetaDataEditor</h1>
          <p>I'm supposed to be able to load and Edit ttl files for ingest in Arche.</p>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">

        <div class="col-md-12">
          <h5 class="row-heading pb-2 mb-3 border-bottom"><i class="fas fa-plug"></i> Get Started</h5>
        </div>

        <div class="col-md-6">
          <div class="card flex-md-row mb-4 box-shadow">
            <div class="card-body">
              <h3 class="mb-0"><b-link :to="{ name: 'store', params: { lang: 'en' }}">Load an existing ttl File.</b-link></h3>
              <p class="card-text">Load and edit an existing file from your Disk.</p>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card flex-md-row mb-4 box-shadow">
            <div class="card-body">
              <h3 class="mb-0"><b-link :to="{ name: 'create', params: { lang: 'en' }}">Create a new Project</b-link></h3>
              <p class="card-text">Create a new Project for archival in Arche.</p>
            </div>
          </div>
        </div>

      </div>
    </div><!-- /container -->
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
