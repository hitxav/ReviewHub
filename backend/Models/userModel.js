const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    }
  },
  { timestamps: true }
);

const userReviewsSchema = Schema({
  restaurant: {
    type: String,
    required: true,
  },
  review: { type: [reviewSchema], required: true },
});

const userSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  reviews: {
    type: [userReviewsSchema],
    required: true,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
