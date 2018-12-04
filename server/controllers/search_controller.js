const swag = require('../models/swag');

module.exports = {
    search: (req, res, next) => {
        if (req.query.category === 'hats' || 'shirts' || 'jackets' || 'sweaters' || 'pants' || 'shorts') {
            res.status(200).send(swag.filter(item => item.category === req.query.category))
        } else {
            res.status(200).send(swag)
        }
    }
}