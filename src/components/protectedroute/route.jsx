import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ children, role }) => {
  const { token, currentUser } = useSelector((state) => state.users);

  if (!token) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please login first to view this page.
      </p>
    );
  }

  if (role && currentUser?.Role !== role) {
    return (
      <p className="text-center text-red-500 mt-10">
        You are not authorized to view this page.
      </p>
    );
  }

  return children;
};
