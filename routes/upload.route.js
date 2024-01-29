let express = require("express");
let router = express.Router();
const uploadCtrl = require("../controllers/upload.ctrl");
const multer = require("multer");
const s3Storage = require("multer-sharp-s3");
const aws = require("aws-sdk");
const crypto = require("crypto");
const { indexOf } = require("lodash");

const bucketName = process.env.AWS_BUCKET_NAME_PUBLIC;
const region = process.env.AWS_REGION_PUBLIC;
const accessKeyId = process.env.AWS_ACCESS_KEY_PUBLIC;
const secretAccessKey = process.env.AWS_SECRET_KEY_PUBLIC;

// console.log("Public bucket cred:  ",process.env.AWS_BUCKET_NAME_PUBLIC
//   ,process.env.AWS_REGION_PUBLIC
//   ,process.env.AWS_ACCESS_KEY_PUBLIC
//   ,process.env.AWS_SECRET_KEY_PUBLIC);

aws.config.update({
  secretAccessKey: secretAccessKey, // Not working key, Your SECRET ACCESS KEY from AWS should go here, never share it!!!
  accessKeyId: accessKeyId, // Not working key, Your ACCESS KEY ID from AWS should go here, never share it!!!
  region: region, // region of your bucket
});

const s3 = new aws.S3();

const storage = s3Storage({
  Key: (req, file, cb) => {
    let imageName = file.originalname;
    let firstName = imageName.substring(0, imageName.indexOf("."));
    let extension = imageName.substring(
      imageName.indexOf("."),
      imageName.length
    );
    cb(null, firstName + "-" + Date.now() + extension);
  },
  s3,
  Bucket: bucketName,
  multiple: true,
  resize: [
    { suffix: "banner", width: 1200, height: 700 },
    { suffix: "thumbnail", width: 440, height: 250 },
    { suffix: "original" },
  ],
});

const upload = multer({ storage });

router.post("/", upload.array("files"), (req, res, next) => {
  let finalFiles = [];
  let files = req.files;
  for (let i in files) {
    let file = files[i];
    finalFiles.push({
      filename: file.originalname,
      imageUrls: {
        original: file.original.Location,
        thumbnail: file.thumbnail.Location,
        banner: file.banner.Location,
      },
    });
  }
  res.send(finalFiles);
});

module.exports = router;
