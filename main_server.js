const http = require('http');
const URL = require('url');
const querystring = require('querystring');
const fs = require('fs');
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
        var user={};
        if (url == '/user') {
            console.log("成功了");
            switch (GET.act) {
                case 'reg':
                    if (user[GET.user]) {//用户已存在
                        res.write('{"achieve":"false","msg":"用户已存在"}');
                    } else {//注册成功}
                        res.write('{"achieve":"true","msg":"注册成功"}');
                    }
                    break;
                case 'login':
                    if (user[GET.user] == undefined) {
                        res.write('{"achieve":"false","msg":"用户不存在"}');
                    } else if (user[GET.user] != GET.pass) {
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
                    console.log(file_name, url)
                    res.write(data);
                }
            })
        }
    })


})
server.listen(8080);