import { Grid } from "@mantine/core";
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

  console.log(data);

  const getList = async () => {
    try {
      const resData = await sendRequest(
        `${import.meta.env.VITE_API_URL}restaurant`,
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
          <Grid justify="flex-start" align="flex-start" overflow="hidden">
            {data.map((restaurant) => (
              <div key={restaurant._id}>
                <Grid.Col
                  span={{ base: 12, md: 6, lg: 3 }}
                  style={{ minHeight: rem(80) }}
                >
                  <h3>
                    <Link to={`/restaurant/${restaurant._id}`}>
                      {restaurant.name}
                    </Link>
                  </h3>
                  //insert elements here
                </Grid.Col>
              </div>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}

export default RestaurantList;
