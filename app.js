const express = require("express");
const app = express();
const port = process.env.PORT || 5555
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://CodePriyanshu786:pathak123@mucluster.utw9l.mongodb.net/BookMyMeal?retryWrites=true&w=majority");

const client = require('twilio')("ACcb3d27c9eaeb98faa158ee1c8d35c683", "7548e5829cc79910cba9df345a667099");

 const session = require('express-session');
const path = require('path');
const adminRouter = require('./routes/admin.route');
const userRouter = require('./routes/user.route');
app.use(session({
    secret: 'bookmymeal'
}));
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

module.exports = mongoose.connection;

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log("server Started");
})

