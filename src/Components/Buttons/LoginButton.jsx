import React from "react";
import { Link } from "react-router";

const LoginButton = () => {
  return (
    <Link to="/SignIn">
      <button className="px-4 py-2  bg-[#C10007] text-lg text-white rounded-2xl">
        Sign In
      </button>
    </Link>
  );
};

export default LoginButton;
