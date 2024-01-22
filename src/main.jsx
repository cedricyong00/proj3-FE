import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import SignInPage from "./pages/User/Signin";
import SignUpPage from "./pages/User/Signup";
import Account from "./pages/User/Account";
import EditAccount from "./pages/User/EditAccount";
import BookingList from "./pages/User/BookingList";
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import RestaurantInfo from "./pages/Owner/RestaurantInfo";
import NewRestaurant from "./pages/Owner/NewRestaurant";
import EditRestaurant from "./pages/Owner/EditRestaurant";
import NewBooking from "./pages/Restaurant/NewBooking";
import NotFound from "./pages/NotFound";
import EditBooking from "./pages/Booking/EditBooking";
import { Layout } from "./components/Layout/Layout";
import RestaurantList from "./pages/Restaurant/RestaurantList";
import RestaurantDetail from "./pages/Restaurant/RestaurantDetail";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

// https://mantine.dev/theming/default-theme/
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  cursorType: "pointer",
  primaryColor: "yellow",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <MantineProvider theme={theme} defaultColorScheme="light">
        <Notifications />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Root */}
            <Route index element={<RestaurantList />} />

            {/* Auth */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {/* Account */}
            <Route path="/account" element={<Account />} />
            <Route path="/account/edit" element={<EditAccount />} />
            <Route path="/account/bookings" element={<BookingList />} />

            {/* Restaurant */}
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route
              path="/restaurant/:id/new-booking"
              element={<NewBooking />}
            />

            {/* Booking */}
            <Route path="/booking/:id/edit" element={<EditBooking />} />

            {/* Owner */}
            <Route path="/owner/bookings" element={<OwnerDashboard />} />
            <Route path="/owner/restaurant" element={<RestaurantInfo />} />
            <Route path="/owner/restaurant/new" element={<NewRestaurant />} />
            <Route path="/owner/restaurant/edit" element={<EditRestaurant />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MantineProvider>
    </Router>
  </React.StrictMode>
);
