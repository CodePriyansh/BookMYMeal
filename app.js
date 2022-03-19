const express = require("express");
const app = express();
const port = process.env.PORT || 5555
mongoose.connect("mongodb+srv://CodePriyanshu786:pathak123@mucluster.utw9l.mongodb.net/BookMyMeal?retryWrites=true&w=majority");
const path=require('path');
const adminRouter =require('./routes/admin.route');
const userRouter = require('./routes/user.route');
const mongoose=require('mongoose');



const bodyParser = require('body-parser'); 
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



module.exports=mongoose.connection;

app.use('/api/admin',adminRouter);
app.use('/api/user',userRouter);

app.listen(port,()=>{
    console.log("server Started");
})

