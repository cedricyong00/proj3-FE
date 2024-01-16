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
import useToast from "../../hooks/useToast";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import customParseFormat from "dayjs/plugin/customParseFormat";

function NewBooking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { sendRequest } = useFetch();
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const { successToast, errorToast } = useToast();
  const ref = useRef(null);
  dayjs.extend(customParseFormat);

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

  const form = useForm({
    initialValues: {
      time: "",
      // TODO: get next date of today as default
      date: new Date(),
    },
    validate: {
      pax: (value) =>
        value === undefined
          ? "Please enter a number"
          : value < 1
          ? "Minimum 1 pax"
          : value > data.maxPax
          ? "Maximum " + data.maxPax + " pax"
          : value > 10 &&
            "For large group, please contact the restaurant directly",
      date: (value) =>
        value === undefined
          ? "Please enter a date"
          : value < new Date()
          ? "Date must be in the future"
          : value > new Date().setDate(new Date().getDate() + 14) &&
            "Date must be within 14 days",
      time: (value) => value === "" && "Please enter a time",
      request: (value) =>
        value?.length > 100 && "Please enter less than 100 characters",
    },
  });

  const handleSubmit = async () => {
    const timeToAdd = form.values.time;
    const newDateTime = dayjs(form.values.date)
      .hour(parseInt(timeToAdd.split(":")[0]))
      .minute(parseInt(timeToAdd.split(":")[1]));
    const formattedDateTime = newDateTime.format();

    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/booking/createe`,
        "POST",
        {
          dateTime: formattedDateTime,
          pax: form.values.pax,
          request: form.values.request,
          restaurant: data._id,
        }
      );
      navigate("/account/bookings");
      close();
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
            Reserve a table at {data.name}
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
                  component={Link}
                  to={`/restaurant/${pathId}`}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </Group>
            </form>

            {/* Modal */}
            <Modal
              opened={opened}
              title="Reserve a Table"
              modalContent={modalContent}
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

export default NewBooking;
