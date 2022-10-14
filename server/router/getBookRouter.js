const express = require("express");
const router = express.Router();
const mysql = require("mysql");

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

router.get("/getBook", (req, res) => {
  let sql = `select * from book`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString);
      res.json(data);
    }
  });
});

router.get("/getBook/:userId", (req, res) => {
  const userId = req.params.userId;
  let sql = `select b.id,b.userId,b.name,b.instructor,b.link,b.date,b.count,b.description,b.demand 
    from book b, user u where b.userId='${userId}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString);
      res.json(data);
    }
  });
});

router.post("/updatebook", (req, res) => {
  // console.log(req.body)
  const {id,name,instructor,link, date, count, description, demand} = req.body;
  let sql=`update book set name='${name}', instructor='${instructor}', link='${link}', date='${date}',count='${count}', description='${description}', demand='${demand}' where id=${id}`

  connection.query(sql, (err, result) => {
    if(err){
      console.log(err)  
    }
    else{
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString);
      res.json({status: 200, msg:'更新成功'});
    }
  })
})
router.delete("/book/:id", (req, res) => {
  // console.log(req)
  const {id} = req.params;
  let sql=`delete from book where id=${id}`

  connection.query(sql, (err, result) => {
    if(err){
      console.log(err)  
    }
    else{
      let dataString = JSON.stringify(result);
      let data = JSON.parse(dataString);
      res.json({status: 200, msg:'删除成功'});
    }
  })
})
module.exports = router;
