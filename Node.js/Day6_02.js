var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');
var expressErrorHandler = require('express-error-handler');
// npm install mongoose --save
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', static(path.join(__dirname, 'public')));

// 데이터 베이스 연결
var database;   // 데이터베이스 객체를 위한 변수 선언
var UserSchema; // 데이터베이스 스키마 객체를 위한 변수 선언
var UserModel;  // 데이터베이스 모델 객체를 위한 변수 선언

function connectDB(){
    var databaseUrl = "mongodb://localhost:27017/nodedb";

    // 데이터 베이스 연결
    console.log('데이터베이스 연결을 시도합니다.');
    mongoose.Promise = global.Promise; // mongoose의 Promice 객체는 global의 Promise 객체를 사용하도록 함
    mongoose.connect(databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    database = mongoose.connection;

    database.on('error', console.error.bind(console, 'mongoose connection error.'));
    database.on('open', function(){
        console.log('데이터베이스 연결 성공!');

        UserSchema = mongoose.Schema({
            userid: String,
            userpw: String,
            name: String
        });
        console.log('UserSchema 생성 완료!');

        UserSchema.static('findAll', function(callback){
            return this.find({}, callback);
        });

        UserModel = mongoose.model('member', UserSchema);
        console.log('UserModel의 정의 되었습니다.');

        database.on('disconnected', function(){
            console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');
            setInterval(connectDB, 5000);
        });
    });
}

var router = express.Router();

router.route('/member/login').post(function(req, res){
    console.log('/member/login 호출');

    var paramId = req.body.userid;
    var paramPw = req.body.userpw;

    console.log("요청 파라미터 : " + paramId + ", " + paramPw);

    if(database){
        /*
            db.member.insert({"userid":"ryuzy", "name":"류정원", "userpw":"1234", "gender":"남자"})

        */
        authUser(database, paramId, paramPw, function(err, docs){
            if(err) { throw err; }

            if(docs){
                console.dir(docs);
                var username = docs[0].name;
                
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 성공</h2>');
                res.write('<p>아이디 : ' + paramId + '</p>');
                res.write('<p>이름 : ' + username + '</p>');
                res.write('<p>비밀번호 : ' + paramPw + '</p>');
                res.write('<p><a href="/public/login2.html">다시 로그인하기</a>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>아이디 또는 비밀번호를 확인하세요.</p>');
                res.write('<p><a href="/public/login2.html">다시 로그인하기</a>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>데이터베이스에 연결하지 못했습니다.</p>');
        res.end();
    }
});

router.route('/member/regist').post(function(req, res){
    console.log('/member/regist 호출');

    var paramId = req.body.userid;
    var paramPw = req.body.userpw;
    var paramName = req.body.username;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPw + ', ' + paramName);
    
    if(database){
        addMember(database, paramId, paramPw, paramName, function(err, addedMember){
            if(err) { throw err; }
            if(addedMember){
                console.dir(addedMember);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 성공</h2>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.end();
            }
        });
    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>데이터베이스에 연결하지 못했습니다.</p>');
        res.end(); 
    } 
});

router.route('/member/list').post(function(req, res){
    console.log('/member/list 호출');

    if(database){
        UserModel.findAll(function(err, result){
            if(err){
                console.log('리스트 조회 실패');
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>리스트 조회 실패</h2>');
                res.end(); 
            }
            if(result){
                console.dir(result);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원 리스트</h2>');
                res.write('<div><ul>');
                for(var i=0; i<result.length; i++){
                    var id = result[i]._doc.userid;
                    var name = result[i]._doc.name;
                    res.write("<li>" + i + " : " + id + ", " + name + "</li>");
                }
                res.write("</ul></div>");
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>회원 리스트</h2>');
                res.write('<p>회원 리스트가 없습니다.</p>');
                res.end(); 
            }
        });
    }else{
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>데이터베이스에 연결하지 못했습니다.</p>');
        res.end(); 
    }


});

app.use('/', router);

// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback){
    console.log('authUser 호출 : ' + id + ', ' + password);

    UserModel.find({"userid":id, "userpw":password}, function(err, result){
        if(err){
            callback(err, null);
            return;
        }

        if(result.length > 0){
            console.log('아이디 [%s], 비밀번호 [%s] 가 일치하는 사용자를 찾았습니다.', id, password);
            callback(null, result);
        }else{  
        // 조회한 객체(document)가 없는 경우 콜백 함수를 호출하면서 null 전달
            console.log('일치하는 사용자를 찾지 못했습니다.');
            callback(null, null);
        }
    });
};

var addMember = function(database, id, password, name, callback){
    console.log('addMember 호출');

    var users = new UserModel({"userid":id, "userpw":password, "name":name});

    users.save(function(err, addedMember) {
        if(err){
            callback(err, null);
            return;
        }
        
        console.log('회원 document 추가됨');
        callback(null, addedMember);
    });
};







var errorHandler = expressErrorHandler({
    static: {
      '404': './public/404.html'
    }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// 프로세스 종료 시 데이터베이스 연결 해제
process.on('SIGTERM', function(){
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function(){
    console.log("Express 서버 객체가 종료됩니다.");
    if(database){
        database.close();
    }
});

http.createServer(app).listen(3000, function(){
    console.log('익스프레스 서버 동작중...');
    connectDB();
});