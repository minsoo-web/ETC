/* 

    보안 수준이 낮은 앱의 엑세스 => 보안 수준이 낮은 앱 허용 : 사용
    https://myaccount.google.com/lesssecureapps

    계정 엑세스 사용을 허용 
    https://accounts.google.com/DisplayUnlockCaptcha
*/
const nodemailer = require("nodemailer");
const fs = require("fs");

// 에러 해결을 위한 hack production 모드에선 사용 x
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "",
    pass: "",
  },
  host: "smtp.mail.com",
  port: "465",
});

fs.readFile("./test1.txt", (err, data) => {
  let mailOptions = {
    from: "김민수 <@gmail.com>",
    to: "@naver.com",
    subject: "node email test",
    attachments: [{ filename: "test1.txt", content: data }],
    html: "<h1>안녕하세요</h1><p>반가워요</p>",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    transporter.close();
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
});
