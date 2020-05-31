const fs = require("fs");
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: "465",
  secure: true,
  auth: {
    user: "",
    pass: "$",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.get("/", (req, res) => {
  fs.readFile("sendMail.html", "utf8", (err, data) => {
    res.writeHead(200, {
      "content-Type": "text/html",
    });
    res.end(data);
  });
});

app.post("/sendMail", (req, res) => {
  fs.readFile("sendMail.html", "utf8", (err, data) => {
    let to = req.body.to;
    let title = req.body.title;
    let content = req.body.content;
    let file = req.file;
    let mailOptions = {
      from: "김민수<@gmail.com>",
      to: to,
      subject: title,
      text: content,
      // attachments: [{ filename: file.filename, content: file }],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      transporter.close();
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });

    console.log("메일 전송");
  });
});

app.listen(3000, () => {
  console.log("서버실행중");
});
