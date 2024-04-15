import axios from "axios";

export const getAllRestaurants = async () => {
  const res = await axios.get("http://localhost:8080/api/get/reviewList");
  return res;
};

export const getUserRestaurants = async function(currUser) {
  const res  = await axios.get("http://localhost:8080/api/get/userReviewList",{
    params:{
      currUser:currUser
    }
  });
  return res;
};
