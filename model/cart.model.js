const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    userId: Schema.Types.ObjectId,
    foodList: [{
        ProductId:{
        type: Schema.Types.ObjectId,
        ref: 'foodPackages',
        required:true

    },
        qty: {
            type: Number,
            default: 1,
            required:true
        }
    }]
})

module.exports = mongoose.model("carts", cartSchema);