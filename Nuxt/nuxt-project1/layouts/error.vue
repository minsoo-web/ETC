<template>
  <div>
    <h1 v-if="error.statusCode == 404">{{error.statusCode}}</h1>
    <h1 v-else>에러가 발생했습니다.</h1>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

