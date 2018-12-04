let users = require('../models/users')

let id = 1;
module.exports = {
    login: (req, res, next) => {
        const { username, password } = req.body

        let user = users.find(user => user.username === username && user.password === password)
        if (user) {
            req.session.user.username = username
            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('Invalid username or password')
        }
    },

    register: (req, res, next) => {
        let newUser = {
            id: id,
            username: req.body.username,
            password: req.body.password
        }
        users.push(newUser)
        req.session.user.username = req.body.username
        id++
        res.status(200).send(req.session.user)
    },
    signout: (req, res, next) => {
        req.session.destroy()
        res.status(200).send(req.session)
    },
    getUser: (req, res, next) => {
        res.status(200).send(req.session.user)
    }

}