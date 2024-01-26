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
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [ accountInfo, setAccountInfo ] = useState({});
  const { sendRequest } = useFetch();

  useEffect(() => {
    //Get user Data
    const fetchData = async () => {
      try {
        const userData = await sendRequest(`${import.meta.env.VITE_API_URL}/user/data`,"GET");
        const jsonData = await userData.json();
        console.log(jsonData);
    // if user not logged in
    if (!user) {
      navigate("/signin");
      return;
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  } catch (error) {
    console.error("Error fetching user data", error);
  }
};
  fetchData();
}, [user, navigate, sendRequest]);

  const dummyData = [
    {
      id: 123,
      email: "test123@gmail.com",
      isOwner: true,
      password: "test123",
      name: "Cedric Yong",
      numberOfBookings: 14,
    },
  ];

  //Returns user account type
  function checkAccountType(id) {
    id = 0;
    if (dummyData[id].isOwner === true) {
      return "Admin";
    } else if (dummyData[id].isOwner === false) {
      return "User";
    }
  }

  const data = [
    {
      title: "Account Dashboard",
      stats: "Welcome " + dummyData[0].name,
      description: "",
    },
    {
      title: "Restaurant Info",
      stats: "Account Type: " + checkAccountType(),
      description: "Burger King, Cecil Street 13 Rd, S909090",
    },
    {
      title: "Number Of Bookings",
      stats: "Booking",
      description: dummyData[0].numberOfBookings,
    },
  ];

  const stats = data.map((stat) => (
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
