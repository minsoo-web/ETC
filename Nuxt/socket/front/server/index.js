const express = require("express");
let app = express();

const { Nuxt, Builder } = require("nuxt");

let config = require("../nuxt.config.js");
const nuxt = new Nuxt(config);

const http = require("http");
let server = http.createServer(app);

const socket = require("socket.io");
let io = socket(server);

const builder = new Builder(nuxt);
builder.build();

let memberInfoId = {};
let memberInfoName = {};
let getNowDate = d => {
  return `${d.getFullYear()}년 ${d.getMonth() +
    1}월 ${d.getDate()}일 ${d.getHours()}시 ${d.getMinutes()}분 ${d.getSeconds()}초`;
};

let chat = io.of("/chat").on("connection", socket => {
  socket.on("enter", name => {
    let id = socket.id;
    if (memberInfoName.hasOwnProperty(name)) {
      socket.emit("enter", false);
    } else {
      memberInfoName[name] = id;
      memberInfoId[id] = name;
      socket.emit("enter", true);
    }
  });
  socket.on("allSend", msg => {
    let id = socket.id;
    let message = `[전체채팅] ${memberInfoId[id]} - ${msg} (${getNowDate(
      new Date()
    )})`;

    socket.emit("allSend", message);
    socket.broadcast.emit("allSend", message);
  });
  socket.on("whisper", info => {
    let id = socket.id;
    let receiver = memberInfoName[info.whisperUser];
    let msg = `[귓속말] ${memberInfoId[id]}가 ${info.whisperUser}에게 - ${
      info.message
    } (${getNowDate(new Date())})`;
    chat.to(receiver).emit("whisper", msg);
    chat.to(id).emit("whisper", msg);
    ``;
  });
  socket.on("disconnect", () => {
    let id = socket.id;
    let name = memberInfoId[id];
    delete memberInfoId[id];
    delete memberInfoName[name];
  });
});

server.listen(3001, () => {
  console.log("3001에서 서버 실행중");
});
