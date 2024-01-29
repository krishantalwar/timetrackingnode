const httpStatus = require('http-status')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const catchAsync = require('../utils/catchAsync')
const { S3Bucket } = require('../services')

const upload = catchAsync(async (req, res, next) => {
    S3Bucket.upload(req, res, async (error) => {
        console.log('files', req.files)
        if (error) {
            console.log('errors', error)
            res.status(500).json({
                status: 'fail',
                error: error,
            })
        } else {
            // If File not found
            if (req.files === undefined) {
                console.log('uploadProductsImages Error: No File Selected!')
                res.status(500).json({
                    status: 'fail',
                    message: 'Error: No File Selected',
                })
            } else {

                console.log(req.files)
                // If Success
                let fileArray = req.files,
                    fileLocation
                const images = []
                for (let i = 0; i < fileArray.length; i++) {
                    //fileLocation = await S3Bucket.getDownloadUrl(fileArray[i].key)
                    //console.log('filenm', fileLocation)
                    images.push({ url:  fileArray[i].location, key: fileArray[i].key })
                }
                // Save the file name into database
                return res.status(200).json({
                    status: 'ok',
                    message: "Upload successful.",
                    images

                })
            }
        }
    })
})

const download = catchAsync(async (req, res) => {
    const result = await s3Service.download(req.body, res)
    res.send(result)
})

const getDownloadUrl = catchAsync(async (req, res) => {
    const result = await s3Service.getDownloadUrl(req.body)
    res.send({ result })
})

module.exports = {
    upload,
    download,
    getDownloadUrl,
}