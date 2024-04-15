const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const restaurantReviewsSchema = Schema({
  user: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  timestamp: {},
});

const restaurantSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  cousines: {
    type: [String],
    required: false,
    default: [],
  },
  image: {
    type: String,
    default: "",
  },
  reviews: {
    type: [restaurantReviewsSchema],
    required: true,
    default: [],
  },
  totalReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  avgRating: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
