// 1 번째 예제 -- try catch
var fs = require("fs");

try {
  var data = fs.readFileSync("test1.txt", "utf8");
  console.log(data);
} catch (e) {
  console.log(e);
}

// 비동기 처리는 대부분 콜백함수가 있기때문에 에러객체를 갖고 있다.
// 예외처리를 굳이 할 필요가 없다.
fs.readFile("text1.txt", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

// 2 번째 예제
// fs 메소드와 연계한 예외처리 예제
var fs = require("fs");

try {
  fs.writeFileSync("test4.txt", "hi", "utf8");
  console.log("success");
} catch (err) {
  console.log(err);
}

fs.writeFile("test5.txt", "hi", "utf8", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("success");
  }
});

// 3 번째 예제
// 이벤트 예제

var events = require("events");

// 이벤트 관련 메소드를 사용할 수 있도록 객체를 만듭니다.
var eventEmitter = new events.EventEmitter();

var connectHandler = function connected() {
  console.log("(1)연결성공");
  eventEmitter.emit("data_received");
};

eventEmitter.on("connection", connectHandler); // 2
eventEmitter.on("data_received", function () {
  // data_received 이벤트 발생시 익명함수 실행
  console.log("(2)연결성공");
  console.log("데이터 수신");
});

eventEmitter.emit("connection"); // 1
console.log("프로그램을 종료합니다.");

// 4 번째 예제
// process 객체 예제

process.on("exit", function () {
  console.log("exit 이벤트 발생");
});

setTimeout(function () {
  console.log("ASD");
  process.exit();
}, 3000);

// 5번째 예제
// 예외 처리 예제
process.on("exit", function () {
  console.log("안녕히가세요");
});

process.on("uncaughtException", function (err) {
  console.log("예외 발생");
});

var count = 0;

var id = setInterval(() => {
  count++;
  if (count == 3) {
    clearInterval(id);
  }
  error.error.error();
}, 3000);

// 6번째 예제
// process.emit 을 통해 exit를 발생하는것과
// process.exit 는 다르다는 예제

process.on("exit", function () {
  console.log("안녕히계세요");
});

process.emit("exit");
process.emit("exit");
process.emit("exit");

// process.exit();
console.log("프로그램 실행중");

// 7 번째 예제
// http 모듈 예제
var http = require("http");
var server = http.createServer();

server.on("request", function () {
  console.log("리퀘스트");
});

server.on("connection", function () {
  console.log("connection");
});

server.listen(3000, "localhost");

// 8번 예제
// html 데이터 삽입
var http = require("http");

http
  .createServer(function (req, res) {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>node.js</title>
        </head>
        <body>
          <h1>node.js</h1>
        </body>
      </html>
      `
    );
  })
  .listen(3000, function () {
    console.log("서버 실행중");
  });

// 9번 예제
// html 파일을 읽어와서 요청에 응답

var http = require("http");
var fs = require("fs");
http
  .createServer(function (req, res) {
    fs.readFile("./index.html", function (err, data) {
      if (!err) {
        res.writeHead(200, {
          "content-type": "text/html",
        });
        res.end(data);
      } else {
        console.log(err);
      }
    });
  })
  .listen(3000, function () {
    console.log("서버 실행중");
  });

//  10번 예제
// 사진과 음악을 불러와서 응답

var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    fs.readFile("node_js.png", function (err, data) {
      res.writeHead(200, {
        "content-type": "image/png",
      });
      res.end(data);
    });
  })
  .listen(3000, function () {
    console.log("서버 실행중 (3000)");
  });

http
  .createServer(function (req, res) {
    fs.readFile("node_mp3.mp3", function (err, data) {
      res.writeHead(200, {
        "content-type": "audio/mp3",
      });
      res.end(data);
    });
  })
  .listen(3001, function () {
    console.log("서버 실행중 (3001)");
  });

// 11번
// pathname

var http = require("http");

var fs = require("fs");

var url = require("url");

http
  .createServer(function (req, res) {
    var pathName = url.parse(req.url).pathname;

    if (pathName == "/") {
      fs.readFile("./index.html", function (err, data) {
        res.writeHead(200, {
          "content-type": "text/html",
        });
        res.end(data);
      });
    } else if (pathName == "/sub") {
      fs.readFile("./subpage.html", function (err, data) {
        res.writeHead(200, {
          "content-type": "text/html",
        });
        res.end(data);
      });
    }
  })
  .listen(3000, function () {
    console.log("서버실행중");
  });

// 12 번
// 요청방식에 따른 데이터 응답

var http = require("http");
var fs = require("fs");

http
  .createServer(function (req, res) {
    if (req.method == "GET") {
      fs.readFile("./subpage.html", function (err, data) {
        res.writeHead(200, {
          "content-type": "text/html",
        });
        res.end(data);
      });
    } else if (req.method == "POST") {
      req.on("data", function (data) {
        res.writeHead(200, {
          "content-type": "text/html",
        });
        res.end(`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>node.js</title>
          </head>
          <body>
            <h1>${data}</h1>
          </body>
        </html>`);
      });
    }
  })
  .listen(3000, function () {
    console.log("서버 실행중");
  });
