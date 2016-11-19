/*
 *  载入依赖项
 *  fs：文件系统； path：href解决文案；
 *  body-parser：解析Request body和处理req
 *  api：处理前台请求的接口
 */
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const app = express();
const resolve = file=>path.resolve(__dirname, file);

const cookieParser = require('cookie-parser')
//const session=require('express-session');
//const flash=require('connect-flash');
//const messages=require('express-messages');

/*
 * 监听3300端口
 * 用JSON格式处理bodyParser请求
 */
app.set('port', (process.env.port || 3300));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.set('view engine', 'ejs');

app.use(cookieParser());
// app.use(session({
//     secret: 'nodeblog',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }
// }));
//app.use(flash());
// app.use(function (req, res, next) {
//     res.locals.messages = messages(req, res);
//     next();
// });

app.use(api);   //最好放在下边



/**
 * 设置静态资源目录为dist
 * 排除api接口的路由，向浏览器发送根文件
 */
app.use('/dist', express.static(resolve('../dist')));
app.get('*', function (req, res, next) {
    if(req.originalUrl.indexOf('/article')!=0 || req.originalUrl.indexOf('/category')!=0 || req.originalUrl.indexOf('/favorite')!=0) {
        const html = fs.readFileSync(resolve('../index.html'), 'utf-8');
        res.send(html);
    }else{
        next();
    }
});

app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});



