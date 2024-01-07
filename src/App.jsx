/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";

// User Model
import SignInPage from "./User/Signin";
import SignUpPage from "./User/Signup";
import Account from "./User/Account";
import EditAccount from "./User/EditAccount";
import BookingList from "./User/BookingList";

// Owner Model
import OwnerDashboard from "./Owner/OwnerDashboard";
import RestaurantInfo from "./Owner/RestaurantInfo";
import NewRestaurant from "./Owner/NewRestaurant";
import UpdateRestaurant from "./Owner/UpdateRestaurant";

// Restaurant Model
import NewBooking from "./Restaurant/NewBooking";
import UpdateBooking from "./Restaurant/UpdateBooking";
import BookingDetails from "./Restaurant/BookingDetails";

import { useState } from "react";

function App() {

  let [database, setdatabase] = useState([]);

  // Dummy Data
  setdatabase = [
    { id: 123, message: "Hello"}
  ];

  return (
    <Routes>
      {/* User Model */}
      <Route path="/" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/account" element={<Account />} />
      <Route path="/account/edit" element={<EditAccount />} />
      <Route path="/account/bookings" element={<BookingList />} />

      {/* Owner Model */}
      <Route path="/owner/bookings" element={<OwnerDashboard />} />
      <Route path="/owner/restaurant" element={<RestaurantInfo />} />
      <Route path="/owner/restaurant/new" element={<NewRestaurant />} />
      <Route path="/owner/restaurant/edit" element={<UpdateRestaurant />} />

      {/* Restaurant Model */}
      <Route path="/restaurant/id/new-booking" element={<NewBooking />} />
      <Route path="/booking/id/edit" element={<UpdateBooking />} />
      <Route path="/booking/id/details" element={<BookingDetails />} />
    </Routes>
  );
}

export default App;
