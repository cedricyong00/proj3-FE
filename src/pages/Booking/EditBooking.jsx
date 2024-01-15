import {
  ActionIcon,
  Box,
  Button,
  Group,
  NumberInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Modal from "../../components/Parts/Modal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useToast from "../../hooks/useToast";

function EditBooking() {
  const navigate = useNavigate();
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  const { sendRequest } = useFetch();
  const ref = useRef(null);
  const { successToast, errorToast } = useToast();
  const [data, setData] = useState([]);

  useEffect(() => {
    getSingleBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSingleBooking = async () => {
    const resData = await sendRequest(
      `${import.meta.env.VITE_API_URL}/booking/${pathId}`,
      "GET"
    );
    setLoading(false);
    setData(resData.booking);
    form.setValues({
      pax: resData.booking.pax,
      date: new Date(resData.booking.dateTime),
      time: dayjs(resData.booking.dateTime).utc().local().format("HH:mm"),
      request: resData.booking.request,
    });
  };

  const form = useForm({
    validate: {
      pax: (value) =>
        value === undefined
          ? "Please enter a number"
          : value < 1 && "Minimum 1 pax",
      // TODO
      // : value > data.maxPax
      // ? "Maximum " + data.maxPax + " pax"
      // : value > 10 &&
      //   "For large group, please contact the restaurant directly",
      date: (value) =>
        value === undefined
          ? "Please enter a date"
          : value < new Date() && "Date must be in the future",
      time: (value) =>
        value === undefined
          ? "Please enter a time"
          : value < new Date() && "Time must be in the future",
      request: (value) =>
        value?.length > 100 && "Please enter less than 100 characters",
    },
  });

  const handleSubmit = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/booking/${data._id}/edit/`,
        "PUT",
        {
          // TODO add time
          dateTime: form.values.date,
          pax: form.values.pax,
          request: form.values.request,
        }
      );
      close();
      navigate("/account/bookings");
      successToast({
        title: "Table Reserved!",
        message: "You will receive a confirmation email shortly",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    }
  };

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
      <li>Date: {dayjs(form.values.date).format("DD/MM/YYYY")}</li>
      {/* TODO */}
      <li>Time: {form.values.time}</li>
      <li>Table for: {form.values.pax}</li>
      <li>
        Special Request: {form.values.request ? form.values.request : "None"}
      </li>
    </ul>
  );

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Title order={2} ta="center">
            {/* TODO */}
            {/* Reserve a table at {data.restaurant.name} */}
            Edit a Table Reservation at Restaurant Name
          </Title>
          <Box maw={340} mx="auto" mt="xl">
            <form
              onSubmit={form.onSubmit(() => {
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
                  mt="md"
                  component={Link}
                  to="/account/bookings"
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit" mt="md">
                  Submit
                </Button>
              </Group>
            </form>

            {/* Modal */}
            <Modal
              modalContent={modalContent}
              opened={opened}
              toggle={toggle}
              close={close}
              handleSubmit={handleSubmit}
              title="Edit a Table Reservation"
            />
          </Box>
        </>
      )}
    </>
  );
}

export default EditBooking;
