const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");

router.post(
  "/register",
  [
    body("email")
      .isString()
      .withMessage("Email is required")
      .bail()
      .trim()
      .isEmail()
      .withMessage("Invalid Email"),
    body("fullname.firstname")
      .isString()
      .withMessage("First name is required")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullname.lastname")
      .isString()
      .withMessage("Last name is required")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isString()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isString()
      .withMessage("Vehicle color is required")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isString()
      .withMessage("Vehicle plate is required")
      .bail()
      .trim()
      .isLength({ min: 3 })
      .withMessage("Vehicle plate must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1")
      .bail()
      .toInt(),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainController.registerCaptain,
);

module.exports = router;
