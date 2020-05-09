var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

// header를 먼저 읽고 나서 처리해야하기 때문에 동기식
var header = fs.readFileSync("header.ejs", "utf8");
var content = fs.readFileSync("content.ejs", "utf8");

http
  .createServer(function (req, res) {
    var html = ejs.render(header, {
      title: "test",
      content: ejs.render(content, { message: "메세지" }),
    });
    res.writeHead("200", { "Content-Type": "text/html" });
    res.end(html);
  })
  .listen(3000, function () {
    console.log("서버 실행 중");
  });
