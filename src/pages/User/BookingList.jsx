import { Table, ScrollArea, Group, Text, Button } from "@mantine/core";
import PropTypes from "prop-types";
import classes from "./BookingList.module.css";

function Th({ children }) {
  return (
    <Table.Th className={classes.th}>
      <Group justify="space-between">
        <Text fw={500} fz="sm">
          {children}
        </Text>
      </Group>
    </Table.Th>
  );
}

const data = [
  {
    id: 1,
    date: "04/01/2023",
    time: "18:00",
    restaurant: "Ikea",
    request: "I want to sit near the window",
  },
  {
    id: 2,
    date: "04/01/2023",
    time: "18:00",
    restaurant: "Ikea",
    request: "I want to sit near the window",
  },
  {
    id: 3,
    date: "04/01/2023",
    time: "18:00",
    restaurant: "Ikea",
    request: "I want to sit near the window",
  },
];

function BookingList() {
  const rows = data.map((row) => (
    <Table.Tr key={row.id}>
      <Table.Td>{row.restaurant}</Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.time}</Table.Td>
      <Table.Td>{row.request}</Table.Td>

      <Table.Td>
        <Button variant="outline">Cancel</Button>
      </Table.Td>
      <Table.Td>
        <Button>Edit</Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th>Restaurant</Th>
            <Th>Date</Th>
            <Th>Time</Th>
            <Th>Request</Th>
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
  );
}

export default BookingList;

Th.propTypes = {
  children: PropTypes.node,
};
