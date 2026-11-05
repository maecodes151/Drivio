const captainModel = require("../models/captain.model");
const CaptainService = require("../services/captain.server");
const { validationResult } = require("express-validator");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({
    email,
  });

  if (isCaptainAlreadyExist) {
    return res.status(409).json({
      message: "Captain already exists",
    });
  }

  const hashedPassword = await captainModel.hashPassword(password);

  const captain = await CaptainService.registerCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  const captainResponse = captain.toObject();
  delete captainResponse.password;

  return res.status(201).json({ token, captain: captainResponse });
};
