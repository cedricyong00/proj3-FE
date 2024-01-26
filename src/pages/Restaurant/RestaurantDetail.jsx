import { Link, useLocation } from "react-router-dom";
import {
  Button,
  Image,
  Text,
  Title,
  Box,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import classes from "./RestaurantList.module.css";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useCheckBooking from "../../hooks/useCheckBooking";
import { useMediaQuery } from "@mantine/hooks";

function RestaurantDetail() {
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const { formatTime } = useCheckBooking();
  const theme = useMantineTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);

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
      const formattedTimeOpen = resData.timeOpen
        ? formatTime(resData.timeOpen)
        : null;
      const formattedTimeClose = resData.timeClose
        ? formatTime(resData.timeClose)
        : null;
      setData({
        ...resData,
        timeOpen: formattedTimeOpen,
        timeClose: formattedTimeClose,
      });
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
          <Box w={isPc ? "80%" : "100%"} mx="auto">
            <Title order={2} ta="center">
              {data.name}
            </Title>
            {data.image && (
              <Image
                src={data.image}
                alt={data.name}
                className={classes.image}
                w="100%"
                h="auto"
                mt="lg"
                radius="md"
              ></Image>
            )}

            <Box mt="xl" mx="auto" ta="center">
              <Button
                component={Link}
                to={`/restaurant/${data._id}/new-booking`}
              >
                Reserve a table
              </Button>
            </Box>

            <Text mt="xl">Category: {data.category}</Text>
            <Text>Location: {data.location}</Text>
            <Text>Address: {data.address}</Text>
            <Text>
              Opening Hours: {data.timeOpen} - {data.timeClose}
            </Text>
            <Text>
              Days Closed:{" "}
              {data?.daysClose?.length > 0 ? data.daysClose.join(", ") : "-"}
            </Text>
            <Text>Phone: {data.phone ? data.phone : "-"}</Text>
            <Text>
              Website:{" "}
              {data.websiteUrl ? (
                <Anchor href={data.websiteUrl} target="_blank">
                  {data.websiteUrl}
                </Anchor>
              ) : (
                "-"
              )}
            </Text>
            <Text mt="lg">
              Description:
              <br />
              {data.description ? data.description : "-"}
            </Text>
          </Box>
        </>
      )}
    </>
  );
}

export default RestaurantDetail;
