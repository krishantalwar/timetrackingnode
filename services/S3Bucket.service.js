var AWS = require('aws-sdk');
const multer = require("multer");
const multerS3 = require('multer-s3')



AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_PUBLIC,
    secretAccessKey: process.env.AWS_SECRET_KEY_PUBLIC,
    region: process.env.AWS_REGION_PUBLIC,
});

var s3 = new AWS.S3();
// s3.listBuckets(function (err, data) {
//   if (err) console.log(err);
//   else console.log(data);
// });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME_PUBLIC,
        acl: 'public-read',
        // contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            console.log(req, file, 'req.body.type')
            cb(null, { fieldName: file.fieldname })
        },
        key: function (req, file, cb) {
            console.log(req, file, 'req.body.type')
            var ext = file.originalname.substring(file.originalname.indexOf('.') + 1)
            cb(null, `${Date.now().toString()}.${ext}`)
        },
    }),
    // SET DEFAULT FILE SIZE UPLOAD LIMIT
    // limits: { fileSize: 1024 * 1024 * 5 }, // 50MB
    // FILTER OPTIONS LIKE VALIDATING FILE EXTENSION
    // fileFilter: function (req, file, cb) {
    //   const filetypes = /jpeg|jpg|png/;
    //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //   const mimetype = filetypes.test(file.mimetype);
    //   if (mimetype && extname) {
    //     return cb(null, true);
    //   } else {
    //     cb('Error: Allow images only of extensions jpeg|jpg|png !');
    //   }
    // },
}).array('files')

/**
 * s3.copyObject
 * @param {Object} params - params
 * @param {string} [params.Bucket] - Bucket Name
 * @param {string} [params.CopySource] - bucketname/externall/1.txt
 * @param {string} [params.Key] - file name
 * @returns {Promise<QueryResult>}
 */

const copyObject = async (params) => {
    console.log(params);

    s3.copyObject(params, function (err, data) {
        if (err) console.log(err, err);
        // an error occurred
        else {
            console.log(data); // successful response
        }
    });
};

/**
 * s3.copyObject
 * @param {Object} params - params
 * @param {string} [params.Bucket] - Bucket Name
 * @param {string} [params.CopySource] - bucketname/externall/1.txt
 * @param {string} [params.Key] - file name
 * @returns {Promise<QueryResult>}
 */

const deleteObject = async (params) => {
    console.log(params);

    s3.deleteObject(params, function (err, data) {
        if (err) console.log(err, err);
        // an error occurred
        else {
            console.log(data); // successful response
        }
    });
};

const listObjectsV2 = (params) => {
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, function async(err, data) {
            if (err) console.log(err, err.stack);
            // an error occurred
            else {
                console.log(data);
                // const images = [];
                // data.Contents.map((value, index) => {
                //     //console.log(value);

                //     const key = value.Key.split('/');

                //     console.log(key);

                //     console.log(value, 'value');
                //     images.push({ key: key[1], order: index + 1 });
                // });
                // return resolve(images);
            } // successful response
            /*
           data = {
            Contents: [
               {
              ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"", 
              Key: "happyface.jpg", 
              LastModified: <Date Representation>, 
              Size: 11, 
              StorageClass: "STANDARD"
             }, 
               {
              ETag: "\"becf17f89c30367a9a44495d62ed521a-1\"", 
              Key: "test.jpg", 
              LastModified: <Date Representation>, 
              Size: 4192256, 
              StorageClass: "STANDARD"
             }
            ], 
            IsTruncated: true, 
            KeyCount: 2, 
            MaxKeys: 2, 
            Name: "examplebucket", 
            NextContinuationToken: "1w41l63U0xa8q7smH50vCxyTQqdxo69O3EmK28Bi5PcROI4wI/EyIJg==", 
            Prefix: ""
           }
           */
        });
    });
};


const getDownloadUrl = async (key) => {
    const options = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Expires: 43200,
    };

    return new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', options, (err, url) => {
            if (err) reject(err);
            return resolve(url);
        });
    });
};
// listObjectsV2({ Bucket: process.env.AWS_BUCKET_NAME })


module.exports = {
    copyObject,
    deleteObject,
    getDownloadUrl,
    upload
};