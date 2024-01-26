import {
  ActionIcon,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Box,
  Title,
  rem,
  Group,
  Button,
  MultiSelect,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import Modal from "../../components/Parts/Modal";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

function NewRestaurant() {
  // manage the state of whether a component (such as a modal) is open or closed.
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { sendRequest } = useFetch();
  const { successToast, errorToast } = useToast();
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.isOwner) {
      navigate("/signin");
      return;
    }

    const fetchRestaurantData = async () => {
      try {
        const resData = await sendRequest(
          `${import.meta.env.VITE_API_URL}/restaurant/user`,
          "GET"
        );
        if (resData) {
          navigate("/owner/restaurant");
          return;
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRestaurantData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    validate: {
      category: (value) =>
        value === undefined &&
        "Please choose a category which best represents your restaurant cuisine",
      location: (value) =>
        value === undefined &&
        "Please choose an area which best represents your restaurant's location",
      address: (value) =>
        value === undefined && "Please provide your restaurant address",
      // phone: (value) =>
      //   value &&
      //   /^[1-9]\d{7}$/.test(value) &&
      //   "Please enter a valid 8-digit number for Phone",
      maxPax: (value) =>
        value === undefined &&
        "Please enter a number for the max no. of people your restaurant can accept for bookings",
      timeOpen: (value) => value === undefined && "Please enter a time",
      timeClose: (value, values) =>
        value === undefined
          ? "Please enter a time"
          : value < values.timeOpen &&
            "Closing time must be later than opening time.",
      description: (value) =>
        value?.length > 500 && "Please enter less than 500 characters",
    },
  });

  const handleSubmit = async () => {
    try {
      const res = await sendRequest(
        `${import.meta.env.VITE_API_URL}/restaurant/create`,
        "POST",
        {
          name: form.values.name,
          image: form.values.image,
          category: form.values.category,
          location: form.values.location,
          timeOpen: parseInt(form.values.timeOpen.split(":").join("")),
          timeClose: parseInt(form.values.timeClose.split(":").join("")),
          address: form.values.address,
          daysClose: form.values.daysClose,
          phone: form.values.phone,
          websiteUrl: form.values.websiteUrl,
          maxPax: form.values.maxPax,
          description: form.values.description,
        }
      );
      console.log(res);
      navigate("/owner/restaurant");
      close();
      successToast({
        title: "Restaurant Info Successfully Created!",
        message: "Your restaurant is now listed and available for reservations",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    } finally {
      close();
    }
  };

  const refOpen = useRef(null);
  const refClose = useRef(null);

  const pickerControlOpen = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refOpen.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const pickerControlClose = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refClose.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const modalContent = (form) => {
    const restDetails = {
      // add user info in req body
      Name: form.values.name,
      Category: form.values.category,
      Address: form.values.address,
      Location: form.values.location,
      OpeningHours:
        form.values.timeClose && form.values.timeOpen
          ? `${form.values.timeOpen} - ${form.values.timeClose}`
          : "No opening hours specified",
      DaysClosed: form.values.daysClose
        ? form.values.daysClose
        : "No rest days specified",
      Phone: form.values.phone ? form.values.phone : "No phone number provided",
      MaximumPax: form.values.maxPax,
    };

    return (
      <ul>
        {Object.entries(restDetails).map(([key, value]) => (
          <li key={key}>
            {key === "DaysClosed"
              ? `Days Closed: ${value.join(", ")}`
              : key === "MaximumPax"
              ? `Maximum Pax: ${value}`
              : key === "OpeningHours"
              ? `Opening Hours: ${value}`
              : `${key}: ${value}`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Title order={2} ta="center">
            Create Your Restaurant
          </Title>
          <Box maw={500} mx="auto" mt="xl">
            <form
              onSubmit={form.onSubmit(() => {
                if (form.isValid) {
                  toggle();
                }
              })}
            >
              <TextInput
                label="Name"
                withAsterisk
                placeholder="GA Cafe"
                {...form.getInputProps("name")}
              />
              <Select
                label="Category"
                withAsterisk
                placeholder="Pick one"
                data={["Asian", "Chinese", "Japanese", "Western"]}
                mt="md"
                {...form.getInputProps("category")}
              />
              <Select
                label="Location"
                withAsterisk
                placeholder="Pick one"
                data={["North", "South", "East", "West", "Central"]}
                mt="md"
                {...form.getInputProps("location")}
              />

              <TextInput
                label="Address"
                withAsterisk
                placeholder="79 Anson Rd, Level 20, Singapore 079906"
                mt="md"
                {...form.getInputProps("address")}
              />
              <TextInput
                label="Phone"
                type="number"
                placeholder="01234567 (Exclude +65 country code)"
                mt="md"
                {...form.getInputProps("phone")}
              />
              <TextInput
                label="Website URL"
                placeholder="https://gacafe.com"
                mt="md"
                {...form.getInputProps("websiteUrl")}
              />
              <NumberInput
                label="Maximum Pax"
                placeholder="10"
                min={1}
                required={true}
                mt="md"
                {...form.getInputProps("maxPax")}
              />
              <TimeInput
                label="Opening Time"
                withAsterisk
                mt="md"
                ref={refOpen}
                required={true}
                rightSection={pickerControlOpen}
                {...form.getInputProps("timeOpen")}
              />
              <TimeInput
                label="Closing Time"
                withAsterisk
                mt="md"
                ref={refClose}
                required={true}
                rightSection={pickerControlClose}
                {...form.getInputProps("timeClose")}
              />
              <MultiSelect
                label="Days Closed"
                placeholder="Pick one or more"
                data={[
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ]}
                clearable
                searchable
                mt="md"
                {...form.getInputProps("daysClose")}
              />
              <Textarea
                label="Description"
                mt="md"
                placeholder="A cozy cafe offering a wide range of coffee, tea, and pastries."
                autosize="true"
                minRows={3}
                {...form.getInputProps("description")}
              />
              <TextInput
                label="Image"
                mt="md"
                placeholder="https://gacafe.com/image.jpg"
                {...form.getInputProps("image")}
              />

              <Group justify="center" mt="xl">
                <Button
                  type="button"
                  component={Link}
                  to={`/owner/restaurant`} //return to Owner Dashboard
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Create</Button>
              </Group>
            </form>

            <Modal
              opened={opened}
              title="Create Your Restaurant"
              modalContent={modalContent(form)}
              toggle={toggle}
              close={close}
              handleSubmit={handleSubmit}
            />
          </Box>
        </>
      )}
    </>
  );
}

export default NewRestaurant;
