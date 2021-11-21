//Routing the requests to our server
const express = require('express');
//const { Mongoose } = require('mongoose')
const router = express.Router();
const User=require('./../models/SignUpModels');
const bcrypt = require('bcrypt');
const saltRounds=10;

router.post('/signup',(req,res)=>{
    let {Name,ID,Role,Password}=req.body;
    
    bcrypt.hash(Password,saltRounds).then(hashedPassword => {
        const user = new User({
        Name,
        ID,
        Role,
        Password:hashedPassword
    });
    user.save().then(result=>{
        res.json({
            status:"Success",
            message:"SignUp",
            data:result,
        })
    })
})
.catch(err=>{
    res.json({
        status:"FAILED",
        message:"An Error",

    })
})
    
})


router.post('/signin',(req,res)=>{
        let {ID,Password}=req.body;
        ID=ID.trim();
        Password=Password.trim();
        if(ID=="" || Password==""){
            res.json({
                status:"Failed",
                message:"Empty credentials supplied"
            })
        }
        else{
            //Check if user exist
            User.find({ID})
            .then(data=>{
                if(data.length){
                    //User exist
                    const hashedPassword=data[0].Password;
                    //console.log(data[0].Role);
                    bcrypt.compare(Password,hashedPassword).then(result=>{
                        if(result){
                            res.json({
                                status:"SUCCESS",
                                message:"SignIn Successful",
                                data:data
                            })
                        }else{
                            res.json({
                                status:"FAILED",
                                message:"Invalid password entered"
                            });
                        }
                    })
                    .catch(err => {
                        res.json({
                        status:"FAILED",
                        message:"An error occured while comparing passwords"
                    })
                })
                }else{
                    res.json({
                        status:"FAILED",
                        message:"Invalid credentials"
                    })
                }
            })
            .catch(err => {
                res.json({
                    status:"FAILED",
                    message:"An error occured while checking for the existing user"
                })
            })
        }
})



module.exports=router