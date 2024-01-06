import { Route, Routes } from "react-router-dom";

// User Model
import SignInPage from "./User_Main_Page/Signin";
import SignUpPage from "./User_Main_Page/Signup";
import Account from "./User_Main_Page/Account";
import EditAccount from "./User_Main_Page/EditAccount";
import BookingList from "./User_Main_Page/BookingList";

// Restaurant Model
import OwnerDashboard from "./Owner/OwnerDashboard";
import RestaurantInfo from "./Owner/RestaurantInfo";
import NewRestaurant from "./Owner/NewRestaurant";
import UpdateRestaurant from "./Owner/UpdateRestaurant";

function App() {
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

    </Routes>
  );
}

export default App;
