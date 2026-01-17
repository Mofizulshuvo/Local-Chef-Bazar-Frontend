import React from "react";
import { Link } from "react-router";

const SignUpButton = () => {
  return (
    <Link to="/SignUp">
      <button className="btn-primary">
        Sign Up
      </button>
    </Link>
  );
};

export default SignUpButton;
