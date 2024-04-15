import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { logIn, logOut } from "../reduxStore/functions/userReducer";
import { getUserRestaurants } from "../functions/get";
import RestaurantCard from "../components/cards/restaurantCard";
import Modal from "../components/Modal";
import { postRestaurants,postUsers } from "../functions/post";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

function RestaurantInfo() {

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [userReviewsToDisplay, setuserReviewsToDisplay] = useState("");

  useEffect(() => {
    const currUserData = async function(){
      try{
        const result = await getUserRestaurants(loggedInUser.userName);  
        setuserReviewsToDisplay(result.data.data);
      } catch(error){
        console.log(error);
      }
    };
    currUserData();   
  },[]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedRating,setEditedRating] = useState("");

  const openEditModal = (restaurantName, description) => {
    setEditedTitle(restaurantName);
    setEditedDescription(description);
    setEditModalOpen(true);
    setEditedRating(editedRating);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  const handleEditSubmit = async(event) => {
    event.preventDefault();
    console.log("Title:", editedTitle);
    console.log("Description:", editedDescription);
    console.log("Rating:", editedDescription);
    const now = Date();
    await postRestaurants(loggedInUser.userName, {
      name: editedTitle,
      comment: editedDescription,
      rating: editedRating,
      timestamp: now
    });
    await postUsers(loggedInUser.userName, {
      restaurant: editedTitle,
      rating: editedRating,
      comment: editedDescription
    });

    closeEditModal();
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {userReviewsToDisplay ? userReviewsToDisplay.map((item) => (
          <RestaurantCard
            key={item._id}
            id = {item._id}
            image={item.review[0].image}
            restaurantName={item.restaurant}
            description={item.review[item.review.length - 1].comment}
            openEditModal={() => openEditModal(item.restaurant, item.review[item.review.length - 1].comment)}
          />
        )): <div>You have not given Review yet. Give your review Now !!</div>}

        <Modal isOpen={editModalOpen} onClose={closeEditModal}>
          <div className="text-xl font-bold mb-4">Edit</div>
          <form onSubmit={handleEditSubmit}>
          <div className="mb-4">
              <Input
                  label="Comment"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
            </div>
            <div className="mb-4">
              <Input
                  label="Rating"
                  value={editedRating}
                  onChange={(e) => setEditedRating(e.target.value)}
                />
            </div>
            <div className="flex w-max items-end gap-4">
              <Button type="submit" size="sm">
                Save Changes
              </Button>
              <Button onClick={closeEditModal} size="sm">
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
}

export default RestaurantInfo;
