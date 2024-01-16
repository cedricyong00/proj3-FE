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
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useRef } from "react";
// import { DatesProvider } from '@mantine/dates';
// import dayjs from "dayjs";
import Modal from "../../components/Parts/Modal";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";

function NewRestaurant() {
  const [opened, { toggle, close }] = useDisclosure(false);
  // const navigate = useNavigate();
  const { sendRequest } = useFetch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const pathIdNum = parseInt(pathId);
  const { successToast, errorToast } = useToast();

  const form = useForm({
    validate: {
      // category: (value) =>
      //   value === undefined &&
      //   "Please choose a category which best represents your restaurant cuisine",
      // location: (value) =>
      //   value === undefined &&
      //   "Please choose an area which best represents your restaurant's location",
      // address: (value) =>
      //   value === undefined && "Please provide your restaurant address",
      phone: (value) =>
        value &&
        /^[1-9]\d{7}$/.test(value) &&
        "Please enter a valid 8-digit number for Phone",
      maxPax: (value) =>
        value === undefined &&
        "Please enter a number for the max no. of people your restaurant can accept for bookings",
      // timeOpen: (value) => value === undefined && "Please enter a time",
      // timeClose: (value) =>
      //   value === undefined
      //     ? "Please enter a time"
      //     : value < timeOpen && "Closing time must be later than opening time.",
      description: (value) =>
        value?.length > 500 && "Please enter less than 500 characters",
    },

    transformValues: (values) => ({
      timeOpen: (value) => {
        const [hour, min] = value.split(":");
        return parseInt(hour + min, 10);
      },
      timeClose: (value) => {
        const [hour, min] = value.split(":");
        return parseInt(hour + min, 10);
      },
    }),
  });

  const handleSubmit = async () => {
    console.log(form.values);
    try {
      const res = await sendRequest(
        `${import.meta.env.VITE_API_URL}restaurant/create`,
        "POST",
        {
          // add user info in req body
          name: form.values.name,
          image: form.values.image,
          category: form.values.category,
          location: form.values.location,
          timeOpen: form.getTransformedValues.timeOpen,
          timeClose: form.getTransformedValues.timeClose,
          address: form.values.address,
          phone: form.values.phone,
          websiteUrl: form.values.websiteUrl,
          maxPax: form.values.maxPax,
          description: form.values.description,
        }
      );
      // console.log(res);
      // navigate("/restaurant/:restid");
      // close();
      successToast({
        title: "Restaurant Info Successfully Created!",
        message: "Your restaurant is now listed and available for reservations",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    }
  };

  const ref = useRef(null);

  const pickerControl = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => ref.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  const modalContent = (
    <ul>
      <li> test</li>
      {/* <li>Date: {dayjs(form.values.date).format("DD/MM/YYYY")}</li>
      // TOTO change format to hh:mm A 
      <li>Time: {form.values.time}</li>
      {" "}
      <li>
       Description: {form.values.description ? form.values.request : "None"}
        {" "}
      </li> */}
    </ul>
  );

  return (
    <>
      <Title order={2} ta="center">
        Create Your Restaurant
      </Title>
      <Box maw={340} mx="auto" mt="xl">
        <form
          onSubmit={form.onSubmit(() => {
            if (form.isValid) {
              toggle();
            }
          })}
        >
          <TextInput label="Name" withAsterisk placeholder="Placeholder text" />
          <Select
            label="Location"
            withAsterisk
            placeholder="Pick value"
            data={["North", "South", "East", "West", "Central"]}
          />
          <Select
            label="Category"
            withAsterisk
            placeholder="Pick the one that best represents the cuisines your restaurant serves"
            data={["Asian", "Chinese", "Japanese", "Western"]}
          />
          <TextInput
            label="Address"
            withAsterisk
            placeholder="Placeholder text"
          />
          <TextInput label="Phone" placeholder="pls exclude +65 country code" />
          <TextInput
            label="Website URL"
            placeholder="Placeholder text"
            {...form.getInputProps("websiteUrl")}
          />
          <NumberInput
            label="Maximum Pax"
            placeholder="pls indicate the max no. of pax your restaurant will accept for bookings"
            min={1}
            mt="md"
            {...form.getInputProps("maxPax")}
          />
          <TimeInput
            label="Opening Time"
            mt="md"
            ref={ref}
            rightSection={pickerControl}
            {...form.getInputProps("timeOpen")}
          />
          <TimeInput
            label="Closing Time"
            mt="md"
            ref={ref}
            rightSection={pickerControl}
            {...form.getInputProps("timeClose")}
          />
          <Textarea
            label="Description"
            mt="md"
            placeholder="Placeholder text"
            autosize="true"
            minRows={3}
            {...form.getInputProps("request")}
          />
          <TextInput
            label="Image"
            placeholder="Pls enter a URL for your restaurant logo/image"
          />

          <Group justify="center" mt="xl">
            <Button
              type="button"
              component={Link}
              to={`/owner/bookings`}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </Group>
        </form>

        {/* Modal */}
        <Modal
          opened={opened}
          title="Create Your Restaurant"
          modalContent={modalContent}
          toggle={toggle}
          close={close}
          handleSubmit={handleSubmit}
        />
      </Box>
    </>
  );
}

export default NewRestaurant;
