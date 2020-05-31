<template>
  <div>
    <h1>채팅방</h1>
    <div class="send">
      <input type="text" v-model="msg" />
      <button @click="allSend">메세지 보내기</button>
      <input type="text" v-model="whisperUser" />
      <button @click="whisperSend">귓속말 보내기</button>
    </div>
    <div>
      <ul>
        <li v-for="(msg,index) in msges" :key="index">{{ msg }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import socket from "@/plugins/socket.io.js";
export default {
  data() {
    return {
      msg: "",
      msges: [],
      whisperUser: ""
    };
  },
  methods: {
    allSend() {
      socket.emit("allSend", this.msg);
    },
    whisperSend() {
      socket.emit("whisper", {
        whisperUser: this.whisperUser,
        message: this.msg
      });
    }
  },
  beforeMount() {
    socket.on("allSend", result => {
      this.msges.push(result);
      this.msg = "";
    });
    socket.on("whisper", result => {
      console.log(result);
      this.msges.push(result);
    });
  }
};
</script>

<style></style>
