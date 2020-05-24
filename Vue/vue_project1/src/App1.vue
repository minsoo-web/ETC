<template>
  <div id="app">
    <our-header></our-header>
    <our-body></our-body>
    <our-footer></our-footer>
  </div>
</template>

<script>
import OurHeader from "./components/OurHeader.vue";
import OurBody from "./components/OurBody.vue";
import OurFooter from "./components/OurFooter.vue";

export default {
  name: "app",
  components: {
    OurHeader,
    OurBody,
    OurFooter
  }
};
</script>
<style scoped>
</style>