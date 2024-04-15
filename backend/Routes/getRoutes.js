const express = require("express");
const router = express.Router();

const {
  getAllRestaurant,
  getUserRestaurant,
} = require("../Controllers/getController");


router.get("/reviewList", [], getAllRestaurant);
router.get("/userreviewList", [], getUserRestaurant);

module.exports = router;
