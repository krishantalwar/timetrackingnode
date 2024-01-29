let express = require("express");
let router = express.Router();
// const uploadCtrl = require("../controllers/upload.ctrl");
// let {searchSpot,getSpotDetailCtrl,listCityOrCategory} = require("../controllers/myspots.ctrl");
// const { validate } = require("../utills/validators/validate_validator");
// const validation = require("../utills/validators/myspots_validators");


const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.render("index.hbs", { title: "QuickSpot" });
// });


// router.get("/images/:key",uploadCtrl.getImage);

// router.post("/images", upload.single("image"), uploadCtrl.uploadImage);

// router.post("/getspots",validation.searchSpotRules(),validate,searchSpot);
// router.get("/viewspot/:id", getSpotDetailCtrl);
// router.get("/getlist/:keyname",listCityOrCategory);


module.exports = router;
