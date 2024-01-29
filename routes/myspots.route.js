let express = require("express");
let router = express.Router();
let myspotsCtrl = require("../controllers/myspots.ctrl");
const { validate } = require("../utills/validators/validate_validator");
const validation = require("../utills/validators/myspots_validators");
router.post(
  "/addSpot",
  validation.addSpotValidation(),
  validate,
  myspotsCtrl.addSpot
);
router.get("/view/:id", myspotsCtrl.getSpotDetailCtrl);
router.get("/", myspotsCtrl.getMySpotsCtrl);
router.delete("/:id", myspotsCtrl.deleteSpotCtrl);
router.post("/manageWishlist", myspotsCtrl.manageWishListSpotCtrl);
router.get("/fetch_wishlist", myspotsCtrl.fetchWishListCtrl);
router.get("/fetch_spot_wishlist", myspotsCtrl.fetchWishListSpotsCtrl);
router.get("/getspots", myspotsCtrl.searchSpot);

module.exports = router;
