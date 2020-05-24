<template>
  <div id="app">
    <child-component></child-component>
    <comp-article></comp-article>
  </div>
</template>
<script>
import ChildComponent from "./components/ChildComponent";
import CompArticle from "./components/CompArticle";
export default {
  name: "app",
  components: {
    "child-component": ChildComponent,
    "comp-article": CompArticle
  }
};
</script>