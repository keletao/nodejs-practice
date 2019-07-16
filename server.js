const http = require('http');
const URL = require('url');
var server = http.createServer(function (req, res) {

    var obj = URL.parse(req.url, true);


    var str = '';
    req.on('data', function (data) {
        str += data;
    });

    req.on('end', function () {
        var POST = querystring.parse(str);
        var GET = obj.query;
        var pathname = obj.pathname;
        var user={};
        if (pathname == '/user') { //登录注册模块
            switch (POST.act) {
                case 'reg':
                if(user[POST.user]){//用户已存在
                    res.write('{"achieve":"false","msg":"用户已存在"}');
                }else{//注册成功}
                    res.write('{"achieve":"true","msg":"注册成功"}');
                }
                    break;
                case 'login':
                    if(user[POST.user]==undefined){
                        res.write('{"achieve":"false","msg":"用户不存在"}');
                    }else if(user[POST.user]!=POST.pass){
                        res.write('{"achieve":"false","msg":"密码或用户名有误"}');
                    }else{
                        res.write('{"achieve":"false","msg":"登录成功"}');
                    }
                    
                    break;
                default:
                    res.write('{"achieve":"false","msg";"未知的act"}');
                    break;
            }
        } else { //其他模块  比如文件读取

        }
        res.end();
    });
});
server.listen(8080);

//接口  post   localhost:8080/www/index.html/user?act=reg&name=tao&pass=123   注册
//返回值     1 {"achieve":"false","msg":"用户已存在"}
//          2 {"achieve":"true","msg":"注册成功"}
//
//接口  post   localhost:8080/www/index.html/user?act=login&name=ato&pass=123  登录
//返回值     1 {"achieve":"false","msg":"用户不存在"}
//          2 {"achieve":"false","msg":"密码或用户名有误"}
//          3 {"achieve":"false","msg":"登录成功"}

// 返回值   {"achieve":"false","msg";"未知的act"}