const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const FileService = require('../../services/fileServices/fileService')
const Vape = require('../../models/Categories/Vape')
const Categories = require('../../models/Categories/Categoriess')


exports.addVapeProduct = async (req, res) => {
    try {
        // const file = req.files.product

        // const fileService = new FileService()

        // const image = await fileService.uploadAvatar(file)
        console.log('===========')

        const {
            description, title, value,
            type,
            typeOfAutomizer,
            valueOfNikotin,
            valueOfAccamulator,
            color,
            htmlColor,
            weight } = req.body


        const vape = new Vape({
            description,
            title,
            value,
            type,
            typeOfAutomizer,
            valueOfNikotin,
            valueOfAccamulator,
            color,
            htmlColor,
            weight
        })


        await vape.save()

        const categories = await Categories.findOneAndUpdate({ _id: "61b63729144b7ffb7c5ba872" }, { $push: { vape: vape._id } }, { new: true })

        res.json(categories)

    } catch (e) {
        console.log(e)
    }
}


exports.addPhotoVape = async (req, res) => {
    try {
        const file = req.files.product


        const fileService = new FileService()

        const image = await fileService.uploadAvatar(file)

        const vape = await Vape.findOneAndUpdate({ title: "Balmy 500" }, { $push: { photos: image } }, { new: true })

        res.json(vape)
    } catch (e) {
        console.log(e)
    }
}