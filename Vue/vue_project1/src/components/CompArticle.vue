<template>
  <div id="app2">
    <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium hic quae tempora incidunt nulla, perspiciatis, recusandae odit doloribus libero sapiente modi omnis corrupti ex voluptates voluptatibus aperiam maxime consectetur perferendis.</div>
    <child-component></child-component>
  </div>
</template>
<script>
import ChildComponent from "./ChildComponent";
export default {
  name: "app2",
  components: {
    "child-component": ChildComponent
  }
};
</script>

<style scoped>
#app2 > div {
  background: black;
  color: wheat;
  padding: 10px;
}
</style>