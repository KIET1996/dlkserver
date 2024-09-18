const express = require("express");

const doctors = require("../controllers/doctor.controller");

const router = express.Router();

router
  .route("/")
  .get(doctors.findAll)
  .post(doctors.create)
  .delete(doctors.deleteAll);

module.exports = router;