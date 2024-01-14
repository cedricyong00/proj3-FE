import {
  Table,
  ScrollArea,
  Group,
  Text,
  Button,
  ActionIcon,
  rem,
  Anchor,
  useMantineTheme,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useEffect, useRef, useState } from "react";
import { IconClock } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

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
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { sendRequest } = useFetch();

  const theme = useMantineTheme();
  const isPc = useMediaQuery(`(min-width: ${theme.breakpoints.xs})`);

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getList = async () => {
    const resData = await sendRequest(
      `${import.meta.env.VITE_API_URL}/booking`,
      "GET"
    );
    setData(resData);
    setLoading(false);
  };

  const rows = data.map((row) => (
    <Table.Tr key={row._id}>
      {/* TODO */}
      <Table.Td>Natsumi Hori</Table.Td>
      <Table.Td>{dayjs(row.dateTime).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>{dayjs(row.dateTime).format("hh:mmA")}</Table.Td>
      <Table.Td>{row.pax}</Table.Td>
      <Table.Td>{row.request ? row.request : "None"}</Table.Td>
      {/* TODO */}
      <Table.Td>email@email.cpm</Table.Td>
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
      {loading ? (
        <LoadingSpinner />
      ) : rows.length === 0 ? (
        <Text fw={500} ta="center">
          You have no bookings yet. <br />
          <Anchor component={Link} to="/">
            Book a table now!
          </Anchor>
        </Text>
      ) : (
        <>
          {/* TODO: Apply filter logic */}
          <Group align="flex-end">
            <DatePickerInput
              label="Date From"
              placeholder="Pick date"
              value={dateFrom}
              onChange={setDateFrom}
              miw={!isPc ? "calc(50% - 12px)" : "150px"}
            />
            <DatePickerInput
              label="Date To"
              placeholder="Pick date"
              value={dateTo}
              onChange={setDateTo}
              miw={!isPc ? "calc(50% - 12px)" : "150px"}
            />
            <TimeInput
              label="Time From"
              ref={refFrom}
              rightSection={pickerControlFrom}
              miw={!isPc ? "calc(50% - 12px)" : "150px"}
            />
            <TimeInput
              label="Time To"
              ref={refTo}
              rightSection={pickerControlTo}
              miw={!isPc ? "calc(50% - 12px)" : "150px"}
            />
            <Button>Filter</Button>
          </Group>

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
  );
}

export default OwnerDashboard;

Th.propTypes = {
  children: PropTypes.node,
};
