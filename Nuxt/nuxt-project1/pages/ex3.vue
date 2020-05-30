<template>
  <div>
    <c4 :number="number" @onClick="increase" />
    <h1>index 페이지 {{number}}</h1>
    <button @click="increase">증가</button>
  </div>
</template>

<script>
import c4 from "@/components/c4";

export default {
  components: {
    c4
  },
  data() {
    return {
      number: 0
    };
  },
  methods: {
    increase() {
      this.number++;
    }
  }
};
</script>

<style>
</style>
