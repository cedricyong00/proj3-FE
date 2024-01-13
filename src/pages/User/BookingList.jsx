import {
  Table,
  ScrollArea,
  Text,
  Button,
  Anchor,
  Loader,
  Container,
} from "@mantine/core";
import PropTypes from "prop-types";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "../../components/Parts/Modal";

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataToCancel, setDataToCancel] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/booking`);
    const data = await res.json();

    setData(data);
    setLoading(false);
    return data;
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/booking/${dataToCancel._id}/delete`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      setData((prev) =>
        prev.filter((booking) => booking._id !== dataToCancel._id)
      );

      close();
      notifications.show({
        title: "Table canceled!",
        message: "You will receive a confirmation email shortly",
        autoClose: 5000,
      });
    } catch (err) {
      console.log(err);
      close();
      notifications.show({
        title: "Something went wrong!",
        message: "Please try later.",
        color: "red",
        autoClose: 5000,
      });
    }
  };

  const rows = data.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>
        <Anchor component={Link} to="/restaurant/1">
          {/* TODO */}
          Wildfire Steakhouse
        </Anchor>
      </Table.Td>

      <Table.Td>{dayjs(row.dateTime).format("DD/MM/YYYY")}</Table.Td>
      <Table.Td>{dayjs(row.dateTime).format("hh:mmA")}</Table.Td>
      <Table.Td>{row.pax}</Table.Td>
      <Table.Td>{row.request}</Table.Td>

      <Table.Td w="85px">
        <Button
          variant="outline"
          onClick={() => {
            toggle();
            setDataToCancel(row);
          }}
        >
          Cancel
        </Button>
      </Table.Td>
      <Table.Td w="85px">
        <Button component={Link} to={`/booking/${row._id}/edit`}>
          Edit
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  const modalContent = (
    <ul>
      <li>Date: {dayjs(dataToCancel.dateTime).format("DD/MM/YYYY")}</li>
      <li>Time: {dayjs(dataToCancel.dateTime).format("hh:mmA")}</li>
      <li>Table for: {dataToCancel.pax}</li>
      <li>
        Special Request:
        {dataToCancel.request ? dataToCancel.request : "None"}
      </li>
    </ul>
  );

  return (
    <>
      {loading ? (
        <Container ta="center" mt="xl">
          <Loader />
        </Container>
      ) : rows.length === 0 ? (
        <Text fw={500} ta="center">
          You have no bookings yet. <br />
          <Anchor component={Link} to="/">
            Book a table now!
          </Anchor>
        </Text>
      ) : (
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
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </ScrollArea>

          {/* Modal */}
          <Modal
            opened={opened}
            title="Cancel a table reservation"
            modalContent={modalContent}
            toggle={toggle}
            close={close}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </>
  );
}

export default BookingList;

Th.propTypes = {
  children: PropTypes.node,
};
