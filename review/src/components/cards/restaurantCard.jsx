import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-yellow-700"
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function RestaurantCard({
  index,
  image,
  restaurantName,
  description,
  openEditModal,
  avgRating,
}) {
  const stars = [];
  for (let i = 0; i < avgRating; i++) {
    stars.push(<StarIcon key={i} />);
  }
  return (
    <>
      <Card className="px-2 py-2 mt-6 w-64" key={index}>
        <CardHeader color="blue-gray" className="relative h-56 ">
          <img src={image} alt="card-image" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {restaurantName}
          </Typography>
          <Typography>{description}</Typography>
          <div className="5 flex items-center gap-0">{stars}</div>
          {openEditModal ? <Button onClick={openEditModal}>Edit</Button> : null}
        </CardBody>
      </Card>
    </>
  );
}
