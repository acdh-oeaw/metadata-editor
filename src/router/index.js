import Vue from 'vue';
import Router from 'vue-router';
import Start from '@/components/Start';
import Create from '@/components/Create';
import Load from '@/components/Load';
import Schema from '@/components/Schema';
import App from '@/components/App';

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
          },
        },
        {
          path: 'create',
          name: 'create',
          components: {
            Content: Create,
          },
        },
        {
          path: 'load',
          name: 'load',
          components: {
            Content: Load,
          },
        },
        {
          path: 'schema',
          name: 'schema',
          components: {
            Content: Schema,
          },
        },
        {
          path: '',
          redirect: { name: 'start' },
        },
      ],
    },
  ],
});
