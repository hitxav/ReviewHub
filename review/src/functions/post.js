import axios from "axios";

export const postRestaurants = async (user, review) => {
  const formData1 = new FormData();
  formData1.append('user',user);
  formData1.append('name',review.name);
  formData1.append('address',review.address);
  formData1.append('cousines',review.cousines);
  formData1.append('rating',review.rating);
  formData1.append('comment',review.comment);
  formData1.append('timestamp',review.timestamp);
  formData1.append('image',review.image);
  const res1 = await axios.post("http://localhost:8080/api/post/restaurant", formData1);
};

export const postUsers = async (userName, review) => {
  const formData = new FormData();
  formData.append('userName',userName);
  formData.append('restaurant',review.restaurant);
  formData.append('rating',review.rating);
  formData.append('comment',review.comment);
  formData.append('image',review.image);
  const res = await axios.post("http://localhost:8080/api/post/user", formData);
};
