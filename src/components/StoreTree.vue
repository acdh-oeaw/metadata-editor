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
        <storetreeitem
          class="item"
          v-for="(uri, index) in children"
          :key="index"
          :uri="uri">
        </Storetreeitem>
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
      const root = this.getTriples({ predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#hasTitleImage' });
      const children = this.getTriples(
        { predicate: 'https://vocabs.acdh.oeaw.ac.at/schema#isPartOf',
          object: root[0].subject,
        });
      if (children.length > 0) {
        let idx = children.length - 1;
        while (idx + 1) {
          this.children.push(children[idx].subject);
          idx -= 1;
        }
        this.title = this.getTitle(root[0].subject)[0].object;
      }
    },
  },
  watch: {
    count: function update() {
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
