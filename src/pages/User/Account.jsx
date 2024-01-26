/* eslint-disable no-unused-vars */
import { Text, Button } from "@mantine/core";
import classes from "../User/Account.module.css";
import "../User/Account.module.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";
import useFetch from "../../hooks/useFetch";

function Account() {
  const navigate = useNavigate();
  const { sendRequest } = useFetch();
  const [data, setData] = useState([]);
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getList()
    if (!user) {
      navigate("/signin");
      return;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Returns user account type
  function checkAccountType() {
    if (user.isOwner === true) {
      return "Admin";
    } else if (user.isOwner === false) {
      return "User";
    }
  }

  //Retrieve number of booking data
  const getList = async () => {
    const resData = await sendRequest(
      `${import.meta.env.VITE_API_URL}/booking`,
      "GET"
    );
    setData(resData);
  };

  //Number of booking
  const numberOfBookings = data.length

  const accountData = [
    {
      title: "Account Dashboard",
      stats: "Welcome " + user.name,
      description: "",
    },
    {
      title: "Email Address",
      stats: "Account Type: " + checkAccountType(),
      description: user.email,
    },
    {
      title: "Number Of Bookings",
      stats: "Booking",
      description: numberOfBookings,
    },
  ];

  const stats = accountData.map((stat) => (
    <div key={stat.title} className={classes.stat}>
      <Text className={classes.count}>{stat.stats}</Text>
      <Text className={classes.title}>{stat.title}</Text>
      <Text className={classes.description}>{stat.description}</Text>
    </div>
  ));

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className={classes.root}>{stats}</div>
          <div className={classes.Split}>
            <Button
              className={classes.Buttons}
              component={Link}
              to="/account/edit"
            >
              Edit Account Info
            </Button>
            <Button
              className={classes.Buttons}
              component={Link}
              to="/account/bookings"
            >
              See Bookings
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default Account;
