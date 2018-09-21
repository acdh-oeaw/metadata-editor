import Vue from 'vue';
import Router from 'vue-router';
import Start from '../components/Start';
import Create from '../components/Create';
import Store from '../components/Store';
import Schema from '../components/Schema';
import App from '../components/App';
import Storestats from '../components/StoreStats';
import Config from '../components/Config';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: (to) => {
        if (to.params.lang !== 'en' || to.params.lang !== 'de') {
          // const language = window.navigator.userLanguage || window.navigator.language;
          return '/en';
        }
        return to.fullPath;
      },
    },
    {
      path: '/:lang',
      components: {
        default: App,
      },
      // Children to the root path '/'
      children: [
        {
          path: 'start',
          name: 'start',
          components: {
            Content: Start,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: 'create',
          name: 'create',
          components: {
            Content: Create,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: 'store',
          name: 'store',
          components: {
            Content: Store,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: 'schema',
          name: 'schema',
          components: {
            Content: Schema,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: 'config',
          name: 'config',
          components: {
            Content: Config,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: 'authcallback',
          name: 'authcallback',
          components: {
            Content: Schema,
            rightdrawerbottom: Storestats,
          },
        },
        {
          path: '',
          redirect: { name: 'start' },
        },
      ],
    },
  ],
  scrollBehavior() {
    // always scroll back to the top
    return { x: 0, y: 0 };
  },
});
