const http = require('http');
const URL = require('url');
const querystring = require('querystring');
const fs = require('fs');
var user={};
var server = http.createServer(function (req, res) {
    //解析数据
    var obj = URL.parse(req.url, true);
    var url = obj.pathname;
    var GET = obj.query;
    var str = ''
    req.on('data', function (data) {
        str += data;
    });
    req.on('end', function () {
        var POST = querystring.parse(str);
        
        if (url == '/user') {
            switch (GET.act) {
                case 'reg':
                    if (user[GET.name]) {//用户已存在
                        res.write('{"achieve":"false","msg":"用户已存在"}');
                    } else {//注册成功
                        user[GET.name]=GET.pass;
                        console.log(user[GET.name])
                        res.write('{"achieve":"true","msg":"注册成功"}');
                    }
                    break;
                case 'login':
                    if (user[GET.name] == undefined) {
                        res.write('{"achieve":"false","msg":"用户不存在"}');
                    } else if (user[GET.name] != GET.pass) {
                        res.write('{"achieve":"false","msg":"密码或用户名有误"}');
                    } else {
                        res.write('{"achieve":"false","msg":"登录成功"}');
                    }

                    break;
                default:
                    res.write('{"achieve":"false","msg";"未知的act"}');
            }
            res.end();
        } else {
            //读取文件
            var file_name = './www' + url;
            fs.readFile(file_name, function (err, data) {
                if (err) {
                    console.log(url);
                } else {
                    res.write(data);
                    res.end();
                }
            })
        }
    })


})
server.listen(8080);