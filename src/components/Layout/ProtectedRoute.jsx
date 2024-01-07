import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

export const ProtectedRoute: FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const { user} = useContext(UserContext);

  return user ? (
    <>
      <div>ProtectedRoute</div>
      {children}
    </>
  ) : (
    <Navigate to="/signin" />
  );
};
