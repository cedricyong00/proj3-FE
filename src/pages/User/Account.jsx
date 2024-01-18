/* eslint-disable no-unused-vars */
import { Text,Button} from "@mantine/core";
import classes from "../User/Account.module.css";
import "../User/Account.module.css";
import { Link } from "react-router-dom";

function Account() {
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
        <div className={classes.root}>{stats}</div>
        <div className={classes.Split}>
            <Button className={classes.Buttons} component={Link} to="/account/edit">Edit Account Info</Button>
            <Button className={classes.Buttons} component={Link} to="/account/bookings">See Bookings</Button>
        </div>
    </>
  )
}

export default Account;
