let express = require("express");
let router = express.Router();
const bookingCtrl = require("../controllers/booking.ctrl");
const { validate } = require("../utills/validators/validate_validator");
router.post("/checkavailable", bookingCtrl.checkAvailableCtrl);

router.post("/cancel", bookingCtrl.cancelBookingCtrl);
router.post("/checkcancellation", bookingCtrl.checkCancellationCtrl);
router.get("/statuslist", bookingCtrl.getBookingStatusCtrl);
router.get("/bookingDates", bookingCtrl.getBookingDatesCtrl);

router.post("/", bookingCtrl.getBookingCtrl);
router.post("/savebooking", bookingCtrl.saveBooking);

module.exports = router;
