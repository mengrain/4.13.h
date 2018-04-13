var express = require('express')
var bodyparser = require('body-parser')
var mysql = require('mysql')
var app = express()

app.use(bodyparser.urlencoded({}))

var pool = mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'yu62417..',
	database:'item',
	port:3306
}) 
//读取
app.use('/',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            return
        }
        var sql = `select * from kecheng`
        connection.query(sql,function(err,data){
            if(err){
                console.log(err)
                return
         } 
             	res.send(data)
             	connection.end()
        })
    })
})


//修改
app.use('/update',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    pool.getConnection(function(err,connection){
        if(err){
            console.log(err)
            return
        }
        var json = req.body
        var sql = `update kecheng  set one=?,two=?,three=?,four=?,five=? where id=${json.lesson} `
        connection.query(sql,[json.one,json.two,json.three,json.four,json.five],function(err,data){
            if(err){
                console.log(err)
                return
         } 
             	res.send(data)
             	connection.end()
        })
    })
})




app.listen(3000,function(){
	console.log('ok')
})
