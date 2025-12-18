import React from "react";
import { Link } from "react-router";

const SignUpButton = () => {
  return (
    <Link to="/SignUp">
      <button className=" px-4 py-2  bg-[#C10007] text-lg text-white rounded-2xl">
        Sign Up
      </button>
    </Link>
  );
};

export default SignUpButton;
