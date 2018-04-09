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

//查询
app.post('/',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `select * from moban where state=${req.body.state}`;
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

//删除
app.post('/del',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var sql = `delete from moban where id=${req.body.id}`;
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

//添加
app.post('/add',(req,res) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	pool.getConnection(function(err,connection){
		if(err){
			console.log(err)
			return
		}
		var JSON=req.body;
		var sql = `insert into moban(name,sex,state) values(?,?,?)`;
		connection.query(sql,[JSON.name,JSON.sex,JSON.state],function(err,data){
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
