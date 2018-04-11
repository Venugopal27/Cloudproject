var express=require('express')
var app=express();

app.use(express.static(__dirname+'/public'))

app.set('port',process.env.PORT||5000)

var Data=require('nedb')

var db=new Data({filename:'CloudDatabase.db',autoload:true});

app.set('view engine','ejs')

app.get('/',function(req,res) {
	res.render('Login')
})

app.get('/Logout',function(req,res) {
	res.render('Login')
})

app.get('/Signup',function(req,res) {
	res.render('Signup')
})


app.get('/addcontact',function(req,res) {
	res.render('addcontact')
})

app.get('/forgotpass',function(req,res) {
	res.render('forgotpass')
})

app.get('/update',function(req,res) {
		res.render('update')
})




app.get('/Profile',function(req,res) {
		db.find({'Email':e,'Password':p},function(err,result10) {
		if(result10.length>0)
		{
			  console.log('Found Profile:')
			  console.log(result10)
              res.render('Profile',{result11:result10})
		}
	})
	// body...
})

app.get('/forgot',function(req,res) {
	ef=req.query.Email;
      pf=req.query.Phone;
      db.find({'Email':ef,'Phone':pf},function(err,result) {
		if(result.length>0)
		{
			db.find({},function (err,result2) {
              res.render('index2',{result1:result2})
           })
		}
		else{
			//alert("Username or Password is incorrect.TryAgain !!!!");
			//res.render('index1')
			res.render('forgotpass1')
		}
	})
	// body...
})


var e;
var p;
app.get('/getinfo',function(req,res) {
	 e=req.query.Email;
      p=req.query.Password;
	db.find({'Email':e,'Password':p},function(err,result89) {
		console.log("Successful Login:")
		console.log(result89)
		if(result89.length>0)
		{
			db.find({'SEmail':e},function (err,result7) {
				console.log(result7)
              res.render('address1',{result18:result7,result25:result89})
           }) 
		}
		else{
			res.render('Login1')
		}
	})
})

app.get('/admingetinfo',function(req,res) {
	  var ade=req.query.Email;
      var adp=req.query.Password;
		if("testadmin@admin.com"==ade && "adminadmin"==adp)
		{
		console.log("Successful admin Login:")
		db.find({},function(err,result89) {
			res.render('Users',{result899:result89})	
		})
		
		}
		else
		{
			console.log("Unsuccessful admin Login:")
		}
})

app.get('/search',function(req,res) {
	  var searchemail=req.query.Seemail
	db.find({'Email':e,'Password':p},function(err,result89) {
		console.log("Successful Login")
		console.log(result89)
		if(result89.length>0)
		{
			 db.find({'Email':e},function (err,result2) {
				console.log("Found logged in Email:")
				console.log(result2)
				console.log("Searched email:")
				console.log(searchemail)
				db.find({'To':e,'From':searchemail},function (err,result277) {
					console.log("Found inbox email")
					console.log(result277)
                   res.render('myhtml',{result1:result2,result5002:result277})
					
				})
              
           })
		}
		else{
			//alert("Username or Password is incorrect.TryAgain !!!!");
			res.render('myhtml')
		}
	})
	// body...
})

app.get('/formsubmit',function(req,res) {
	em=req.query.Email;
	ph=req.query.Phone;
	var n={
		"Email":req.query.Email,
		"Password":req.query.Password,
		"Phone":req.query.Phone,
		"Fname":req.query.Fname,
		"Lname":req.query.Lname,
		"birthday":req.query.birthday,
		"gender":req.query.gender
	}
	db.find({'Email':em,'Phone':ph},function(err,result100){
		console.log(result100)
		if (result100==false) {
			db.insert(n,function(err,NewDoc) {
		    res.render('Login')
	      })
		}
		else
		{
			 res.render('Signup1')
		}
	})

})

