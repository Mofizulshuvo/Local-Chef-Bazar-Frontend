import React from "react";
import { Link } from "react-router";

const LoginButton = () => {
  return (
    <Link to="/SignIn">
      <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl bg-[#FC8A06] text-white rounded-2xl">
        Sign In
      </button>
    </Link>
  );
};

export default LoginButton;
