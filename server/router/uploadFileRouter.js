const express = require("express");
const router = express.Router();
const multer=require("multer");
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

router.get('/upload',uploadFile, (req, res) => {
    console.log(req.body);
    res.send('上传成功')
})

function uploadFile(req,res,next){
    //dest 值为文件存储的路径;single方法,表示上传单个文件,参数为表单数据对应的key
	let upload=multer({dest:"attachment/"}).single("photo");
    upload(req,res,err=>{
		//打印结果看下面的截图
	    console.log(req.file);
		if(err){
	        res.send("err:"+err);
	    }else{
	        //将文件信息赋值到req.body中，继续执行下一步
	        req.body.photo=req.file.filename;
	        next();
	    }
    })

} 
module.exports = router;

