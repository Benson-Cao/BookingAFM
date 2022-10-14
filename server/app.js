const express = require('express')
const app = express()
const port = 3300

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 解决跨域问题
//采用设置所有均可访问的方法解决跨域问题
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "Authorization,content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.sendStatus(200); //让options尝试请求快速结束
    else
        next();
})
const book=require ("./router/bookRouter");
app.use('/', book)

const getBook=require("./router/getBookRouter");
app.use('/', getBook)

const login=require("./router/loginRouter");
app.use('/', login)

const uploadFile=require("./router/uploadFileRouter");
app.use('/', uploadFile)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})