app.get('/addres/:pro',function(req,res) {
		db.find({'adFname':req.params.pro},function(err,result10) {
			console.log("con"+result10)
		res.render('Contactprofile',{result11:result10})
	})
})

app.get('/updatee',function(req,res) {
		var adFnamee=req.query.adFname
		var adLnamee=req.query.adLname
		var adPhonee=req.query.adPhone
		var adEmaile=req.query.adEmail
		console.log(adFnamee)
		console.log(adEmaile)
		db.find({'adEmail':adEmaile},function (err,result5) {
		        console.log(result5)
		        if(result5.length>0)
		        {
		        	console.log(adFnamee)
					console.log(adPhonee)
					console.log(adLnamee)
				db.update({'adEmail':adEmaile},{$set:{'adPhone':adPhonee,'adFname':adFnamee,'adLname':adLnamee}})

                }
		db.find({'SEmail':e},function(err,result17)
		       {
                res.render('address1',{result18:result17})
		       })
	})
})


app.get('/update/:upco',function(req,res) {
	    db.find({'adFname':req.params.upco},function(err,result10) {
	    	console.log(result10)
		res.render('Updatecontact',{result11:result10})
		
	})
})

app.get('/delete/:delee',function(req,res) {
	//console.log("sdaf:"+del)
	adFnameer=req.params.delee
	    db.find({'adFname':req.params.delee},function(err,result221) {
	    	console.log("need to be deleted:"+adFnameer)
	    	console.log(result221)
	    	db.remove({"adFname":req.params.delee})
  			
		db.find({'SEmail':e},function(err,result17)
		       {
                res.render('address1',{result18:result17})
		       })
		
	})
})


app.get('/address1',function(req,res) {
	    db.find({'SEmail':e},function(err,result17)
		       {
		       	console.log(result17)
                res.render('address1',{result18:result17})
		       })
})

app.get('/newcontact',function(req,res) {
	var nc={
		"adEmail":req.query.adEmail,
		"adPhone":req.query.adPhone,
		"adFname":req.query.adFname,
		"adLname":req.query.adLname,
		"adgender":req.query.adgender,
		"SEmail":e
	}
			db.insert(nc,function(err,NewDoc) {
		       db.find({'SEmail':e},function(err,result17)
		       {
		       	console.log(result17)
                res.render('address1',{result18:result17})
		       })
	      })
})

app.get('/address',function(req,res) {
	db.find({'Email':e,'Password':p},function(err,result6) {
		if(result6.length>0)
		{
			db.find({},function (err,result7) {
				console.log(result7)
              res.render('address',{result8:result7})
           })
		}
	})
})
app.get('/Edit',function(req,res) {
		res.render('Edit')
})
var Passworde
var Fnamee
var Lnamee

app.get('/editform',function(req,res) {
		Passworde=req.query.Password;
		Fnamee=req.query.Fname;
		Lnamee=req.query.Lname;
	db.find({'Email':e},function (err,result5) {
		        console.log('Lets see')
		        if(result5.length>0)
		        {
		        	console.log('email:')
		        	console.log(e)
		        	console.log(Passworde)
		        	console.log(Fnamee)
		        	console.log(Lnamee)
		        	console.log('Update enter')

				    db.update({'Email':e},{$set:{'Password':Passworde,'Fname':Fnamee,'Lname':Lnamee}})

				    db.remove({'Email':e,'Password':p})
                	console.log('Update close')

                }
     			res.render('Login')
                /*db.find({'Email':e,'Password':Passworde},function(err,result89) {
					console.log("Successful Login")
					console.log(result89)
					if(result89.length>0)
					{
						db.find({'SEmail':e},function (err,result7) {
							console.log(result7)
         				     res.render('address1',{result18:result7,result25:result89})
         				  }) 
					}
					else{
							res.render('Edit')
					}
				})
				*/
           })
})

app.set('port',process.env.PORT||5000)

app.listen(app.get('port'),function(req,res) {
	console.log('Listening to port 5000')
})