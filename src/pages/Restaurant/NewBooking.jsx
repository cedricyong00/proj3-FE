import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Text,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { restaurants } from "../../assets/sampleData/restaurant";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRef, useState } from "react";
import dayjs from "dayjs";

function NewBooking() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const pathIdNum = parseInt(pathId);

  const restaurantData = restaurants.find(
    (restaurant) => restaurant.id === pathIdNum
  );

  const form = useForm({
    validate: {
      pax: (value) =>
        value === undefined
          ? "Please enter a number"
          : value < 1
          ? "Minimum 1 pax"
          : value > restaurantData.maxPax
          ? "Maximum " + restaurantData.maxPax + " pax"
          : value > 10 &&
            "For large group, please contact the restaurant directly",
      date: (value) =>
        value === undefined
          ? "Please enter a date"
          : value < new Date() && "Date must be in the future",
      time: (value) => value === undefined && "Please enter a time",
      request: (value) =>
        value?.length > 100 && "Please enter less than 100 characters",
    },
  });

  const handleSubmit = async () => {
    console.log(form.values);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // TODO add time
            dateTime: form.values.date,
            pax: form.values.pax,
            request: form.values.request,
          }),
        }
      );
      if (!res.ok) throw new Error("Something went wrong");
      const data = await res.json();
      console.log(data);
      setSubmitting(false);
      navigate("/account/bookings");
      close();
      notifications.show({
        title: "Table Reserved!",
        message: "You will receive a confirmation email shortly",
        autoClose: 5000,
      });
    } catch (err) {
      console.log(err);
      close();
      notifications.show({
        title: "Something went wrong!",
        message: "Please try again later",
        autoClose: 5000,
        color: "red",
      });
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

  return (
    <>
      <Title order={2} ta="center">
        Reserve a table at {restaurantData.name}
      </Title>
      <Box maw={340} mx="auto" mt="xl">
        <form
          onSubmit={form.onSubmit((values) => {
            console.log(values);
            if (form.isValid) {
              toggle();
            }
          })}
        >
          <DateInput
            mt="md"
            valueFormat="DD/MM/YYYY"
            label="Date"
            placeholder="01/03/2024"
            {...form.getInputProps("date")}
          />

          <TimeInput
            label="Time"
            mt="md"
            ref={ref}
            rightSection={pickerControl}
            {...form.getInputProps("time")}
          />

          <NumberInput
            label="Number of Pax"
            placeholder="2"
            min={1}
            mt="md"
            {...form.getInputProps("pax")}
          />

          <Textarea
            label="Special Request (If any)"
            mt="md"
            placeholder="Child sheet, wheelchair, etc."
            autosize="true"
            minRows={3}
            {...form.getInputProps("request")}
          />

          <Group justify="center" mt="xl">
            <Button
              type="button"
              component={Link}
              to={`/restaurant/${pathIdNum}`}
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>

        {/* Modal */}
        <Modal opened={opened} onClose={close} title="Reserve a Table">
          <ul>
            <li>Date: {dayjs(form.values.date).format("DD/MM/YYYY")}</li>
            {/* TOTO change format to hh:mm A */}
            <li>Time: {form.values.time}</li>
            <li>Table for: {form.values.pax}</li>
            <li>
              Special Request:{" "}
              {form.values.request ? form.values.request : "None"}
            </li>
          </ul>
          <Text mt="md">Are you sure you want to proceed?</Text>
          <Group justify="center" mt="xl">
            <Button type="button" variant="outline" onClick={toggle}>
              Back
            </Button>
            <Button type="submit" onClick={handleSubmit} loading={submitting}>
              Proceed
            </Button>
          </Group>
        </Modal>
      </Box>
    </>
  );
}

export default NewBooking;
