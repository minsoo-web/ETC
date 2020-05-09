var express = require("express");
var http = require("http");

var app = express();

app.use(function (req, res, next) {
  console.log("첫번째 미들웨어 실행");

  var userAgent = req.header("User-Agent");
  var paramName = req.query.name;
  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write("<h1>hi</h1>");
  res.write(`<div>User-Agent : ${userAgent}</div>`);
  res.write(`<div>paramName : ${paramName}</div>`);
  res.end();
});

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
