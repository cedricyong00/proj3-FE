/* eslint-disable react/prop-types */
import {
  Table,
  ScrollArea,
  Group,
  Text,
  Button,
  ActionIcon,
  rem,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import { useForm } from "@mantine/form";
import { useNavigate, useOutletContext } from "react-router-dom";

function Th({ children }) {
  return (
    <Table.Th>
      <Text fw={700} fz="sm">
        {children}
      </Text>
    </Table.Th>
  );
}

function OwnerDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sendRequest } = useFetch();
  const { user } = useOutletContext();
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);

  const form = useForm({
    initialValues: {
      date: null,
      timeFrom: "",
      timeTo: "",
    },
    initialErrors: { timeFrom: null, timeTo: null },
    validate: {
      date: (value) => !value && "Please enter a date",
      timeFrom: (value) =>
        value === ""
          ? null
          : value > form.values.timeTo
          ? "Invalid time range"
          : value && !form.values.timeTo
          ? "Invalid time range"
          : !value && form.values.timeTo && "Invalid time range",

      timeTo: (value) =>
        value === ""
          ? null
          : value < form.values.timeFrom
          ? "Invalid time range"
          : value && !form.values.timeFrom
          ? "Invalid time range"
          : !value && form.values.timeFrom && "Invalid time range",
    },
  });

  useEffect(() => {
    getInitialList();
    if (!user || !user.isOwner) {
      navigate("/signin");
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getInitialList = async () => {
    const resData = await sendRequest(
      `${import.meta.env.VITE_API_URL}/booking/restaurant`,
      "GET"
    );
    setData(resData);
    setLoading(false);
  };

  const handleClearFilter = () => {
    form.reset();
    setLoading(true);
    getInitialList();
  };

  const filterList = async () => {
    setLoading(true);
    let startDateTime;
    let endDateTime;

    if (!form.values.timeFrom && !form.values.timeTo) {
      startDateTime = dayjs(form.values.date).startOf("day").format();
      endDateTime = dayjs(form.values.date).endOf("day").format();
    } else {
      startDateTime = dayjs(form.values.date)
        .hour(parseInt(form.values.timeFrom.split(":")[0]))
        .minute(parseInt(form.values.timeFrom.split(":")[1]))
        .second(0)
        .format();
      endDateTime = dayjs(form.values.date)
        .hour(parseInt(form.values.timeTo.split(":")[0]))
        .minute(parseInt(form.values.timeTo.split(":")[1]))
        .second(59)
        .format();
    }

    const encodedStartDateTime = encodeURIComponent(startDateTime);
    const encodedEndDateTime = encodeURIComponent(endDateTime);

    const resData = await sendRequest(
      `${
        import.meta.env.VITE_API_URL
      }/booking/restaurant?startDateTime=${encodedStartDateTime}&endDateTime=${encodedEndDateTime}`,
      "GET"
    );
    setData(resData);
    setLoading(false);
  };

  const rows = data.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>{row.user.name ? row.user.name : ""}</Table.Td>
      <Table.Td>{dayjs(row.dateTime).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>{dayjs(row.dateTime).format("hh:mmA")}</Table.Td>
      <Table.Td>{row.pax}</Table.Td>
      <Table.Td>{row.request && row.request}</Table.Td>
      <Table.Td>{row.user.email ? row.user.email : ""}</Table.Td>
    </Table.Tr>
  ));

  const refFrom = useRef(null);
  const refTo = useRef(null);

  const pickerControlFrom = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refFrom.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );
  const pickerControlTo = (
    <ActionIcon
      variant="subtle"
      color="gray"
      onClick={() => refTo.current?.showPicker()}
    >
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return (
    <>
      <Title order={2} ta="center" mb="lg">
        Your Guests
      </Title>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <form
            onSubmit={form.onSubmit(() => {
              filterList();
            })}
          >
            <Group align="flex-start" mb="xl">
              <DatePickerInput
                label="Date"
                placeholder="Pick date"
                miw={!isPc ? "calc(50% - 12px)" : "150px"}
                {...form.getInputProps("date")}
              />
              <TimeInput
                label="Time From"
                ref={refFrom}
                rightSection={pickerControlFrom}
                miw={!isPc ? "calc(50% - 12px)" : "150px"}
                {...form.getInputProps("timeFrom")}
              />
              <TimeInput
                label="Time To"
                ref={refTo}
                rightSection={pickerControlTo}
                miw={!isPc ? "calc(50% - 12px)" : "150px"}
                {...form.getInputProps("timeTo")}
              />
              <Button type="submit" mt="25px">
                Filter
              </Button>
              <Button
                mt="25px"
                variant="outline"
                onClick={handleClearFilter}
                disabled={!form.isDirty()}
              >
                Clear
              </Button>
            </Group>
          </form>
          {loading ? (
            <LoadingSpinner />
          ) : rows.length === 0 ? (
            <Text fw={500} ta="center">
              You have no bookings yet. <br />
            </Text>
          ) : (
            <>
              <ScrollArea mt="xl">
                <Table verticalSpacing="md" miw={700}>
                  <Table.Tbody>
                    <Table.Tr>
                      <Th>Name</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                      <Th>Pax</Th>
                      <Th>Request</Th>
                      <Th>Email</Th>
                    </Table.Tr>
                  </Table.Tbody>
                  <Table.Tbody>
                    {rows.length > 0 ? (
                      rows
                    ) : (
                      <Text fw={500} ta="center">
                        Nothing found
                      </Text>
                    )}
                  </Table.Tbody>
                </Table>
              </ScrollArea>
            </>
          )}
        </>
      )}
    </>
  );
}

export default OwnerDashboard;
