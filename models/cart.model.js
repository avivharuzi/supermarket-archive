const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema, 'carts');

module.exports = Cart;