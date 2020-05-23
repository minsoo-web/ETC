var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");

var app = express();

// body-parser 를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()) -> JSON 형태로 받은 문법을 해석

// 현재 디렉토리로 public 폴더를 매핑(연결)
app.use(static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 실행");
  var paramId = req.body.userid;
  var paramPw = req.body.userpw;

  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write(`<p>아이디 : ${paramId}</p>`);
  res.write(`<p>비밀번호 : ${paramPw}</p>`);
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
