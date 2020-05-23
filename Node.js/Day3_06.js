var express = require("express");
var router = express.Router();
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(static(path.join(__dirname, "public")));

// localhost:3000/member/login/name
router.route("/member/login/:name").post(function (req, res) {
  console.log("/member/login/:name 페이지 호출");
  var paramId = req.body.userid;
  var paramPw = req.body.userpw;
  var paramName = req.params.name;
  res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
  res.write(`<p>아이디 : ${paramId}</p>`);
  res.write(`<p>비밀번호 : ${paramPw}</p>`);
  res.write(`<p>이름 : ${paramName}</p>`);
  res.end();
});

app.use("/", router);

app.all("*", function (req, res) {
  res.status(404).send("<h1>페이지를 찾을 수 없습니다.</h1>");
});

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
