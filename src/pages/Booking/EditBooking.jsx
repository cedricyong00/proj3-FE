import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Textarea,
  Title,
  rem,
} from "@mantine/core";
import { DateInput, TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconClock } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";
import { restaurants } from "../../assets/sampleData/restaurant";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useRef } from "react";
import dayjs from "dayjs";

function EditBooking() {
  const [opened, { toggle, close }] = useDisclosure(false);

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
      time: (value) =>
        value === undefined
          ? "Please enter a time"
          : value < new Date() && "Time must be in the future",
      request: (value) =>
        value?.length > 100 && "Please enter less than 100 characters",
    },
  });

  const handleSubmit = () => {
    close();
    notifications.show({
      title: "Table Reserved!",
      message: "You will receive a confirmation email shortly",
      autoClose: 5000,
    });
    console.log(form.values);
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
            // toggle();
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
              to={`/restaurant/${pathIdNum}`}
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
        <Modal opened={opened} onClose={close} title="Reserve a Table">
          <ul>
            <li>Date: {dayjs(form.values.date).format("DD/MM/YYYY")}</li>
            <li>Time: {form.values.time}</li>
            <li>Table for: {form.values.pax}</li>
            <li>
              Special Request:{" "}
              {form.values.request ? form.values.request : "None"}
            </li>
          </ul>
          <Group justify="center" mt="xl">
            <Button type="button" mt="md" variant="outline" onClick={toggle}>
              Cancel
            </Button>
            <Button type="submit" mt="md" onClick={handleSubmit}>
              Submit
            </Button>
          </Group>
        </Modal>
      </Box>
    </>
  );
}

export default EditBooking;
