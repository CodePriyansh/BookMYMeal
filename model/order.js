
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const orderSchema = mongoose.Schema({
     
     userId :{
         type: mongoose.Types.ObjectId
        //  ,
        //  required: true
     },
     orderedItem :[
         {
             ProductId : {
                 type:Schema.Types.ObjectId,
             ref: 'foodPackages'
             }
         ,
         Qty:{
               type:  Number,
             default:1
             }
            }
     ],
     address :{
         type:String
     },
     orderTotal:{
         type:String
     },
     orderStatus:{
         type:String,
         default:"pending.."
     },
     orderDate:{
         type:String
     }
})

module.exports = mongoose.model('order',orderSchema);