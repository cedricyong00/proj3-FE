import { Link, useLocation } from "react-router-dom";
import { Flex, Button, Stack, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useCheckBooking from "../../hooks/useCheckBooking";

function RestaurantInfo() {
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const { formatTime } = useCheckBooking();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const resData = await sendRequest(
        // `${import.meta.env.VITE_API_URL}/restaurant/${pathId}`,
        `${import.meta.env.VITE_API_URL}/restaurant/65a7a95c62474ec1a8470552`,
        "GET"
      );
      setData(resData);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const restDetails = (detail) => {
    const restDeets = {
      // add user info in req body
      Category: detail.category,
      Location: detail.location,
      Address: detail.address,
      timeOpen: formatTime(resData.timeOpen),
      timeClose: formatTime(resData.timeClose),
      "Days Closed": detail.daysClose
        ? detail.daysClose
        : "No rest days specified",
      Phone: detail.phone ? detail.phone : "No phone number provided",
      Website: detail.websiteURL,
      MaximumPax: detail.maxPax ? detail.maxPax : "-",
    };

    return Object.entries(restDeets).map(([key, val]) => (
      <p key={key}>
        {key}: {val}
      </p>
    ));
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Stack ta="center">
            <h2>{data.name}</h2>
            <Flex
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Button
                mt="sm"
                component={Link}
                to={`/restaurant/${data._id}/new-booking`}
              >
                Delete
              </Button>
              <Flex direction="column" w="100%" h="100%">
                <p>{restDetails(data)}</p>
                <br />
                <p>{data.description}</p>
              </Flex>
            </Flex>
          </Stack>
        </>
      )}
    </>
  );
}

export default RestaurantInfo;
