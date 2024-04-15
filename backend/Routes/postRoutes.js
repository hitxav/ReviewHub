const express = require("express");
const router = express.Router();
const { postRestaurant } = require("../Controllers/postRestaurantController");
const { postUser } = require("../Controllers/postUserController");
const fileUpload = require('../middleware/file-upload');

router.post("/restaurant", fileUpload.single('image'),[], postRestaurant);
router.post("/user",fileUpload.single('image'), [], postUser);

module.exports = router;
