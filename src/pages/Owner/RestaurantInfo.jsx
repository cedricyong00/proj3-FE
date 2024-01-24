import { Link, useLocation } from "react-router-dom";
import { Flex, Button, Stack, Box, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDisclosure } from "@mantine/hooks";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import Modal from "../../components/Parts/Modal";
import useCheckBooking from "../../hooks/useCheckBooking";

function RestaurantInfo() {
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  // const pathId = location.pathname.split("/")[2];
  const pathId = "65b10ece45fa2db5554d93c5";
  const { formatTime } = useCheckBooking();

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

  const restDetails = (detail) => {
    const restDeets = {
      // add user info in req body
      Category: detail.category,
      Location: detail.location,
      Address: detail.address,
      "Time Opened": formatTime(detail.timeOpen),
      "Time Closed": formatTime(detail.timeClose),
      "Days Closed": detail.daysClose
        ? detail.daysClose
        : "No rest days specified",
      Phone: detail.phone ? detail.phone : "No phone number provided",
      Website: detail.websiteURL,
      "Maximum Pax": detail.maxPax ? detail.maxPax : "-",
    };

    return Object.entries(restDeets).map(([key, val]) => (
      <p key={key}>
        {key}: {val}
      </p>
    ));
  };

  const handleDelData = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant/${pathId}/delete`,
        "DELETE"
      );
      close();
      successToast({
        title: "Restaurant Info Successfully Deleted",
        message: "The restaurant will be delisted for reservations.",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    } finally {
      close();
    }
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Box maw={500} mx="auto" mt="xl">
            <Stack ta="center">
              <h2>{data.name}</h2>

              <Flex
                gap="md"
                justify="center"
                align="center"
                direction="column"
                wrap="wrap"
                w="100%"
                h="100%"
              >
                {/* <Text align="center" /> */}
                <p>{restDetails(data)}</p>
                <p>{data.description}</p>
                <Flex
                  direction="row"
                  gap="md"
                  justify="center"
                  align="flex-start"
                  wrap="wrap"
                  w="100%"
                  h="100%"
                >
                  <Button
                    mt="sm"
                    onClick={toggle}
                    // onClick={() => form.initialize({ name: "John", age: 20 })}
                  >
                    Delete
                  </Button>
                  <Button
                    mt="sm"
                    component={Link}
                    to={`/owner/restaurant/edit`}
                  >
                    Edit
                  </Button>
                </Flex>
              </Flex>
            </Stack>
          </Box>
          <Modal
            opened={opened}
            title="Delete Restaurant"
            modalContent="These info will be deleted and the restaurant will be delisted for reservation. You will not be able to undo this."
            toggle={toggle}
            close={close}
            handleSubmit={handleDelData}
          />
        </>
      )}
    </>
  );
}
export default RestaurantInfo;
