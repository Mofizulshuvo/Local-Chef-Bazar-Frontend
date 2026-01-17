import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInForm = () => {
  const {
    SignInwithEmailAndPassword,
    SignInwithGoogle,
    loading,
    setLoading,
    userRole
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  
  const handleGoogleSignIn = async () => {
    try {
      setLocalLoading(true);
      const googleUser = await SignInwithGoogle();
      toast.success(`Welcome ${googleUser.displayName || "User"}`);
      
      if (userRole === "admin") navigate("/AdminDashboard");
      if (userRole !== "admin") navigate("/");
      else navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Google Sign-In Failed");
    } finally {
      setLocalLoading(false);
    }
  };

  
  const onSubmit = async (data) => {
    try {
      setLocalLoading(true);
      const { email, password } = data;
      const user = await SignInwithEmailAndPassword(email, password);
      toast.success(`Welcome ${user.user.displayName || "User"}`);
      
      if (userRole === "admin") navigate("/AdminDashboard");
      else navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Email/Password Sign-In Failed");
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center gap-3 bg-white mx-auto px-4 pt-10 pb-30 w-[600px] shadow-2xl mt-10 rounded-4xl">
      

      <div className="w-full max-w-md">
        <h1 className="font-semibold text-3xl text-center">Please Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
         
          <div>
            <label className="font-semibold ml-1">Email</label>
            <input
              type="email"
              className="w-full px-2 py-1 border border-gray-300 rounded-xl mt-1"
              placeholder="example@gmail.com"
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
            <button
              type="submit"
              className={`bg-red-700 text-white w-full py-2 rounded-2xl font-semibold text-xl ${
                localLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={localLoading}
            >
              {localLoading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>


        <h1 className="text-md mt-2 text-center">
          No account?{" "}
          <Link to="/SignUp" className="underline text-red-800 font-semibold">
            Sign Up
          </Link>
        </h1>

    
        <div className="mt-3">
          <button
            onClick={handleGoogleSignIn}
            disabled={localLoading}
            className={`flex justify-center gap-3 items-center border border-gray-300 w-full py-2 rounded-2xl font-semibold text-xl ${
              localLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
