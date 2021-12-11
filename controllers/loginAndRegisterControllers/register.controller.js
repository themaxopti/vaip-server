const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../../models/User')


exports.register = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', "*")
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")

        console.log(req.body)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const { name, email, password } = req.body

        const candidate = await User.findOne({ email })

        if (candidate) {
            return res.json({
                message: "Такой пользолватель уже существует"
            })
        }

        const candidateName = await User.findOne({ name })

        if (candidateName) {
            return res.json({
                message: "Такой пользолватель уже существует"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        console.log(hashedPassword)

        const user = new User({ name, password: hashedPassword, email })
        await user.save()


        res.status(201).json({
            message: "Пользователь создан"
        })


    } catch (e) {
        console.log(e)
    }
}