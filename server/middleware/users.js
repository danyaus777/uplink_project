const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    validateRegister: (req, res, next) => {
        // password min 6 chars
        if (!req.body.password || req.body.password.length < 6) {
            return res.status(400).send({
                message: "Пожалуйста введите пароль не менее 6 символов"
            })
        }
        next()
    },
    isLoggedIn:(req, res, next) => {
        if(!req.headers.authorization) {
            return res.status(400).send({
                message: 'Вы не авторизованны'
            })
        }
        try {
            const authHeader = req.headers.authorization //Bearer token
            const token = authHeader.split(' ')[1] // Only token
            const decoded = jwt.verify(token, process.env.SECRETKEY)
            req.userData = decoded
            next()
        } catch (err) {
            throw err
            return res.status(400).send({
                message: 'Вы не авторизованны'
            })


        }
    },
    isAdmin:(req, res, next) => {
        if(!req.headers.authorization) {
            return res.status(400).send({
                message: 'Вы не авторизованны'
            })
        }
        try {
            const authHeader = req.headers.authorization //Bearer token
            const token = authHeader.split(' ')[1] // Only token
            const decoded = jwt.verify(token, process.env.SECRETKEY)
            req.userData = decoded
            if (req.userData.roleId !== "Администратор") {
                return res.status(400).send({
                    message: 'У вас нет прав'
                })
            }
            next()
        } catch (err) {
            throw err
            return res.status(400).send({
                message: 'Вы не авторизованны'
            })
        }
    }
}