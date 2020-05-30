/* 

    보안 수준이 낮은 앱의 엑세스 => 보안 수준이 낮은 앱 허용 : 사용
    https://myaccount.google.com/lesssecureapps

    계정 엑세스 사용을 허용 
    https://accounts.google.com/DisplayUnlockCaptcha
*/
const nodemailer = require("nodemailer");

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

let mailOptions = {
  from: "김민수 <@>",
  to: "",
  subject: "node email test",
  text: "ㅎㅇ",
};

transporter.sendMail(mailOptions, (err, info) => {
  transporter.close();
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});
