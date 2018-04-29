<template>
  <div style="height:50%; overflow: auto;" class="px-2">
    <li>
      <div
        :class="{bold: isFolder}"
        @click="toggle"
        @dblclick="changeType">
        {{ title }}
        <span v-if="isFolder">[{{ open ? '-' : '+' }}]</span>
      </div>
      <ul v-show="open" v-if="isFolder">
        <li
          class="item"
          v-for="(model, index) in model.children"
          :key="index"
          :model="model">
        </li>
        <li class="add" @click="addChild">+</li>
      </ul>
    </li>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import HELPERS from '../helpers';
import storetreeitem from './StoreTreeItem';

export default {
  mixins: [HELPERS],
  components: {
    storetreeitem,
  },
  data() {
    return {
      open: false,
      model: {
        name: 'My Tree',
        children: [
          { name: 'hello' },
          { name: 'wat' },
          {
            name: 'child folder',
            children: [
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' },
                ],
              },
              { name: 'hello' },
              { name: 'wat' },
              {
                name: 'child folder',
                children: [
                  { name: 'hello' },
                  { name: 'wat' },
                ],
              },
            ],
          },
        ],
      },
      children: [],
      title: '',
    };
  },
  computed: {
    isFolder() {
      return this.model.children &&
        this.model.children.length;
    },
    count() {
      return this.$store.state.n3.tripleCount;
    },
    ...mapGetters('n3', [
      'getTriples',
      'getTitle',
    ]),
  },
  props: [
    'uri',
  ],
  methods: {
    toggle() {
      if (this.isFolder) {
        this.open = !this.open;
      }
    },
    changeType() {
      if (!this.isFolder) {
        this.vm.$set(this.model, 'children', []);
        this.addChild();
        this.open = true;
      }
    },
    addChild() {
      this.model.children.push({
        name: 'new stuff',
      });
    },
    getRoot() {
      const res = this.getTriples({
        predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf',
        object: this.uri,
      });
      if (res.length > 0) {
        let idx = res.length - 1;
        while (idx + 1) {
          this.children.push(res[idx].subject);
          idx -= 1;
        }
        this.title = this.getTitle(this.uri)[0].object;
      }
    },
  },
  watch: {
    uri: function update() {
      this.getRoot();
    },
  },
  created() {
    this.getRoot();
  },
};
</script>

<style scoped>
  .item {
    cursor: pointer;
  }
  .bold {
    font-weight: bold;
  }
  ul {
    padding-left: 1em;
    line-height: 1.5em;
    list-style-type: dot;
  }
</style>
