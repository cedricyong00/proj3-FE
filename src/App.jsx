import { Route, Routes } from "react-router-dom";
import SignInPage from "./Sign-In page/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
