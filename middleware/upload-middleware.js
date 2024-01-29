const multer = require("multer");

const storage = function () {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "assets/images/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  return storage;
};
const allowedImages = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError =
      "Only jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type are allowed!";
    return cb(
      new Error(
        "Only jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF file type  are allowed!"
      ),
      false
    );
  }
  cb(null, true);
};

const allowedDocs = function (req, file, cb) {
  // Accept docs only
  if (!file.originalname.match(/\.(pdf|doc|txt)$/)) {
    req.fileValidationError = "Only pdf|doc|txt file type are allowed!";
    return cb(new Error("Only pdf|doc|txt file type  are allowed!"), false);
  }
  cb(null, true);
};

module.exports = {
  uploadImage: (req, res, next) => {
    const upload = multer({
      storage: storage(),
      fileFilter: allowedImages,
      limits: { fileSize: 3145728 },
    }).single("image");
    upload(req, res, function (err, result) {
      if (err) {
        return res.status(400).send({ message: "Error in uploading the image" })
      }
      next();
    });
  },
  uploadDoc: (req, res, next) => {
    const upload = multer({
      storage: storage(),
      fileFilter: allowedDocs,
      limits: { fileSize: constData.MAX_SIZE },
    }).single("image");
    upload(req, res, function (err, result) {
      if (err) {
        throw ("Error in uploading the image");
      }
      next();
    });
  },
};
