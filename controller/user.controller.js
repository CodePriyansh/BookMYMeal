const User = require('../model/user.model');
// const {validationResult} = require('express-validator');
const { response } = require('express');
const { replaceOne } = require('../model/user.model');
const client = require('twilio')("ACcb3d27c9eaeb98faa158ee1c8d35c683", "7548e5829cc79910cba9df345a667099");
// const client = require('twilio')('AC8d3ddfa8db351b55246b1ed2d8df1bdc', 'e316f92f9d2a5a99bf743af50a3949cf');

const nodemailer = require('nodemailer')

exports.sendOtp = (req, res) => {

  const name = req.params.name
  const email = req.params.email
  const number = req.params.number

  req.session.otp = Math.floor((Math.random() * 100000) + 1);

  const mailData = {
    from: 'pathakpriyanshu44@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: "hii , enter this otp to verify : " + req.session.otp
  }
  function sendTextMessage() {
    client.messages
      .create({ body: 'Hi there' + "enter this otp to verify your account : " + req.session.otp, from: '++18592518128', to: "+91"+number})
      .then(message => console.log(message.sid)).catch((err) => {
        console.log(err)
      });
  }
  sendTextMessage();

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: 'pathakpriyanshu44@gmail.com',
      pass: 'pppppAa786@',
    },
    secure: true,
  });

  transporter.sendMail(mailData, (err, resu) => {
    if (err) {
      console.log(err)
      res.status(500).json(err)
    } else {
      res.status(200).json({ message: "success" })
    }
  })
}


exports.Signup = (req, res) => {
  console.log(req.params.otp + " " + req.params.otp)
  if (req.params.otp == req.session.otp) {

    User.create(req.body).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json(err)
    })
  } else {
    res.status(500).json({ message: "wRONG" });
  }
}
exports.signin = (request, response) => {

  User.findOne({
    email: request.body.email,
    password: request.body.password
  })
    .then(result => {
      console.log(result)
      if (result.blockeduser)
        return response.status(500).json({message:"you are blocked from admin side for some misbehave"});
      else
        return response.status(200).json(result);
    }).catch(err => {
      console.log(err);
      return response.status(500).json({ message: "Oops!something went wrong" });

    });
}

exports.forgotPass = (req,res)=>{

     User.findOne({email:req.params.email}).then(()=>{
        
        req.session.otp =  Math.floor((Math.random() * 100000) + 1);
      const mailData = {
        from : "pathakpriyanshu44@gmail.com",
        to : req.params.email,
        subject : "Forgot Password", 
        text : "your otp for forgot password : " + req.session.otp
      }

      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: 'pathakpriyanshu44@gmail.com',
          pass: 'pppppAa786@',
        },
        secure: true,
      });

      transporter.sendMail(mailData, (err, resu) => {
        if (err) {
          console.log(err)
          res.status(500).json(err)
        } else {
          res.status(200).json({ message: "success" })
        }
      })
     })
}

exports.forgotPassSet = (req,res)=>{
  if(req.session.otp== req.body.otp){

    User.updateOne({email:req.body.email},{
      $set:{password : req.body.newpassword}
    }).then((result)=>{
      res.status(200).json(result)

    }).catch((err)=>{
      res.status(500).json(err)

    })
  }else{
    res.status(200).json()
  }
}

exports.updateprofile = (request, response) => {
  Priest.updateOne({ _id: request.body.id },
    {
      $set: {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
        mobile: request.body.mobile
      }
    }
  )
    .then(result => {
      console.log(result)
      if (result.modifiedCount)
        return response.status(202).json({ message: "update  success..." });
      else
        return response.status(204).json({ message: "not updated...." });
    })
    .catch(err => {
      console.log(err);
      return response.status(500).json({ message: "something went wrong" })
    })
}