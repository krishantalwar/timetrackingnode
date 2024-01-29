const express = require("express");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  uploadFile,
  getFileStream,
} = require("../middlewares/upload.middleware");
const { getDownloadUrl } = require("../services/S3Bucket.service");

const uploadImage = async (req, res) => {
  const file = req.file;
  // apply filter
  // resize

  const result = await uploadFile(file);
  await unlinkFile(file.path);
  console.log(result);
  const description = req.body.description;
  res.send({ imagePath: `/images/${result.Key}` });
};

const getImage = (req, res) => {
  // console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
};

const getSignedUrl = async (req, res) => {
  const key = req.params.key;
  const readStream = await getDownloadUrl(key);
  res.send(readStream);
};

module.exports = {
  uploadImage,
  getImage,
  getSignedUrl,
};
