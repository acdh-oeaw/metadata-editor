<template>
<v-app>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container grid-list-md>
        <v-slide-y-transition mode="out-in">
          <v-layout column align-center>
            <img src="/public/acdh_logo.png" width="300px" alt="ACDH Logo" class="mb-5" />

            <search-list class="mt-1" endpoint="persons" atr="title" subAtr ="uri"></search-list>

            <v-flex 12>
              <search-list class="mt-1 mr-0 ml-0" endpoint="organisations" atr="title" subAtr ="altTitle"></search-list>
              <search-list class="mt-1" endpoint="places" atr="title" subAtr ="uri"></search-list>
              <search-list class="mt-1" endpoint="concepts" atr="title" subAtr ="uri"></search-list>
              <search-list class="mt-1" endpoint="publications" atr="title" subAtr ="uri"></search-list>
            </v-flex>
            <modal name="identifiers" @before-open="beforeOpen">
              <v-card>
                <v-card-title  class="accent">
                  <h2>{{selected.item}}</h2>
                </v-card-title>
                <v-card-text>
                  {{selected.item}} Exists in the Database with the following identifier:
                </v-card-text>
                <v-card-text>
                  <span v-text="selected.identifiers"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn primary  v-clipboard:copy="selected.identifiers" v-on:click="copy(selected.identifiers); $modal.hide('identifiers');" color="primary flex">Copy</v-btn>
                  <v-btn  v-on:click="$modal.hide('identifiers');" color="accent">OK</v-btn>
                </v-card-actions>
              </v-card>
            </modal>

          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        selected: {item: "test",
                    identifiers: "test" },
        clipped: false,
        drawer: true,
        fixed: false,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'MDE MetaDataEditor'
      }
    },
    methods: {
      beforeOpen(event){
        this.selected.item = event.params.title;
        this.selected.identifiers = event.params.identifier;
      },
      copy(str){
        //copy to clipboard
      },
      modalClose(){
        this.$modal.hide('identifiers');
      }
    }
  }
</script>

<style>
search-list{
  padding: 10px;
}
</style>
