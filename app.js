
var express = require("express");
const path = require("path");
var url = require('url');

var app  = express(); 

app.use(express.static("public"));

app.set("view engine","ejs"); 

app.set('views', path.join(__dirname, "themes/one"));

app.get("/",(req,res)=>{
	

	res.render("site/index"); 
}); 

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 






// app.get("/login",function(req,res){
	
// 	var user = require("./server/common/models/user.js");
// 	var user = new user();
// 	var url_parts = url.parse(req.url, true);
// 	var query = url_parts.query;	
// 	var id = req.query.id;
// 	var qemail = req.query.email;
// 	var pass = req.query.password;

// 	console.log("login id"+id);
		
// 	if( id != 0){

// 		user.findUser(function (userdata)
// 		{

// 		console.log("results in app ="+userdata);
// 		console.log("___________________________________________________________");
// 		res.render("site/login",{users:userdata}); 
// 		});
// 	}
// 	else	
// 	{
// 		res.redirect("/welcome");
// 	}
// }); 

// app.post("/login",function(req,res){


// 		let email = req.body.email;
// 		let password = req.body.password;
// 		var url_parts = url.parse(req.url, true);
// 		var query = url_parts.query;	
// 		var id = req.query.id;
// 		var qemail = req.query.email;
// 		var pass = req.query.password;
		
// 		if(typeof email != 'undefined' && typeof email == typeof qemail && typeof password != 'undefined' && typeof password == typeof pass )
// 		{
// 			var user = require("./server/common/models/user.js");
// 		 	var model = new user();
// 		 	model.setAttribute("id",id);
// 		 	model.setAttribute("email",email);//"email",s@g.c
// 		 	model.setAttribute("password" , password);//"password",123
		 	
		 	
// 		 	model.login(function(){
// 		 		return res.render("site/welcome"); 
// 		 	}); 
// 		 }
// 		 else
// 		 {
// 		//user.query(sql); 
// 				res.render("site/signup"); 
// 		}
// }); 


app.get("/signup",(req,res)=>{
	

	res.render("site/signup"); 
}); 



app.get("/delete",(req,res)=>{
var url_parts = url.parse(req.url, true);
var query = url_parts.query;	
	var id = query.id;
	console.log("deleted id"+id);	
	var user = require("./server/common/models/user.js");
 	var user = new user();
 	user.setAttribute("id",id);//"email",s@g.c		 	
 	user.delete().then(()=>{

		console.log("resolve is call then function");

 		return res.redirect("/users"); 
 	
 	}).catch((error)=>{

 		console.log("error",error); 
 	
		//res.redirect("/users",error); 

 	});
	 
		  
	 
}); 


app.post("/update",(req,res)=>{

	//console.log(req.body.full_name); 
	let fullName = req.body.full_name;//shiva 
		let email = req.body.email;//s@g.c 
		let mobile = req.body.mobile_number; 
		let password = req.body.password;
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;	
		var id = req.query.id; 

		if(typeof fullName != 'undefined' && typeof email != 'undefined' && typeof mobile != 'undefined' && typeof password != 'undefined')
		{
			var user = require("./server/common/models/user.js");
		 	var model = new user();
		 	
		 	model.setAttribute("id",id);
		 	model.setAttribute("email",email);//"email",s@g.c
		 	model.setAttribute("password",password);//"password",123
		 
		 model.update().then((result)=>{
			console.log(result); 
			return res.redirect("/users"); 
		 	}).catch((error)=>{
		 		console.log(error);
		 				res.render("site/signup"); 
		 	});

		 /*	model.update(function(){
		 		return res.redirect("/users"); 
		 	}); 
		 }
		 else
		 {
		//user.query(sql); 
				res.render("site/update"); 
		}*/
	
}});

