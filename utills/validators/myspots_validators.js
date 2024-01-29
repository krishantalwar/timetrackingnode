"use strict";
const { body, check } = require("express-validator");

exports.addSpotValidation = () => {
  return [
    check("formSerial")
      .notEmpty()
      .withMessage("Form serial is required")
      .isInt()
      .withMessage("Form Serial must be Int Value"),
    // start validations for basic details
    check("basicDetails.spotCategory")
      .if(check("formSerial").equals("1"))
      .notEmpty()
      .withMessage("Category is required")
      .isInt()
      .withMessage("Category must be Int Value"),
    check("basicDetails.spotStyle")
      .if(check("formSerial").equals("1"))
      .notEmpty()
      .withMessage("Style must be required")
      .isInt()
      .withMessage("Style must be Int Value"),
    check("basicDetails.spotTitle")
      .if(check("formSerial").equals("1"))
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Title is required"),
    check("basicDetails.hourlyRate")
      .if(check("formSerial").equals("1"))
      .isInt()
      .notEmpty()
      .withMessage("Hourly Rate is required"),
    check("basicDetails.cleaningFee")
      .if(check("formSerial").equals("1"))
      .isInt()
      .notEmpty()
      .withMessage("Cleaning fee is required"),
    check("basicDetails.maxGuestsAllowed")
      .if(check("formSerial").equals("1"))
      .isInt()
      .notEmpty()
      .withMessage("Max Guest is required"),
    check("basicDetails.spotDescription")
      .if(check("formSerial").equals("1"))
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Description required"),
    // end validations for basic details
    check("address.streetAddress")
      .if(check("formSerial").equals("1"))
      .isString()
      .trim()
      .notEmpty()
      .withMessage("Address is required"),

    // form2 start
    check("handler.quickspot_id")
      .if(check("formSerial").equals("2"))
      .notEmpty()
      .withMessage("Spot Id is required")
      .isInt()
      .withMessage("Spot Id must be Int Value"),
    check("handler.property_id")
      .if(check("formSerial").equals("2"))
      .notEmpty()
      .withMessage("Property Id is required")
      .isInt()
      .withMessage("Property Id must be Int Value"),
    check("spotpicture.spotSecurity")
      .if(check("formSerial").equals("2"))
      .notEmpty()
      .withMessage("Spot Security is required")
      .isBoolean()
      .withMessage("Spot Security value must be boolean type"),
    check("spotpicture.petFriendly")
      .if(check("formSerial").equals("2"))
      .notEmpty()
      .withMessage("Pet Friendly is required")
      .isBoolean()
      .withMessage("Pet friend value must be boolean type"),
    check("spotpicture.parkingOptions")
      .if(check("formSerial").equals("2"))
      .notEmpty()
      .withMessage("Parking options is required")
      .isBoolean()
      .withMessage("Parking options value must be boolean type"),
    check("spotpicture.additionalParkingInst")
      .if(check("formSerial").equals("2"))
      .isString()
      .trim(),
    check("availableParking")
      .if(check("formSerial").equals("2"))
      .isArray()
      .withMessage("Must be array"),
    check("images")
      .if(check("formSerial").equals("2"))
      .isArray()
      .withMessage("Must be array"),

    // form 3
    check("cpolicy_id")
      .if(check("formSerial").equals("3"))
      .isInt()
      .withMessage("Must be Integer"),

    // form 4
    check("amenities")
      .if(check("formSerial").equals("4"))
      .isArray()
      .withMessage("Must be Array"),
  ];
};

exports.searchSpotRules = () => {
  return [
    // check("type").isInt().withMessage("Select valid type"),
    // check("style").isInt().withMessage("Select valid style"),
  ];
};
