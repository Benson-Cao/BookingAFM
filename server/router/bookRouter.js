const express = require('express')
const router = express.Router()
const mysql= require('mysql')

const connection =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'afm-book'
})
connection.connect((err)=>{
    if(err) throw err;
    console.log("连接成功")
})

router.post('/book', (req,res)=>{
    const {userId,name, instructor, link, date, count, description, demand} = req.body
    // console.log(name, instructor, date, count, description, demand)

    let sql=`insert into book (userId,name, instructor, link, date, count, description, demand) values('${userId}','${name}','${instructor}', '${link}','${date}','${count}','${description}', '${demand}')`
    connection.query(sql, (err,result)=>{ 
        if(err){
            console.log(err)
        }else{
            let dataString=JSON.stringify(result);
            let data=JSON.parse(dataString);
            res.json({
                status:'200',
                msg:'连接成功',
                data:data
            })
        }
    })
})


module.exports = router;