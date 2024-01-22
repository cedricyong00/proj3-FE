import { Flex, rem, AspectRatio } from "@mantine/core";
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
          <h2>Restaurant List</h2>
          <Flex
            mih={20}
            gap="md"
            justify="flex-start"
            align="center"
            direction="row"
            wrap="wrap"
          >
            {data.map((restaurant) => (
              <div key={restaurant._id}>
                <Link to={`/restaurant/${restaurant._id}`}>
                  <AspectRatio ratio={1} style={{ flex: `0 1 ${rem(100)}` }}>
                    <img src={restaurant.image} alt="no image available" />{" "}
                  </AspectRatio>
                  <h3> {restaurant.name}</h3>{" "}
                </Link>
                <h5>
                  {restaurant.category} / {restaurant.location} <br />
                  {restaurant.timeOpen} - {restaurant.timeClose} <br />
                  {restaurant.address}`
                </h5>
              </div>
            ))}
          </Flex>
        </div>
      )}
    </>
  );
}

export default RestaurantList;
