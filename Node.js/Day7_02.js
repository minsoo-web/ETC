/*
    보안 수준이 낮은 앱의 액세스 : 보안 수준이 낮은 앱 허용 : 사용
    https://myaccount.google.com/lesssecureapps

    계정 액세스 사용을 허용
    https://accounts.google.com/DisplayUnlockCaptcha

*/

const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "@gmail.com",
    pass: "$",
  },
  host: "smtp.mail.com",
  port: "465",
});

let mailOptions = {
  from: "김민수 ",
  to: "ryuzy@naver.com",
  subject: "node email 테스트중입니다.",
  html: "<h1>안녕하세요. 잘 전달되나요???</h1><p>반가워요~~~</p>",
};

transporter.sendMail(mailOptions, (err, info) => {
  transporter.close();
  if (err) {
    console.log(err);
  }
  console.log(info);
});
