const swag = require('../models/swag');

module.exports = {
    add: (req, res, next) => {

        let index = req.session.user.cart.findIndex(item => item.id === +req.query.id)
        if (index !== -1) {
            res.status(200).send(req.session.user)
        } else {
            let newItem = swag.find(item => item.id === +req.query.id)
            req.session.user.cart.push(newItem)
            req.session.user.total += newItem.price
            res.status(200).send(req.session.user)
        }
    },
    remove: (req, res, next) => {
        let index = req.session.user.cart.findIndex(item => item.id === +req.query.id)
        if (index === -1) {
            res.status(404).send("Can't find item with matching ID in cart")
        } else {
            let price = req.session.user.cart[index].price
            req.session.user.total -= price
            req.session.user.cart.splice(index, 1)
            res.status(200).send(req.session.user)
        }
    },
    checkout: (req, res, next) => {
        req.session.user.cart = []
        req.session.user.total = 0
        res.status(200).send(req.session.user)
    }
}