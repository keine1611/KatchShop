const multer = require('multer')
const path = require('path')
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const db = require('../model')

// const uploadDir = path.join(__dirname, 'public/uploads')
// if(!fs.existsSync(uploadDir)){
//     fs.mkdirSync(uploadDir)
// }


const storageConfigurations = {
    avatarFolder: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/public/uploads/images/avatars')
        },
        filename: function (req, file, cb) {
            const customFilename = uuidv4()
            const filenameWithExtension = customFilename + path.extname(file.originalname)
            cb(null, filenameWithExtension)
        }
    }),
    brandLogoFolder: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'src/public/uploads/images/brands')
        },
        filename: function (req, file, cb) {
            const customFilename = uuidv4()
            const filenameWithExtension = customFilename + path.extname(file.originalname)
            cb(null, filenameWithExtension)
        }
    })
}

exports.uploadAvatar = multer({ storage: storageConfigurations.avatarFolder })
exports.uploadBrandLogo = multer({ storage: storageConfigurations.brandLogoFolder })
