const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
// const expressJWT = require("express-jwt");
//为保证JWT字符串的安全性
const secretKey = "itheima";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "afm-book",
});
connection.connect((err) => {
  if (err) throw err;
  console.log("连接成功");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  //   console.log(username, password);
  //调用jsonwebtoken包提供的sign()
  const tokenStr = jwt.sign({ username: username }, secretKey, {
    expiresIn: "60s",
  });
  // 参数1：用户的信息对象
  // 参数2：加密的秘钥
  // 参数3：配置对象，可以配置当前 token 的有效期
  //   console.log(tokenStr);
  let sql = `select * from user where username = '${username}' `;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log('error',err);
    } else {
      // console.log(sql, result);
      // console.log("Fastest:", password == result[0].password);
      // console.log(result.length);
      if (result.length == 0) {
        res.json({ status: 100, msg: "请先注册！" });
      }else if (password == result[0].password) {
        let dataString = JSON.stringify(result);
        let data = JSON.parse(dataString);
        res.json({ status:200,data, token: tokenStr });
      } else {
        res.json({status:101, msg:"密码错误！"});
      }
    }
  });
})
router.get('/userInfo/:userId',(req, res) => {
  const {userId}=req.params
  let sql=` select * from user where id = '${userId}'`
  connection.query(sql,(err, result) => {
    if(err){
      console.log(err)
    }else{
      res.json({ status:200, result, msg:'ok'})
    }
  })
})
module.exports = router;
