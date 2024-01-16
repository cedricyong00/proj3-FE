import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

// Temporary code for fetching data. Feel free to discard.
function RestaurantList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sendRequest } = useFetch();

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    try {
      const resData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant`,
        "GET"
      );
      setData(resData.restaurants);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <h2>RestaurantList</h2>
          {data.map((restaurant) => (
            <div key={restaurant._id}>
              <h3>
                <Link to={`/restaurant/${restaurant._id}`}>
                  {restaurant.name}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default RestaurantList;
