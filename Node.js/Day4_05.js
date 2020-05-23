var express = require("express");
var http = require("http");
var path = require("path");
var bodyParser = require("body-parser");
var static = require("serve-static");
var errorHandler = require("errorhandler");
var expressErrorHandler = require("express-error-handler");
var multer = require("multer");
var fs = require("fs");
var ejs = require("ejs");

var header = fs.readFileSync("./public/board_list.ejs", "utf8");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/public", static(path.join(__dirname, "public")));
app.use("/uploads", static(path.join(__dirname, "uploads")));

var storage = multer.diskStorage({
  // 파일을 업로드해주는 기능
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  //
  filename: function (req, file, callback) {
    callback(null, file.originalname + Date.now());
  },
});

var upload = multer({
  storage: storage,
  limits: {
    files: 5,
    fieldSize: 1024 * 1024 * 1024, // 1GB
  },
});

var router = express.Router();

router
  .route("/product/write")
  .post(upload.array("photo", 1), function (req, res) {
    console.log("product/write 호출");
    try {
      var files = req.files;
      console.dir("############## 업로드 된 첫번째 파일 정보 ##############");
      console.dir(req.files[0]);
      console.dir("#######################################################");

      var originalname = "",
        filename = "",
        mimetype = "",
        size = 0;

      if (Array.isArray(files)) {
        console.log("배열에 들어있는 파일 갯수 : %d", files.length);
        for (var i = 0; i < files.length; i++) {
          originalname = files[i].originalname;
          filename = files[i].filename;
          mimetype = files[i].mimetype;
          size = files[i].size;
        }
      } else {
        console.log("현재 파일 수 1개");
        originalname = files[0].originalname;
        filename = files[0].filename;
        mimetype = files[0].mimetype;
        size = files[0].size;
      }
      console.log(
        `현재 파일 정보 ${originalname} / ${filename}  / ${mimetype}  / ${size}`
      );
      var paramName = req.body.username;
      var paramContents = req.body.content;

      var html = ejs.render(header, {
        name: paramName,
        content: paramContents,
        filename: filename,
      });
      res.writeHead("200", { "Content-Type": "text/html" });
      res.end(html);
    } catch (error) {
      console.dir(error.stack);
    }
  });

app.use("/", router);

var errorHandler = expressErrorHandler({
  static: {
    "404": "./public/404.html",
  },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function () {
  console.log("서버 실행중");
});
