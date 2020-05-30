const fs = require("fs");
const express = require("express");
const multer = require("multer");

let upload = multer({ dest: "./uploads/" });
let app = express();

app.get("/single", (req, res) => {
  fs.readFile("single.html", "utf8", (err, data) => {
    res.writeHead(200, {
      "content-Type": "text/html",
    });
    res.end(data);
  });
});

app.post("/singleUpload", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.status(204).end();
});
app.listen(3000, () => {
  console.log("서버 실행중");
});
