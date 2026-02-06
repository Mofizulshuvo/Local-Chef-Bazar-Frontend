import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const PrivateRouter = ({ children, allowedRoles }) => {
  const { user, loading, userRole } = useContext(AuthContext);

  // Wait until auth state is fully loaded
  if (loading) {
    return (
      <div className="mt-20 text-center text-xl font-semibold h-full">
        <Loader className="mx-auto my-auto" />
      </div>
    );
  }

  // Not logged in -> redirect
  if (!user) {
    return <Navigate to="/SignIn" replace />;
  }

  // Role not allowed -> redirect
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/SignIn" replace />;
  }

  // Logged in and role allowed -> render children
  return children;
};

export default PrivateRouter;
