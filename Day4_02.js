var express = require("express");
var router = express.Router();
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var errorHandler = require("errorhandler");
var cookieParser = require("cookie-parser");
var expressErrorHandler = require("express-error-handler");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(static(path.join(__dirname, "public")));

app.use(cookieParser());


router.route("/process/setCookie").get(function (req, res) {
  console.log("/process/setCookie 호출");
  res.cookie("user", {
    id: "apple",
    name: "김사과",
    gender: "female",
  });
  res.redirect("/process/showCookie");
});

router.route("/process/showCookie").get(function (req, res) {
  console.log("/process/showCookie 호출");
  res.send(req.cookies);
});

app.use("/", router);

// app.use("/process/showCookie", router);

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html",
  },
});

app.all("*", function (req, res) {
  res.status(404).send("<h1>페이지를 찾을 수 없습니다.</h1>");
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
