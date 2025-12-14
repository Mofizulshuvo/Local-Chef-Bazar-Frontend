
import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";

const SignInForm = () => {
  const {
    SignUpwithEmailAndPassword,
    SignInwithEmailAndPassword,
    SignInwithGoogle,
    user,
    loading,
    setLoading,
    LogOut,
    userRole
  } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    return await SignInwithGoogle();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    const { email, password } = data;
    SignInwithEmailAndPassword(email, password);
    console.log(user);
    console.log(userRole);
  };

  return (
    <div className="flex justify-center items-center gap-3 bg-white px-4 py-4 ">
      <div>
        <img src="" alt="" />
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="font-semibold ml-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              placeholder="example@gmail.com"
              {...register("email", { required: "Email is Required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="font-semibold ml-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              placeholder=""
              {...register("password", { required: "Password is Required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mx-auto w-full">
            <button
              type="submit"
              className="bg-red-700 text-center mx-auto w-full py-1 text-white rounded-2xl font-semibold text-xl "
            >
              SIgn In{" "}
            </button>
          </div>
        </form>
        <div>
          <h1 className="text-md mt-2 text-center">
            No account?{" "}
            <Link
              to="/SignUp"
              className="underline text-red-800 font-semibold "
            >
              Sign Up
            </Link>
          </h1>
          <div className="mx-auto w-full">
            <button
              onClick={() => handleGoogleSignIn()}
              className="flex justify-center gap-3 items-center border border-gray-300 mt-3 text-center mx-auto w-full py-1  rounded-2xl font-semibold text-xl "
            >
              {" "}
              <FcGoogle /> <h1>Continue with Google</h1>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
