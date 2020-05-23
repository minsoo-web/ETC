var fs = require("fs"); // filesystem module

var text = fs.readFileSync("./test1.txt", "utf8"); // 동기식으로 test1.txt 파일을 읽어 utf-8 인코딩 방식으로 가져옴

// console.log(text);

// 비동기적 파일 읽기
fs.readFile("test1.txt", "utf8", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});
