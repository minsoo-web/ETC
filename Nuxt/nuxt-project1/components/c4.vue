<template>
  <div>
    <h1>c4 {{ number }}</h1>
    <button @click="plus">증가</button>
  </div>
</template>

<script>
export default {
  props: ["number"],
  methods: {
    plus() {
      this.$emit("onClick");
      // this.number++;
    }
  }
};
</script>

<style>
</style>
