// import React, { useContext } from "react";
// import { useForm } from "react-hook-form";
// import { FcGoogle } from "react-icons/fc";
// import { NavLink } from "react-router";
// import image1 from "../../../assets/cooking (1).png";
// import bgImage from "../../../assets/pexels-ella-olsson-572949-1640777.jpg";
// import { AuthContext } from "../../../Context/AuthContext";

// const SignInForm = () => {
//   const {
//     SignInwithGoogle,
//     SignUpwithEmailAndPassword,
//     SignInwithEmailAndPassword,
//   } = useContext(AuthContext);

//   const handleGoogleSignIn = async () => {
//     await SignInwithGoogle();
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//     const {email,password}=data;
//     SignInwithEmailAndPassword(email,password);
//   };

//   return (
//     <div
//       className="w-full h-full bg-cover bg-center backdrop-blur-lg"
//       style={{ backgroundImage: `url(${bgImage})` }}
//     >
//       <div className="mx-auto w-1/2 mt-10 flex justify-between items-center">
//         <div className="w-full h-full bg-amber-400">
//           <img src={image1} alt="" className="w-full" />
//         </div>

//         <div className="bg-white my-5 pt-5 pb-10 px-2 w-full rounded-2xl mx-auto">
//           <h1 className="text-3xl font-bold text-center">Please Sign In</h1>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="w-full h-auto px-5 py-1">
//               <label htmlFor="email" className="font-semibold text-md">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="abc@email.com"
//                 {...register("email", { required: "Email is required" })}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}
//             </div>

//             <div className="w-full h-auto px-5 py-1">
//               <label htmlFor="password" className="font-semibold text-md">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 type="password"
//                 {...register("password", {
//                   required: "Password is required",
//                 })}
//                 className="border border-gray-300 rounded px-2 py-1 w-full"
//               />
//               {errors.password && (
//                 <p className="text-red-500 text-sm">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="w-[calc(100%-2.5rem)] mx-5 px-5 py-2 bg-[#c81d20] mt-2 text-white rounded-sm text-center font-bold text-2xl"
//             >
//               Sign In
//             </button>
//           </form>

//           <div className="text-center font-semibold text-sm flex justify-between items-center mx-5 mt-2">
//             <h1>
//               Don't have an account?
//               <NavLink to="/SignUp" className="text-red-600 underline ml-2">
//                 Sign Up
//               </NavLink>
//             </h1>
//             <h1 className="underline">Forget Password</h1>
//           </div>

//           <button
//             onClick={()=>handleGoogleSignIn()}
//             className="w-[calc(100%-2.5rem)] mx-5 px-5 bg-white mt-2 text-black rounded-sm text-center font-bold text-2xl border flex items-center justify-center gap-5 py-1"
//           >
//             <FcGoogle className="text-xl" />
//             <h1 className="text-md">Continue With Google</h1>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignInForm;

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
