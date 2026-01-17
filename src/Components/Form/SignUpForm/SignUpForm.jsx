import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../../Firebase/Firebase.config";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const { SignUpwithEmailAndPassword, SignInwithGoogle } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const handleGoogleSignIn = async () => {
    try {
      const googleUser = await SignInwithGoogle();

      await axios.post("https://local-chef-bazar-backend-1.onrender.com/users", {
        uid: googleUser.uid,
        name: googleUser.displayName,
        email: googleUser.email,
        profileImage: googleUser.photoURL,
        address: " ",
        role: "user",
        status: "active",
       
      });

      console.log("Google user added to database:", googleUser.uid);
      toast.success("Signed in with Google!");
    } catch (error) {
      console.error("Google SignIn error:", error);
      toast.error("Google Sign-In failed");
    }
  };

  const onSubmit = async (data) => {
    try {
      const { name, email, password, address, profileImage } = data;

   
      const userData = await SignUpwithEmailAndPassword(email, password);
      const User = userData.user;

      
      let imageUrl = "";
      if (profileImage && profileImage[0]) {
        const formData = new FormData();
        formData.append("image", profileImage[0]);

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
          formData
        );

        imageUrl = imgbbRes.data.data.display_url;
      }

     
      await axios.post("https://local-chef-bazar-backend-1.onrender.com/users", {
        uid: User.uid,
        name:name,
        email:email,
        profileImage: imageUrl,
        address: address,
        role: "user",
        status: "active",
        chefId: " ",
      });

      toast.success("Account created! Please sign in.");
      reset();
      signOut(auth);
    } catch (error) {
      console.error("SignUp error:", error);
      toast.error("Signup failed");
    }
  };

 
  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center gap-3 w-[600px] mx-auto mt-3 pb-7 rounded-4xl bg-white px-4 py-6 shadow-2xl  ">

      <div className="w-full max-w-md">
              <h1 className="font-semibold text-3xl text-center"> Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-3">
          
          <div>
            <label className="font-semibold ml-1">Full Name</label>
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          
          <div>
            <label className="font-semibold ml-1">Address</label>
            <input
              type="text"
              placeholder="Your Address"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("address")}
            />
          </div>

          
          <div>
            <label className="font-semibold ml-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
               className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("profileImage")}
            />
          </div>

          
          <div>
            <label className="font-semibold ml-1">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          
          <div>
            <label className="font-semibold ml-1">Password</label>
            <input
              type="password"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          
          <div>
            <label className="font-semibold ml-1">Confirm Password</label>
            <input
              type="password"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          
          <div>
            <button
              type="submit"
              className="bg-red-700 text-white w-full py-2 rounded-2xl font-semibold text-xl"
            >
              Create Account
            </button>
          </div>
        </form>

        
        <h1 className="text-md mt-2 text-center">
          Already have an account?{" "}
          <Link
            to="/SignIn"
            className="underline text-red-800 font-semibold"
          >
            Sign In
          </Link>
        </h1>

        <div className="mt-3">
          <button
            onClick={handleGoogleSignIn}
            className="flex justify-center gap-3 items-center border border-gray-300 w-full py-2 rounded-2xl font-semibold text-xl"
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
