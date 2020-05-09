var http = require("http");
var fs = require("fs");
var ejs = require("ejs");

http
  .createServer(function (req, res) {
    var value = {
      userid: "apple",
      userpw: "1234",
    };
    fs.readFile("EJSTest2.ejs", "utf8", function (err, data) {
      res.writeHead("200", { "Content-Type": "text/html" });
      // ejs 파일 형식을 html 파일 형식으로 랜더링
      res.end(ejs.render(data, value));
    });
  })
  .listen(3000, function () {
    console.log("서버 실행 중");
  });
