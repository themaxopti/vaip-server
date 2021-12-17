const bcrypt = require('bcrypt-nodejs')
const { validationResult } = require('express-validator')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')


exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные входе'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.body({
                message: "Пользователь не найден"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.json({
                message: "Пользователь не найден"
            })
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )

        res.json({
            token, userId: user.id,
            userName: user.userName,
            userEmail: user.email,
            father: user.father,
            phone: user.phone,
            orders: user.orders,
            totalCount: user.totalCount
        })

    } catch (e) {
        console.log(e)
    }
}


exports.auth = async (req, res) => {
    try {
        const userId = req.user.userId

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }


        res.json({
            userId: user.id,
            userName: user.userName,
            userEmail: user.email,
            father: user.father,
            phone: user.phone,
            orders: user.orders,
            totalCount: user.totalCount
        })

    } catch (e) {
        console.log(e)
    }
}