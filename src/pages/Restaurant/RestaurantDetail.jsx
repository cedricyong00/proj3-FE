import { Link, useLocation } from "react-router-dom";
import { Button } from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

// Temporary code for fetching data. Feel free to discard.

function RestaurantDetail() {
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const resData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant/${pathId}`,
        "GET"
      );
      setData(resData);
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
        <>
          <h3>{data.name}</h3>
          <p>{data.description}</p>
          <Button
            mt="md"
            component={Link}
            to={`/restaurant/${data._id}/new-booking`}
          >
            Reserve a table
          </Button>
        </>
      )}
    </>
  );
}

export default RestaurantDetail;
