const Admin=require('../model/admin.model');
// const {validationResult} = require('express-validator');
const { response } = require('express');
const User = require("../model/user.model")

exports.signup=(request,response)=>{
    // const errors= validationResult(request);
    // if(!errors.isEmpty()){
    //     return response.status(403).json({errors:errors.array()})
    // }
    let email=request.body.email;
    let password=request.body.password;
    let name=request.body.name;

    Admin.create({
        email:email,
        password:password,
        name:name
    }).then(result=>{
        console.log(result);
        return response.status(201).json(result);
    }).catch(err=>{
        console.log(err);
    });
}

exports.signin=(request,response)=>{
    // const errors=validationResult(request);
    // if(!errors.isEmpty()){
    //     return response.status(403).json({errors:errors.array()})
    // }
    Admin.findOne({
        email:request.body.email,
        password:request.body.password
    })
    .then(result=>{
       if(result)
        return response.status(200).json(result);
       else
       return response.status(404).json({message:"Invalid user"});
    }).catch(err=>{
        console.log(err);
        return response.status(500).json({message:"Oops!something went wrong"});

    });
}

exports.updateprofile=(request,response)=>{
    Priest.updateOne({_id:request.body.id},
       {
         $set:{
           email:request.body.email,
           password:request.body.password
         }
       }
     )
    .then(result=>{
      console.log(result)
       if(result.modifiedCount)
         return response.status(202).json({message:"update  success..."});
       else
         return response.status(204).json({message:"not updated...."});
    })
    .catch(err=>{
      console.log(err);
      return response.status(500).json({message:"something went wrong"})
    })
 }



 exports.viewusers = (request, response) => {
  User.find()
    .then(results => {
      console.log(results);
      return response.status(200).json(results)
    })
    .catch(err => {
      console.log(err);
      return response.status(500).json({ message: "Error" })
    })
}

exports.blockUser = (req,res)=>{

   User.updateOne({_id:req.params.id},{
     $set:{
       blockeduser: true
     }
   }).then(result=>{
          res.status(200).json(result)
   }).catch(err => {
     res.status(500).json(err)
   })
   
}