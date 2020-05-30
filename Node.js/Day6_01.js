var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');
var expressErrorHandler = require('express-error-handler');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use('/public', static(path.join(__dirname, 'public')));

// 몽고디비 모듈 사용
// npm install mongodb --save
var MongoClient = require('mongodb').MongoClient;
// 데이터베이스 객체를 위한 변수 선언
var database;

function connectDB(){
    var databaseUrl = "mongodb://localhost:27017";

    MongoClient.connect(databaseUrl, function(err, db){
        if(err) throw err;
        var db = db.db('nodedb');
        console.log('데이터베이스 연결 성공!');
        database = db;
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
        addMember(database, paramId, paramPw, paramName, function(err, result){
            if(err) { throw err; }

            if(result && result.insertedCount > 0) {
                console.dir(result);
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

router.route('/member/edit').post(function(req, res){
    console.log('/member/edit 호출');

    var paramId = req.body.userid;
    var paramPw = req.body.userpw;
    var paramName = req.body.username;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPw + ', ' + paramName);

    if(database){
        editMember(database, paramId, paramPw, paramName, function(err, result){
            if(err) { throw err; }

            if(result && result.modifiedCount > 0) {
                console.dir(result);
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>정보수정 성공</h2>');
                res.end();
            }else{
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>정보수정 실패</h2>');
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
    // member 컬렉션 참조
    var users = database.collection('member');

    users.find({"userid":id, "userpw":password})
                                    .toArray(function(err, docs){
        if(err){
            callback(err, null);
            return;
        }
        if(docs.length > 0){
            console.log('아이디 [%s], 비밀번호 [%s] 가 일치하는 사용자를 찾았습니다.', id, password);
            callback(null, docs);
        }else{  
        // 조회한 객체(document)가 없는 경우 콜백 함수를 호출하면서 null 전달
            console.log('일치하는 사용자를 찾지 못했습니다.');
            callback(null, null);
        }
    });
}

var addMember = function(database, id, password, name, callback){
    console.log('addMember 호출');

    var users = database.collection('member');

    users.insertMany([{"userid":id, "userpw":password, "name":name}], function(err, result){
        if(err){
            callback(err, null);
            return;
        }

        if(result.insertedCount > 0){
            console.log("사용자 document 추가됨 : " + result.insertedCount);
        }else{
            console.log("추가된 document가 없음");
        }
        callback(null, result);
    });
}

var editMember = function(database, id, password, name, callback){
    console.log('editMember 호출');

    var users = database.collection('member');

    users.updateOne({"userid":id}, {$set:{"userid":id, "userpw":password, "name":name}}, function(err, result){
        if(err){
            callback(err, null);
            return;
        }

        if(result.modifiedCount > 0){
            console.log("사용자 document 수정됨 : " + result.modifiedCount);
        }else{
            console.log("수정된 document가 없음");
        }
        callback(null, result);
    });
}

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
