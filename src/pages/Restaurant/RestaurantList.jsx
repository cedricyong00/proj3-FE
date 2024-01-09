import { Link } from "react-router-dom";
import { restaurants } from "../../assets/sampleData/restaurant";


function RestaurantList() {
  return (
    <div>
      <h2>RestaurantList</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </h3>
        </div>
      ))}
    </div>
  );
}

export default RestaurantList;
