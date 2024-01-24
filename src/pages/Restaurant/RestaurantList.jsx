import {
  Flex,
  Title,
  Anchor,
  Image,
  Box,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import { useMediaQuery } from "@mantine/hooks";
import classes from "./RestaurantList.module.css";
import { IconClock, IconMapPin, IconToolsKitchen3 } from "@tabler/icons-react";
import useCheckBooking from "../../hooks/useCheckBooking";

function RestaurantList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sendRequest } = useFetch();
  const theme = useMantineTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);
  const { formatTime } = useCheckBooking();

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
      const formattedData = resData.restaurants.map((restaurant) => {
        const timeOpen = restaurant.timeOpen
          ? formatTime(restaurant.timeOpen)
          : null;
        const timeClose = restaurant.timeClose
          ? formatTime(restaurant.timeClose)
          : null;
        return { ...restaurant, timeOpen, timeClose };
      });
      setData(formattedData);
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
          <Title order={2} ta="center">
            Book these tables, now available on ChopeSeats.
          </Title>

          <Flex
            gap="xl"
            justify="flex-start"
            align="stretch"
            wrap="wrap"
            mt="xl"
          >
            {data.map((restaurant) => (
              <Anchor
                key={restaurant._id}
                component={Link}
                to={`/restaurant/${restaurant._id}`}
                underline="none"
                display="block"
                w={
                  isPc
                    ? `calc(33.3333% - var(--mantine-spacing-xl) * 2 / 3`
                    : `100%`
                }
              >
                <Flex direction="column" w="100%" h="100%">
                  {restaurant.image ? (
                    <Box
                      w="100%"
                      h={200}
                      style={{
                        overflow: "hidden",
                        borderRadius: "var(--mantine-radius-md)",
                      }}
                      className={classes.image}
                    >
                      <Image
                        src={restaurant.image}
                        alt={restaurant.name}
                        w="100%"
                        h="100%"
                      ></Image>
                    </Box>
                  ) : (
                    <Flex
                      radius="md"
                      w="100%"
                      h={200}
                      bg="gray.2"
                      align="center"
                      justify="center"
                      className={classes.image}
                      style={{
                        borderRadius: "var(--mantine-radius-md)",
                      }}
                    >
                      <Text c="gray" ta="center">
                        No Image
                      </Text>
                    </Flex>
                  )}

                  <Title order={3} mt="sm" lineClamp={2}>
                    {restaurant.name}
                  </Title>
                  <Box w="100%" mt="auto">
                    <Flex align="center" gap="xs" mt="xs">
                      <Flex align="center" gap="5px">
                        <IconToolsKitchen3 w="sm" h="sm" stroke={1.5} />
                        <Text c="black" lh="1">
                          {restaurant.category}
                        </Text>
                      </Flex>
                      <Flex align="center" gap="5px">
                        <IconMapPin w="sm" h="sm" stroke={1.5} />
                        <Text c="black" lh="1">
                          {restaurant.location}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex align="center" gap="5px" style={{ marginTop: "5px" }}>
                      <IconClock w="sm" h="sm" stroke={1.5} />
                      <Text c="black" lh="1">
                        {restaurant.timeOpen} - {restaurant.timeClose}
                      </Text>
                    </Flex>

                    <Text
                      c="black"
                      size="sm"
                      lineClamp={1}
                      style={{ marginTop: "5px" }}
                    >
                      {restaurant.address}
                    </Text>
                  </Box>
                </Flex>
              </Anchor>
            ))}
          </Flex>
        </>
      )}
    </>
  );
}

export default RestaurantList;
