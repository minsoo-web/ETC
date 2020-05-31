<template>
  <section>
    <input type="text" v-model="username" />
    <button @click="enter">입장</button>
  </section>
</template>

<script>
import socket from "@/plugins/socket.io.js";
export default {
  data() {
    return {
      username: ""
    };
  },
  methods: {
    enter(e) {
      if (this.username) {
        socket.emit("enter", this.username);
      } else {
        alert("유저 이름이 비었습니다.");
      }
    }
  },
  beforeMount() {
    socket.on("enter", result => {
      if (result) {
        this.$nuxt.$router.replace({ path: "/chat" });
      } else {
        alert("유저 이름이 존재하니 다른 이름으로 참가해주세여");
      }
    });
  }
};
</script>

<style></style>
