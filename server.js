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

                }else{//注册成功}

                }
                    break;
                case 'login':
                    if()
                    break;
                default:
                    break;
            }
        } else { //其他模块  比如文件读取

        }
    });
});
server.listen(8080);

//接口  post   localhost:8080/www/index.html/user?act=reg&name=tao&pass=123   注册
//接口  post   localhost:8080/www/index.html/user?act=login&name=ato&pass=123  登录