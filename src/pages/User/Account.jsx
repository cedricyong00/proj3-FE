/* eslint-disable no-unused-vars */
import { Text, Button } from "@mantine/core";
import classes from "../User/Account.module.css";
import "../User/Account.module.css";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../components/Parts/LoadingSpinner";

function Account() {
  const navigate = useNavigate();
  const { user } = useOutletContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const data = [
    {
      title: "Account Dashboard",
      stats: "Welcome " + user.name,
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
      // description: dummyData[0].numberOfBookings,
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
