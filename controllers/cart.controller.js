const Cart = require('./../models/cart.model');

class CartController {
    static getCart(userId) {
        return new Promise((resolve, reject) => {
            Cart.findOne({ user: userId, deletedDate: null })
            .populate({
                path: 'items',
                populate: {
                    path: 'product',
                    populate: {
                        path: 'category'
                    }
                }
            })
            .then(resolve)
            .catch(reject);
        });
    }

    static checkBeforeSetCart(userId) {
        return new Promise((resolve, reject) => {
            CartController.getCart(userId)
            .then((cart) => {
                if (cart) {
                    reject(['You have already cart in progress']);
                } else {
                    resolve(userId);
                }
            })
            .catch(reject);
        });
    }

    static setCart(userId) {
        return new Promise((resolve, reject) => {
            Cart.create({
                user: userId
            })
            .then(resolve)
            .catch(reject);
        });
    }
}

module.exports = CartController;
