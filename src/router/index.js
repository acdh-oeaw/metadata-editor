import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },

    {
      path: '/vueStandard',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/*',
      name: 'Search',
      component: Search
    }
  ]
})
