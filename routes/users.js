const db    = require('../db');
var express = require('express');
var router  = express.Router();

function DateTime(){
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date+' '+time;
  return dateTime;
}

var list = function(req, res) {
  	var qry  = "SELECT * FROM test_tbl WHERE delete_flg=0",
        resp = { "success": false };
    db.any(qry, [true])
    	.then(function(data){//success
	        if (data.rowCount != 0) {
	            res.render('users/list',{title: "Users", data: data});
	        }
	    })
	    .catch(function(error) {//error
	        res.status(400).send(error);
	    })
};

var add = function(req, res) {
  res.render("users/add", { title: "Add Users" });
};

var edit = function(req, res) {
    var resp = { "success": false },
  		id   = req.params.id,
		qry  = "SELECT * FROM test_tbl WHERE id='"+id+ "' ";
  	db.any(qry, [id])
    	.then(function(data){//success
	        if (data.rowCount != 0) {
	            res.render("users/edit", { title: "Edit Users", data: data[0]});
	        }
	    })
	    .catch(function(error) {//error
	        res.status(400).send(error);
	    })
};

var save = function(req, res) {
  var qry  = "INSERT INTO test_tbl(firstname, lastname, phone, email, created_datetime ) VALUES('"+ req.body.firstname + "','" + req.body.lastname + "','" + req.body.phone + "','" + req.body.email+"','"+ DateTime() +"')",
        resp = { "success": false };
  	db.any(qry, [true])
    	.then(function(data){//success
            return res.redirect("/users");
	    })
	    .catch(function(error) {//error
	        res.status(400).send(error);
	    })
};

var update = function(req, res) {
    var id   = req.params.id,
        qry  = "UPDATE test_tbl SET firstname='"+ req.body.firstname + "', lastname='" + req.body.lastname + "', phone='" + req.body.phone + "', email='" + req.body.email + "', update_datetime='" + DateTime() + "' WHERE id='" + id + "'",
        resp = { "success": false };
  	db.any(qry, [true])
    	.then(function(data){//success
            return res.redirect("/users");
	    })
	    .catch(function(error) {//error
	        res.status(400).send(error);
	    })
};

var del = function(req, res) {
  	var	id   = req.params.id,
      	resp = { "success": false },
      	qry  = "UPDATE test_tbl SET delete_flg=1 WHERE id='"+id+ "' ";
  	db.any(qry, [id])
    	.then(function(data){//success
        	res.redirect("/users");
	    })
	    .catch(function(error) {//error
	        res.status(400).send(error);
	    })
};

module.exports = {
	router, list, add, edit, save, update, del 
};
