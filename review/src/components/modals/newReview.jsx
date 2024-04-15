import React, { useState, useRef, useEffect } from "react";

import { postRestaurants, postUsers } from "../../functions/post";

import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function NewReviewModal({ isOpen, openModal, userName }) {
  if (!isOpen) return null;

  const [restaurantName, setName] = useState(""); //name of the restaurant
  const [address, setAddress] = useState("");
  const [cousines, setCousines] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [img, setImg] = useState("");
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  function pickImageHandler() {
    filePickerRef.current.click();
  }

  function pickHandler(event) {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    console.log(event.target);
  }

  const handleNewReview = async () => {
    const now = Date();
    await postRestaurants(userName, {
      name: restaurantName,
      address: address,
      cousines: cousines,
      rating: rating,
      comment: comment,
      timestamp: now,
      image: file,
    });
    await postUsers(userName, {
      restaurant: restaurantName,
      rating: rating,
      comment: comment,
      image: file,
    });
    setName("");
    setAddress("");
    setCousines("");
    setRating("");
    setRating("");
    setComment("");
    setImg("");
    openModal();
  };
  return (
    <>
      <Dialog open={isOpen} handler={openModal}>
        <DialogHeader>Add a new review</DialogHeader>
        <DialogBody>
          <div className="my-3 flex flex-col items-center justify-between gap-3">
            <div className="w-[80%]">
              <Input
                label="Restaurant Name"
                value={restaurantName}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[80%]">
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="w-[80%]">
              <Input
                label="Cousines"
                value={cousines}
                onChange={(e) => setCousines(e.target.value)}
              />
            </div>
            <div className="w-[80%]">
              <Input
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="w-[80%]">
              <Input
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {/* <div className="w-[80%]">
              <Input
                label="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
              />
            </div> */}
            <div className="w-[80%]">
              <input
                type="file"
                accept=".jpg,.png,.jpej"
                style={{ display: "none" }}
                ref={filePickerRef}
                onChange={pickHandler}
              ></input>
              
              {previewUrl && <img src={previewUrl} alt="preview" style={{ maxWidth: "40%", paddingBottom: "15px", maxHeight: "100px" }}/>}
              
              
              <Button variant="outlined" onClick={pickImageHandler}>
                Upload Image
              </Button>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={openModal}>
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="black" onClick={handleNewReview}>
            <span>Submit</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
