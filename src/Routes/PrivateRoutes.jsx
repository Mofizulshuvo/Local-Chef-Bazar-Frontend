import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router";

const PrivateRouter = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Optional: show loader while auth status is loading
  // if (loading) {
  //   return (
  //     <div className="mt-20">
  //       <Loader />
  //     </div>
  //   );
  // }

  // If user is not logged in
  if (!user) {
    return <Navigate to="/SignIn" replace />;
  }

  // If user role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-allowed" replace />;
  }

  // User is authenticated and role is allowed
  return children;
};

export default PrivateRouter;
