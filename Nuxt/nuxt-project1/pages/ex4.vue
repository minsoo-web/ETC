<template>
  <div>
    {{count}}
    <button @click="increment(3)">증가</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["count"])
  },
  methods: {
    ...mapMutations(["increment"])
  }
};
</script>

<style>
</style>
