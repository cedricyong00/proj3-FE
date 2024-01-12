import {
  Table,
  ScrollArea,
  Group,
  Text,
  Button,
  Modal,
  Anchor,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { bookings } from "../../assets/sampleData/booking";

function Th({ children }) {
  return (
    <Table.Th>
      <Text fw={700} fz="sm">
        {children}
      </Text>
    </Table.Th>
  );
}

function BookingList() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const data = bookings;

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
      <Table.Td>
        <Anchor component={Link} to="/restaurant/1">
          {row.restaurant}
        </Anchor>
      </Table.Td>
      <Table.Td>{row.date}</Table.Td>
      <Table.Td>{row.time}</Table.Td>
      <Table.Td>{row.pax}</Table.Td>
      <Table.Td>{row.request}</Table.Td>

      <Table.Td w="85px">
        <Button variant="outline" onClick={toggle}>
          Cancel
        </Button>
      </Table.Td>
      <Table.Td w="85px">
        <Button component={Link} to="/booking/1/edit">
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <ScrollArea>
        <Table verticalSpacing="xs" miw={700}>
          <Table.Tbody>
            <Table.Tr>
              <Th>Restaurant</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Pax</Th>
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

export default BookingList;

Th.propTypes = {
  children: PropTypes.node,
};
