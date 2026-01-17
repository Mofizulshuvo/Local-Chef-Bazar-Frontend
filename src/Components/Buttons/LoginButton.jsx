import React from "react";
import { Link } from "react-router";

const LoginButton = () => {
  return (
    <Link to="/SignIn">
      <button className="btn-outline">
        Sign In
      </button>
    </Link>
  );
};

export default LoginButton;
