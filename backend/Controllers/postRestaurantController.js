const { time } = require("console");
const Restaurant = require("../Models/restaurantModel");

const postRestaurant = async (req, res) => {
  
  try {
    const { user, name, address, cousines, rating, comment, timestamp, image } = req.body;
    console.log("This is the body we get");
    console.log(req.file);
    const restaurant = await Restaurant.findOne({ name: name });

    if (restaurant) {
      console.log("Iam in if")
      const newAvg =
        (restaurant.avgRating * restaurant.totalReviews + parseInt(rating)) /
        (restaurant.totalReviews + 1);
      const doc = await Restaurant.findOneAndUpdate(
        { name: name },
        {
          $push: {
            image: 'http://localhost:8080/' + req.file.path,
            reviews: {
              user: user,
              rating: rating,
              comment: comment,
              timestamp: timestamp
            },
          },
          $inc: { totalReviews: 1 },
          $set: { avgRating: newAvg },
        }
      );
    } else {
      const newRestaurant = new Restaurant({
        name: name,
        address: address,
        cousines: cousines,
        reviews: [
          {
            user: user,
            rating: rating,
            comment: comment,
            timestamp: timestamp,
          },
        ],
        totalReviews: 1,
        avgRating: rating,
        image: 'http://localhost:8080/' + req.file.path
      });

      const doc = await newRestaurant.save();
    }
    return res
      .status(200)
      .json({ data: restaurant, msg: "Restaurant updated." });
  } catch (error) {
    console.log(error);
    return res.status(201).json({ data: "", msg: error });
  }
};

module.exports = { postRestaurant };
