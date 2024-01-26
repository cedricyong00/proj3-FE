import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  Flex,
  Button,
  Box,
  Text,
  Anchor,
  Title,
  Image,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import Modal from "../../components/Parts/Modal";
import useCheckBooking from "../../hooks/useCheckBooking";
import useToast from "../../hooks/useToast";

function RestaurantInfo() {
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, { toggle, close }] = useDisclosure(false);
  const { successToast, errorToast } = useToast();
  const { formatTime } = useCheckBooking();
  const theme = useMantineTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);
  const { user } = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    if (!user || !user.isOwner) {
      navigate("/signin");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const resData = await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant/user`,
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

  const handleDelData = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant/${data._id}/delete`,
        "DELETE"
      );
      setData([]);
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
      ) : data.length === 0 ? (
        <Box w="100%" h="100%" mt="xl">
          <Text ta="center">You have not created any restaurant yet!</Text>
          <Box mt="xl" ta="center">
            <Button component={Link} to="/owner/restaurant/new">
              Create a new restaurant
            </Button>
          </Box>
        </Box>
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
                w="100%"
                h="auto"
                mt="lg"
                radius="md"
              ></Image>
            )}

            <Box w={isPc ? "70%" : "100%"} mx="auto">
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

            <Flex
              direction="row"
              gap="md"
              justify="center"
              align="flex-start"
              wrap="wrap"
              w="100%"
              h="100%"
              mt="xl"
            >
              <Button mt="sm" onClick={toggle} variant="outline">
                Delete
              </Button>
              <Button mt="sm" component={Link} to={"/owner/restaurant/edit"}>
                Edit
              </Button>
            </Flex>
          </Box>

          {/* Modal */}
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
