import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from './Search.vue'
import SearchList from './SearchList.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import VueClipboard from 'vue-clipboard2'

Vue.component('search-list', SearchList);
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueAxios, axios)
Vue.use(VModal)
Vue.use(VueClipboard)

var vm = new Vue({
  el: '#app',
  render: h => h(Search)
})
