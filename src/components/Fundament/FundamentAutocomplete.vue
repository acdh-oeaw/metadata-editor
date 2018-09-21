<template>
  <v-autocomplete
    v-model="state"
    label="Select"
    :items="states"
    @input.native="loadStates"
  ></v-autocomplete>
</template>

<script>
import debounce from 'debounce'

export default {
  data () {
    return {
      state: null,
      states: []
    }
  },
  methods: {
    loadStates: debounce((event) => {
      if (event.target.value.length > 2) {
        axios.get(`/api/states?q=${event.target.value}`).then(({ data }) => {
          this.states = data
        })
      }
    }, 200)
  }
}
</script>
