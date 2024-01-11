import {
  Table,
  ScrollArea,
  Group,
  Text,
  Button,
  Modal,
  ActionIcon,
  rem,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { bookings } from "../../assets/sampleData/booking";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import { useRef, useState } from "react";
import { IconClock } from "@tabler/icons-react";

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
  const [opened, { toggle, close }] = useDisclosure(false);
  const data = bookings;
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());

  const handleSubmit = () => {
    close();
    notifications.show({
      title: "Table canceled!",
      message: "You will receive a confirmation email shortly",
      autoClose: 5000,
    });
  };

  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.name}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.time}</Table.Td>
      <Table.Td>{row.pax}</Table.Td>
      <Table.Td>{row.request}</Table.Td>
      <Table.Td>{row.email}</Table.Td>
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
      <Group align="flex-end">
        <DatePickerInput
          label="Date From"
          placeholder="Pick date"
          value={dateFrom}
          onChange={setDateFrom}
          miw="150px"
        />
        <DatePickerInput
          label="Date To"
          placeholder="Pick date"
          value={dateTo}
          onChange={setDateTo}
          miw="150px"
        />
        <TimeInput
          label="Time From"
          ref={refFrom}
          rightSection={pickerControlFrom}
          miw="150px"
        />
        <TimeInput
          label="Time To"
          ref={refTo}
          rightSection={pickerControlTo}
          miw="150px"
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
              <Table.Tr>
                <Table.Td colSpan={Object.keys(data[0]).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>

      {/* Modal */}
      <Modal opened={opened} onClose={close} title="Cancel a table reservation">
        <ul>
          <li>Date: 04/01/2024</li>
          <li>Time: 18:00</li>
          <li>Table for: 3</li>
          <li>Special Request: None</li>
        </ul>

        <Text mt="md">Are you sure you want to proceed?</Text>
        <Group justify="center" mt="xl">
          <Button type="button" variant="outline" onClick={toggle}>
            Back
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Proceed
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default OwnerDashboard;

Th.propTypes = {
  children: PropTypes.node,
};
