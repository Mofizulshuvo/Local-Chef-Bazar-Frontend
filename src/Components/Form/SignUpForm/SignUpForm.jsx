import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.config";

const SignUpForm = () => {
  const { SignUpwithEmailAndPassword, SignInwithGoogle } =
    useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await SignInwithGoogle();

      
      await axios.post("http://localhost:3000/users", {
        uid: googleUser.uid,
        name: googleUser.displayName || "",
        email: googleUser.email,
        profileImage: googleUser.photoURL || "",
        address: " ",
        role: "user",
        status: "active",
        chefId: " ",
        
      });

      console.log("Google user added to database:", googleUser.uid);
    } catch (error) {
      console.error("Google SignIn error:", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, address, name } = data;
    try {
      const userData = await SignUpwithEmailAndPassword(email, password);
      const User = userData.user;

    
      await axios.post("http://localhost:3000/users", {
        uid: User.uid,
        name:name,
        email:email,
        profileImage: "",
        address:address,
        role: "user",
        status: "active",
        chefId: " ",
      });

      console.log("User created successfully:", User.uid);
      signOut(auth);
    } catch (error) {
      console.error("SignUp error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 bg-white px-4 py-4 ">
      <div>
        <img src="" alt="" />
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="font-semibold ml-1">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              placeholder="Your Full Name"
              {...register("name", { required: "Name is Required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="font-semibold ml-1">
              Address
            </label>
            <input
              type="text"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              placeholder="Your Address"
              {...register("address")}
            />
          </div>

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
              {...register("password", { required: "Password is Required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="mx-auto w-full">
            <button
              type="submit"
              className="bg-red-700 text-center mx-auto w-full py-1 text-white rounded-2xl font-semibold text-xl"
            >
              Create Account
            </button>
          </div>
        </form>

        <div>
          <h1 className="text-md mt-2 text-center">
            Already have an account?{" "}
            <Link to="/SignIn" className="underline text-red-800 font-semibold">
              Sign In
            </Link>
          </h1>

          <div className="mx-auto w-full">
            <button
              onClick={handleGoogleSignIn}
              className="flex justify-center gap-3 items-center border border-gray-300 mt-3 text-center mx-auto w-full py-1 rounded-2xl font-semibold text-xl"
            >
              <FcGoogle />
              <h1>Continue with Google</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
