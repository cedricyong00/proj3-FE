/* eslint-disable react/prop-types */
import {
  Table,
  ScrollArea,
  Text,
  Button,
  Anchor,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "../../components/Parts/Modal";
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useToast from "../../hooks/useToast";

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
  const [dataToCancel, setDataToCancel] = useState([]);
  const { sendRequest } = useFetch();
  const { successToast, errorToast } = useToast();
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getList();
    if (!user) {
      navigate("/signin");
      return;
    }
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

  const handleSubmit = async () => {
    try {
      await sendRequest(
        `${import.meta.env.VITE_API_URL}/booking/${dataToCancel._id}/`,
        "DELETE"
      );
      setData((prev) =>
        prev.filter((booking) => booking._id !== dataToCancel._id)
      );
      close();
      successToast({
        title: "Table canceled!",
        message: "You will receive a confirmation email shortly",
      });
    } catch (err) {
      console.log(err);
      close();
      errorToast();
    }
  };

  const rows = data.map((row) => (
    <Table.Tr key={row._id}>
      <Table.Td>
        <Anchor component={Link} to={`/restaurant/${row.restaurant._id}`}>
          {row.restaurant.name ? row.restaurant.name : "Restaurant Name"}
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
      <Title order={2} ta="center" mb="lg">
        Your Bookings
      </Title>
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