app.get("/update",(req,res)=>{
var url_parts = url.parse(req.url, true);
var query = url_parts.query;	
	var id = req.query.id;

	console.log("updated id"+id);
		
		if( id != 0)
		{
				var user = require("./server/common/models/user.js");
			 	var user = new user();
			 	user.findOne(id).then( (error,userdata)=>
				{

					if(error)
					{
						throw error;
					}else
					{
						res.render("site/update",{user:userdata}); 
					}
				});
		 }
		 else
		 {
		//user.query(sql); 
				res.redirect("/users"); 
		} 
	
}); 


	// // res.render("site/signup"); 
	// var url_parts = url.parse(req.url, true);
	// var query = url_parts.query;	
	// var id = req.query.id; 
	// if( id != 0)
	// 	{
	// 		var user = require("./server/common/models/user.js");
	// 	 	var user = new user();
	// 	 	 user.setAttribute("id",id);//"email",s@g.c
	// 	 	// user.setAttribute("full_name",full_name);
	// 	 	// user.setAttribute("email",email);
	// 	 	// user.setAttribute("mobile",mobile);
	// 	 	// use.setAttribute("password",password);
		 	
	// 	 	user.findone(function (userdata)
	// 	{

	// 		console.log("results in app ="+userdata);
	// 		console.log("___________________________________________________________");
	// 		res.render("site/update",{user:userdata}); 
	// 	});

		

//}); 

app.get("/users",(req,res)=>{
	var user = require("./server/common/models/user.js");
		 	var user = new user();
	
	user.findAll().then((userdata)=>
	{
		userdata = JSON.parse( JSON.stringify(userdata));
		console.log("results in app ="+userdata);
		res.render("site/users",{users:userdata}); 
	}).catch((error)=>{

		console.log(error);
	});
	
}); 



app.post("/signup",(req,res)=>{


		let fullName = req.body.full_name;//shiva 
		let email = req.body.email;//s@g.c 
		let mobile = req.body.mobile_number; 
		let password = req.body.password; 

		
		if(typeof fullName != 'undefined')
		{
			var user = require("./server/common/models/user.js");
		 	var model = new user();
		 	model.setAttribute("email",email);//"email",s@g.c
		 	model.setAttribute("password" , password);//"password",123
		 	model.setAttribute("full_name" , fullName);//"full_name",shiva
		 	model.setAttribute("mobile",mobile);//"mobile",1232
		 	
		 	model.create().then((result)=>{
			console.log(result); 

		 	}).catch((error)=>{
		 		console.log(error);
		 				res.render("site/signup"); 
		 	});

		 
		 }
		 
}); 

// app.post("/welcome",function(req,res){


// 		let id = parseInt(req.body.t1);//shiva 
	
		
// 		if( id != 0)
// 		{
// 			var user = require("./server/common/models/user.js");
// 		 	var user = new user();

// 		 	user.setAttribute("id",id);//"email",s@g.c
		 	

		 	
// 		 	user.delete(function(){


// 		 		return res.render("site/index"); 
// 		 	}); 
// 		 }
// 		 else
// 		 {
// 		//user.query(sql); 
// 				res.render("site/welcome"); 
// 		}
// }); 


// app.post("/update",function(req,res){

	
// 		let fullName = req.body.update_full_name;//shiva 
// 		let email = req.body.update_email;//s@g.c 
// 		let mobile = req.body.update_mobile_number; 
// 		let password = req.body.update_password;
// 		 var user = require("./server/common/models/user.js");
// 		 var user = new user();
// 			user.setAttribute("email",email);//"email",s@g.c
// 		 	user.setAttribute("password" , password);//"password",123
// 		 	user.setAttribute("full_name" , fullName);//"full_name",shiva
// 		 	user.setAttribute("mobile",mobile);//"mobile",1232
		 	
// 		 	user.update(function(){

// 		 		return res.render("site/update"); 
// 		 	}); 
		 
		 
		
		
		// if(email!=null && email!="")
		// {
		// 	console.log("email"+email);
		// 	user.setAttribute("email" ,email);//"full_name",shiva
			
		// }
		// if(password!=null && password!="")
		// {
		// 	console.log("pass"+password);
		// 	user.setAttribute("password",password);//"mobile",1232
		// }

		// if(fullName!=null && fullName!="")
		// {
		// 	console.log("fullName"+fullName);
		// 	user.setAttribute("full_name",fullName);//"email",s@g.c
		// }

		// if(mobile!=null && mobile!="")
		// {
		// 	console.log("mobile"+mobile);
		// 	user.setAttribute("mobile",mobile);//"password",123
		// }
		
		   

		 	//user.setAttribute("updateid",updateid);
		 	//user.setAttribute("update_full_name",fullName);//"email",s@g.c
		 	//user.setAttribute("update_mobile_number",mobile);//"password",123
		 	//user.setAttribute("update_email" ,email);//"full_name",shiva
		 	//user.setAttribute("update_password",password);//"mobile",1232

		 	
		 	
		
 






app.listen("3000");