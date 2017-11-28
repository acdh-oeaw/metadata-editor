<template>
<v-card lg app >
  <v-card-title  class="primary">
    <h2>{{endpoint.split("")[0].toUpperCase() + endpoint.substring(1)}}</h2>
  </v-card-title>
  <v-card-text>
    <v-text-field
       name="input-1"
       label="Search"
       v-bind:id="endpoint+'search'"
       v-model="searchText"
       v-on:keyup="typedInSearchfield(endpoint, searchText)"
     ></v-text-field>
   </v-card-text>
   <v-card-text offset-lg2>
     <v-list two-line v-if="!results || results.length > 0">
         <v-list-tile-content v-for="item in results" v-if="results" class="hov" v-on:click="displayIdentyfier(item);">
               <v-list-tile-title v-html="item[atr]"></v-list-tile-title>
               <v-list-tile-sub-title v-text="item[subAtr]"></v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-content  v-if="!results">
              <v-list-tile-title>
                No entries found for {{searchText}}
              </v-list-tile-title>
              <v-list-tile-sub-title><v-btn v-on:click="create(selected.identifiers);" color="primary flex">Create New Entry</v-btn></v-list-tile-sub-title>
            </v-list-tile-content>
       </v-list>
    </v-card-text>
  </v-card>
</template>


<script>
  export default {
    props: ['endpoint', 'atr', 'subAtr'],
    data () {
      return {
        searchText: "",
        results: [],
        selected: {item: "test", 'identifiers': 'test/URl'},
        randomIdentifier: "",
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'MDE MetaDataEditor',
        timeout: null,
      }
    },
    methods: {
      typedInSearchfield(endpoint, searchText){
        var that = this;
        console.log("typed", searchText);
        if(this.timeout){
          window.clearTimeout(this.timeout);
        }
        this.timeout = window.setTimeout(function(){ that.getEndpointDataLike(endpoint, searchText)}, 300);

      },
      displayIdentyfier (item){
        this.selected.item = item[this.atr];
        this.selected.identifiers = item.identifiers;
        this.$modal.show('identifiers', {title: this.selected.item,
          identifier: this.selected.identifiers
        });
      },
      getEndpointDataLike (endpoint, like){
        console.log("getEndpointDataLike(endpoint, like)", endpoint, like);
        clearTimeout(this.timeout); //for the fireingdelay
        var vm = this;
        this.axios.get('https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/' + endpoint + '/' + like +'?_format=json')
          .then(function(response){
            vm.results = {};
            console.log("response is: ", typeof(response.data), response.data);
            if(typeof(response.data)=== 'object'){
              vm.results = response.data;
              console.log("response.data", response.data);
            } else {
              vm.results = false;
            }
            console.log(vm.results);
          }, function (fresponse){
            vm.results = {};
          });
      }
    },
    created: function () {
      this.randomIdentifier = Math.random()+"";
    }
  }
</script>
<style scoped>
hr{
  width: 650px;
  color: #FFF;
  border: 0px;
  height: 0px;
}

h2:hover{
  #color: red;
}
v-list-tile-content>*{
  color: green;
}
hov:hover{
  background-color: #C00;
}
</style>
