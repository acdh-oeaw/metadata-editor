<template>
  <div class="">
      <fundament-jumbo
        src="/static/intro_bg.jpg"
        caption="MetaDataEditor"
        subtitle="I'm supposed to be able to load and Edit ttl files for ingest in Arche."
      >
    </fundament-jumbo>
      <v-container grid-list-md>
        <v-layout justify-space-around row wrap>
          <fundament-section-div icon="stars">Getting Started</fundament-section-div>
          <v-flex xs12 sm6>
            <fundament-card
              caption="Load an existing ttl File"
              :link="{ name: 'store', params: { lang: 'en' }}"
              button="Select"
            >
              <p class="card-text">Load and edit an existing file from your Disk.</p>
            </fundament-card>
          </v-flex>
          <v-flex xs12 sm6>
            <fundament-card
              caption="Create a new Project"
              :link="{ name: 'create', params: { lang: 'en' }}"
            >
              <p class="card-text">Create a new Project for archival in Arche.</p>
            </fundament-card>
          </v-flex>
          <fundament-section-div icon="description">Documentation</fundament-section-div>
          <v-flex xs12 sm4>
            <fundament-card
              caption="Load an existing ttl File"
              :link="{ name: 'store', params: { lang: 'en' }}"
              button="Select"
            >
              <p class="card-text">Load and edit an existing file from your Disk.</p>
            </fundament-card>
          </v-flex>
          <v-flex xs12 sm4>
            <fundament-card
              caption="Create a new Project"
              :link="{ name: 'create', params: { lang: 'en' }}"
            >
              <p class="card-text">Create a new Project for archival in Arche.</p>
            </fundament-card>
          </v-flex>
          <v-flex xs12 sm4>
            <fundament-card
              caption="Create a new Project"
              :link="{ name: 'create', params: { lang: 'en' }}"
            >
              <p class="card-text">Create a new Project for archival in Arche.</p>
            </fundament-card>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>

export default {
  name: 'start',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
