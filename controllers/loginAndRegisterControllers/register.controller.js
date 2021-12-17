const bcrypt = require('bcrypt-nodejs')
const { validationResult } = require('express-validator')
const User = require('../../models/User')
const uuid = require('uuid')
const config = require('config')


const MailService = require('../../services/mailSevec/mailServece')
const Panier = require('../../models/Pannier/Panier')


exports.register = async (req, res) => {
    try {
        res.header('Access-Control-Allow-Origin', "*")
        res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept")

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
        const secretLink = uuid.v4()

        const mailService = new MailService()

        const user = new User({ name, password: hashedPassword, email, activatedLink: secretLink })
        await user.save()

        await mailService.sendEmail(email, `${config.get('API_URL')}/api/activate/${secretLink}`)


        const panier = new Panier({
            userId: user._id,
            userName:user.name
        })

        await panier.save()

        res.status(201).json({
            message: "Пользователь создан"
        })


    } catch (e) {
        console.log(e)
    }
}

exports.activateLink = async (req, res) => {
    try {
        const link = req.params.link
        const user = await User.findOne({ activatedLink: link })

        if (!user) {
            return res.json({
                message: 'Пользователь не найден'
            })
        }

        user.isActivated = true
        await user.save()



        res.redirect(config.get('CLIENT_URL'))

    } catch (e) {

    }
}