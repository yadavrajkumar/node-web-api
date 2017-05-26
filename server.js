var express = require("express");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Customer = require("./models/customer");
var bodyParser = require("body-parser");// for post method


app.use(bodyParser.json()); // for post metho

app.use(bodyParser.urlencoded({extended : true}))  // for post method

mongoose.connect("mongodb://localhost/techminds",function(){

	console.log("successfully connected to mongo database")
})

router.get("/",function(request,response){

	response.json({name : "JohnGaltapp"})

})


router.get("/customers",function(request,response){

	Customer.getCustomers(function(err,customerData){
		if(err){

			throw err;
		}
		console.log(customerData)
		 response.json(customerData)
	  
	   })

})

router.post("/customer",function(request,response){

	var customerObj = request.body; // for post method

	 Customer.createCustomer(customerObj,function(err,data){

	 	if (err) {

	 		throw err;
	 	}

	 	response.json(data)
	 })
})

router.post("/customer",function(request,response){

	var customerObj = request.body; // for post method

	 Customer.createCustomer(customerObj,function(err,data){

	 	if (err) {

	 		throw err;
	 	}

	 	response.json(data)
	 })
})

router.put("/customer/:id",function(request,response){

      var userId = request.params.id;
      var dataFromPostman = request.body;

       Customer.getCustomerById(userId,function(err,dataFromDB){
       
			if(err)
				{

					throw err;
				}

	      var bodyObj = {
	                 
	                  name : dataFromPostman.name || dataFromDB.name,
	                  name : dataFromPostman.name || dataFromDB.name,
	                  name : dataFromPostman.name || dataFromDB.name,

	      } 

	      Customer.editCustomer(userId,bodyObj,function(err,data){
	       
		       if(err)
		       {

		        	throw err;
		       }

	        	response.json(data)

	       	})
	  })

      
})

router.delete("/customer/:id",function(request,response){

      var userId = request.params.id;
       Customer.removeCustomer(userId,function(err,data){
       
       if(err)
       {

       	throw err;
       }

        response.json(data)

       })
 
})


router.get("/customer2/:id",function(request,response){

      var userId = request.params.id;
       Customer.getCustomerById(userId,function(err,data){
       
       if(err)
       {

       	throw err;
       }

        response.json(data)

       })
 
})

app.use("/api",router);
var PORT = process.env.PORT ||  2017;
app.listen(PORT,function(){


	console.log("This is a PORT  "+ PORT);
})
		