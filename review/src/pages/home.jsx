import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import RestaurantCard from "../components/cards/restaurantCard";
import { getAllRestaurants } from "../functions/get";

function Home() {
  const [reviewsToDisplay, setReviewsToDisplay] = useState([]);
  const LINKS = [
    {
      title: "Product",
      items: ["Overview", "Features", "Solutions", "Tutorials"],
    },
    {
      title: "Company",
      items: ["About us", "Careers", "Press", "News"],
    },
    {
      title: "Resource",
      items: ["Blog", "Newsletter", "Events", "Help center"],
    },
  ];
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await getAllRestaurants();
        setReviewsToDisplay(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="bg-center bg-cover h-80 flex items-center justify-center text-center">
          <Typography variant="h3" color="black">
            World's Best Review Site. Log In to review restaurants in your area
            or around the world.
          </Typography>
        </div>
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviewsToDisplay &&
              reviewsToDisplay.map((item) => (
                <RestaurantCard
                  key={item._id}
                  image={item.image}
                  restaurantName={item.name}
                  description={item.reviews[item.reviews.length-1].comment}
                  openEditModal={null}
                  avgRating ={item.avgRating}
                />
              ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-300">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {LINKS.map(({ title, items }) => (
              <div key={title}>
                <Typography
                  //variant="subtitle"
                  color="blue-gray"
                  className="font-semibold"
                >
                  {title}
                </Typography>
                <ul className="mt-2">
                  {items.map((link) => (
                    <li key={link}>
                      <Typography
                        as="a"
                        href="#"
                        className="text-gray hover:text-blue-gray-900"
                      >
                        {link}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-blue-gray-50 py-4">
            <Typography variant="small" color="blue-gray" className="text-sm">
              &copy; {currentYear} Review Site. All Rights Reserved.
            </Typography>
            <div className="flex gap-4">
              {/* Add social media icons here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
