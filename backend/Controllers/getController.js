const Restaurant = require("../Models/restaurantModel");
const User = require("../Models/userModel");

const getAllRestaurant = async (req, res) => {
  try {
    Restaurant.aggregate([
      {
        $sample: { size: 10 },
      },
    ])
      .then((randomRecords) => {
        return res
          .status(200)
          .json({ data: randomRecords, msg: "Successfull!" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(201).json({ data: "", msg: "Error!" });
      });
  } catch (error) {
    console.log(error);
    return res.status(201).json();
  }
};

const getUserRestaurant = async (req, res) => {
  try {
    const username = req.query.currUser; // Get the username from the request query parameter

    // Query the database for the user with the specified username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return the user information in the response
    console.log(username)
    console.log(user.reviews)
    return res.status(200).json({ data: user.reviews, msg: "User information retrieved successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { getAllRestaurant, getUserRestaurant };
