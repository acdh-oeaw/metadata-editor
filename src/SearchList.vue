<template>
<v-card>
  <v-card-title class="primary">
    <h2>{{endpoint.split("")[0].toUpperCase() + endpoint.substring(1)}}</h2>
  </v-card-title>
  <v-card-text>
    <v-text-field
       name="input-1"
       label="Search"
       id="testing"
       v-model="searchText"
       v-on:keyup="getEndpointDataLike(endpoint, searchText)"
     ></v-text-field>
   </v-card-text>
   <v-card-text>
     <v-list two-line>
         <template v-for="item in results">
           <v-list-tile-content class="hov" v-on:click="displayIdentyfier(item);">

               <v-list-tile-title v-html="item[atr]"></v-list-tile-title>
               <v-list-tile-sub-title v-text="item[subAtr]"></v-list-tile-sub-title>

            </v-list-tile-content>
          </template>
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
        results: {},
        selected: {item: "test", 'identifiers': 'test/URl'},
        clipped: false,
        drawer: true,
        fixed: false,
        randomIdentifier: "",
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'MDE MetaDataEditor'
      }
    },
    methods: {
      displayIdentyfier (item){
        this.selected.item = item[this.atr];
        this.selected.identifiers = item.identifiers;
        this.$modal.show('identifiers', {title: this.selected.item,
          identifier: this.selected.identifiers,
          buttons: [
            { title: 'Deal with it', handler: () => { alert('Woot!') } },
            { title: 'Close' }
        ]

        });

      },
      getEndpointDataLike (endpoint, like){
        console.log("getEndpointDataLike(endpoint, like)", endpoint, like);
        var vm = this;
        this.axios.get('https://fedora.hephaistos.arz.oeaw.ac.at/browser/api/' + endpoint + '/' + like +'?_format=json')
          .then(function(response){
            vm.results = {};
            console.log("response is: ", typeof(response.data), response.data);
            if(typeof(response.data)=== 'object'){
              vm.results = response.data;
            } else {
              vm.results = [{title: 'No Matching Item Found'}];
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
