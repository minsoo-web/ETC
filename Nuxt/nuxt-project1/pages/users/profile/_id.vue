<template>
  <div>
    <h1>유저 id : {{ userid }} 프로필</h1>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    if (!isNaN(params.id)) {
      return true;
    } else {
      return false;
    }
  },
  data() {
    return {
      userid: this.$route.params.id
    };
  }
};
</script>

<style>
</style>
