import { Link, useLocation } from "react-router-dom";
import { restaurants } from "../../assets/sampleData/restaurant";
import { Button } from "@mantine/core";

function RestaurantDetail() {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const pathIdNum = parseInt(pathId);

  const restaurantData = restaurants.find(
    (restaurant) => restaurant.id === pathIdNum
  );

  return (
    <div>
      <h2>RestaurantDetail</h2>
      <h3>{restaurantData.name}</h3>
      <p>{restaurantData.description}</p>

      <Button
        mt="md"
        component={Link}
        to={`/restaurant/${restaurantData.id}/new-booking`}
      >
        Reserve a table
      </Button>
    </div>
  );
}

export default RestaurantDetail;
