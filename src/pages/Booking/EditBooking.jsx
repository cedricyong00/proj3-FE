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
import {
  Link,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import Modal from "../../components/Parts/Modal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useToast from "../../hooks/useToast";
import customParseFormat from "dayjs/plugin/customParseFormat";
import useCheckBooking from "../../hooks/useCheckBooking";

function EditBooking() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const { sendRequest } = useFetch();
  const ref = useRef(null);
  const { successToast, errorToast } = useToast();
  const [data, setData] = useState([]);
  dayjs.extend(customParseFormat);
  const { isInputDayClosed, formatTime } = useCheckBooking();
  const [isDayClosed, setIsDayClosed] = useState(false);
  const [operationHours, setOperationHours] = useState({});

  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getSingleBooking();
    if (!user) {
      navigate("/signin");
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSingleBooking = async () => {
    const resData = await sendRequest(
      `${import.meta.env.VITE_API_URL}/booking/${pathId}`,
      "GET"
    );
    setLoading(false);
    setData(resData);
    form.setValues({
      pax: resData.pax,
      date: new Date(resData.dateTime),
      time: dayjs(resData.dateTime).utc().local().format("HH:mm"),
      request: resData.request,
    });
  };

  const form = useForm({
    validate: {
      pax: (value) =>
        value === undefined
          ? "Please enter a number"
          : value < 1
          ? "Minimum 1 pax"
          : value > data.restaurant.maxPax
          ? "Maximum " + data.restaurant.maxPax + " pax"
          : value > 10 &&
            "For large group, please contact the restaurant directly",
      date: (value) =>
        value === undefined
          ? "Please enter a date"
          : value < new Date()
          ? "Date must be in the future"
          : value > new Date().setDate(new Date().getDate() + 14)
          ? "Date must be within 14 days"
          : isDayClosed && "Restaurant is closed on this day",
      time: (value) =>
        value === ""
          ? "Please enter a time"
          : value < operationHours.timeOpen || value > operationHours.timeClose
          ? "Please enter a time within opening hours"
          : null,
      request: (value) =>
        value?.length > 100 && "Please enter less than 100 characters",
    },
  });

  useEffect(() => {
    if (data?.restaurant?.timeOpen && data?.restaurant?.timeClose) {
      setOperationHours({
        timeOpen: formatTime(data.restaurant.timeOpen),
        timeClose: formatTime(data.restaurant.timeClose),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (data?.restaurant?.daysClose) {
      setIsDayClosed(
        isInputDayClosed(data?.restaurant?.daysClose, form.values.date)
      );
    }
  }, [data?.restaurant?.daysClose, form.values.date, isInputDayClosed]);

  const handleSubmit = async () => {
    const timeToAdd = form.values.time;
    const newDateTime = dayjs(form.values.date)
      .hour(parseInt(timeToAdd.split(":")[0]))
      .minute(parseInt(timeToAdd.split(":")[1]));
    const formattedDateTime = newDateTime.format();

    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/booking/${data._id}`,
        "POST",
        {
          dateTime: formattedDateTime,
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
      <li>Time: {dayjs(form.values.time, "HH:mm").format("hh:mm A")}</li>
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
            Update a reservation at {data?.restaurant?.name}
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
