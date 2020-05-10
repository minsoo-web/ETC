var express = require("express");
var router = express.Router();
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var errorHandler = require("errorhandler");
var cookieParser = require("cookie-parser");
var expressErrorHandler = require("express-error-handler");
var expressSession = require("express-session");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use(
  expressSession({
    secret: "hello nodejs",
    resave: false,
    saveUninitialized: true,
  })
);

router.route("/member/login").post(function (req, res) {
  console.log("/member/login 호출");

  var paramUserId = req.body.userid;
  var paramUserPw = req.body.userpw;
  if (req.session.user) {
    console.log("로그인 되어 상품페이지로 이동합니다.");
    res.redirect("/public/product.html");
  } else {
    req.session.user = {
      userid: paramUserId,
      name: "무명",
      authorized: true,
    };
    res.writeHead("200", {
      "Content-Type": "text/html; charset=utf8",
    });
    res.write("<h1>로그인 성공</h1>");
    res.write(`<p>아이디 : ${paramUserId}</p>`);
    res.write(`<p>비밀번호 : ${paramUserPw}</p>`);
    res.write(`<p><a href='/product/list'>상품리스트로 이동</a></p>`);
    res.end();
  }
});

router.route("/member/logout").get(function (req, res) {
  console.log("로그아웃 호출");
  if (req.session.user) {
    console.log("로그아웃 함");
    req.session.destroy(function (err) {
      if (err) throw err;
      console.log("로그아웃 되었습니다.");
      req.redirect("/public/login2.html");
    });
  } else {
    console.log("아직 로그인 x");
    res.redirect("/public/login2.html");
  }
});

router.route("/product/list").get(function (req, res) {
  console.log("상품페이지 호출");
  if (req.session.user) {
    res.redirect("/public/product.html");
  } else {
    res.redirect("/public/login2.html");
  }
});

app.use("/", router);

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html",
  },
});

// app.all("*", function (req, res) {
//   res.status(404).send("<h1>페이지를 찾을 수 없습니다.</h1>");
// });

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
