import React from "react";
import { Link } from "react-router";

const SignUpButton = () => {
  return (
    <Link to="/SignUp">
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#FC8A06]  text-white rounded-2xl">
        Sign Up
      </button>
    </Link>
  );
};

export default SignUpButton;
