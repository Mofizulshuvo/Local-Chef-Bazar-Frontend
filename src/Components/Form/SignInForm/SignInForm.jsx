import React, {  useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router";
import image1 from "../../../assets/cooking (1).png"
import { AuthContext } from "../../../Context/AuthContext";
const SignInForm = () => {

const {SignInwithGoogle}=useContext(AuthContext);


const handleGoogleSignIn=async ()=>{
  await SignInwithGoogle();
}



  const image = "../../../assets/pexels-ella-olsson-572949-1640777.jpg";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="w-full h-full bg-[url('assets\pexels-ella-olsson-572949-1640777.jpg')] bg-cover bg-center backdrop-blur-lg">
      <div className="mx-auto w-1/2  mt-10 flex justify-between items-center  ">
        <div className="w-full h-full bg-amber-400">
         <img src={image1} alt="" className="w-full"/>
        </div>

        <div className="bg-white my-5 pt-5 pb-10 px-2 w-full rounded-2xl  mx-auto">
          <h1 className="text-3xl font-bold text-center">Plese Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full h-auto px-5 py-1 ">
              <label htmlFor="email" className="font-semibold text-md">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="abc@email.com"
                {...register("email", { required: "Email is required" })}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="w-full h-auto px-5 py-1 ">
              <label htmlFor="password" className="font-semibold text-md">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder=""
                {...register("password", { required: "Password is Required!" })}
                className="border border-gray-300 rounded px-2 py-1 w-full"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-[calc(100%-2.5rem)] mx-5 h-auto px-5 py-2 bg-[#c81d20] mt-2 text-white rounded-sm text-center font-boldtext-2xl"
            >
              Sign In
            </button>
          </form>
          <div className="text-center font-semibold text-sm flex justify-between items-center mx-5 mt-2">
            <h1>
              Don't have any account? 
              <NavLink to="/SignUp" className={`text-red-600 underline ml-2`}>
                  Sign Up
              </NavLink>
            </h1>
            <h1 className="underline">
              Forget Password
            </h1>
          </div>

          <button onClick={handleGoogleSignIn} className="w-[calc(100%-2.5rem)] mx-5 h-auto px-5  bg-[#ffffff] mt-2 text-Black rounded-sm text-center font-boldtext-2xl border flex items-center justify-center gap-5 py-1">
            <FcGoogle className="text-xl" />
            <h1 className=" text-md">Continue With Google</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
