<template>
  <div>
    <component v-if="component" v-model="selectedValue" :name="name" :is="component" :type="mappedType"></component>
  </div>
</template>

<script>
import HELPERS from '../helpers';
import archeautocomplete from './AutocompArche';
import autocompdefault from './AutocompDefault';
/* eslint no-param-reassign: ["error", { "props": false }] */

const defaultComponentObject =
  {
    type: '',
    name: 'v-text-field',
  }
;

export default {
  mixins: [HELPERS],
  props: [
    'type',
    'name',
  ],
  components: {
    archeautocomplete,
    autocompdefault,
  },
  name: 'FormComponentWrapper',
  data() {
    return {
      selectedValue: null,
      loading: false,
      component: null,
      mappedType: null,
      componentMap: {
        // contains objects with 2 props: name -> component name;
        // type -> prop to give to component.
        person: { type: 'persons', name: 'archeautocomplete' },
        place: { type: 'places', name: 'archeautocomplete' },
        publication: { type: 'publications', name: 'archeautocomplete' },
        organisation: { type: 'organisations', name: 'archeautocomplete' },
        agent: { type: 'agent', name: 'autocompdefault' },
        agentorplace: { type: 'agentorplace', name: 'autocompdefault' },
        containerorreme:  { type: 'persons', name: 'autocompdefault' },
        containerorresource:  { type: 'containerorresource', name: 'autocompdefault' },
        main:  { type: 'main', name: 'autocompdefault' },
        publicationorrepoobject: { type: 'publicationorrepoobject', name: 'autocompdefault' },
        repoobject: { type: 'repoobject', name: 'autocompdefault' },
        anyuri:  { type: 'anyuri', name: 'autocompdefault' },
        date: { name: 'v-date-picker' },
        string: defaultComponentObject,
        text: defaultComponentObject,
        positiveinteger: defaultComponentObject,
      },
    };
  },
  methods: {

  },
  created() {

    const typeL = this.type.toLowerCase();
    const c = this.componentMap[typeL];

    this.$info('FormComponentWrapper created', c, typeL);
    this.component = c.name;
    this.mappedType = c.type;
  },
};
</script>
