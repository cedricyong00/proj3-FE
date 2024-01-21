import { Grid, rem, AspectRatio } from "@mantine/core";
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
          <Grid
            justify="flex-start"
            align="flex-start"
            overflow="hidden"
            columns={4}
          >
            {data.map((restaurant) => (
              <div key={restaurant._id}>
                <Grid.Col span={4} style={{ minHeight: rem(80) }}>
                  <h3>
                    <Link to={`/restaurant/${restaurant._id}`}>
                      <AspectRatio ratio={1080 / 720} maw={300} mx="auto">
                        <img src={restaurant.image} alt="no image available" />
                      </AspectRatio>
                      {restaurant.name}
                    </Link>
                  </h3>
                  <h5>
                    {restaurant.category} / {restaurant.location} <br />
                    {restaurant.timeOpen} - {restaurant.timeClose} <br />
                    {restaurant.address}`
                  </h5>
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
