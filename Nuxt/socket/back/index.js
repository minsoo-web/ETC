const express = require("express");

let app = express();

const http = require("http");
let server = http.createServer(app);

const socket = require("socket.io");
let io = socket(server);

let chat = io.of("/chat").on("connection", (socket) => {
  socket.on("everyBodySend", (msg) => {
    socket.emit("everyBodySend", msg);
  });
});

server.listen(3001, () => {
  console.log("서버가 3001에서 실행중");
});
