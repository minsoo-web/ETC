var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var expressErrorHandler = require("express-error-handler");
var errorHandler = require("errorhandler");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", static(path.join(__dirname, "public")));

// 몽고디비 모듈 사용
var MongoClient = require("mongodb").MongoClient;

// 데이터베이스 객체를 위한 변수 선언
var database;
// 몽고디비 버전 업에 따라 조금 다르므로 이에 유의해서 작성
function connectDB() {
  var databaseUrl = "mongodb://localhost:27017";

  MongoClient.connect(databaseUrl, function (err, db) {
    if (err) throw err;
    console.log("데이터베이스 연결 성공!");
    database = db.db("nodedb");
  });
}

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html",
  },
});

var router = express.Router();

router.route("/member/login").post(function (req, res) {
  console.log("/member/login 호출");

  var paramId = req.body.userid;
  var paramPw = req.body.userpw;

  console.log(`요청 파라미터 ${paramId} : ${paramPw}`);

  if (database) {
    // document 추가
    /*
    db.member.insert({
      userid: "minsoo5656",
      name: "김민수",
      userpw: "1234",
      gender: "남자",
    });
    */
    autoUser(database, paramId, paramPw, function (err, docs) {
      if (err) throw err;
      if (docs) {
        console.dir(docs);
        var username = docs[0].name;
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>로그인 성공</h2>");
        res.write(`<p>아이디 : ${paramId}</p>`);
        res.write(`<p>이름 : ${username}</p>`);
        res.write(`<p>비밀번호 : ${paramPw}</p>`);
        res.write(`<a href="/public/login2.html">다시 로그인하기</a>`);
        res.end();
      } else {
        res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
        res.write("<h2>아이디 비밀번호 확인좀</h2>");
        res.write(`<a href="/public/login2.html">다시 로그인하기</a>`);
        res.end();
      }
    });
  } else {
    res.writeHead("200", { "Content-Type": "text/html;charset=utf8" });
    res.write("<h2>데이터베이스 연결 실패</h2>");
    res.end();
  }
});

app.use("/", router);

// 사용자를 인증하는 함수
var autoUser = function (database, id, password, callback) {
  console.log(`authUser호출 : ${id}, ${password}`);
  // member 컬렉션 참조
  var users = database.collection("member");

  users.find({ userid: id, userpw: password }).toArray(function (err, docs) {
    if (err) {
      callback(err, null);
      return;
    }
    if (docs.length > 0) {
      console.log("아이디[%s] 비밀번호[%s]", id, password);
      callback(null, docs);
    } else {
      // 못찾음 -> null 전달
      console.log("일치하는 사용자 찾지 못함");
      callback(null, null);
    }
  });
};

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
  connectDB();
});
