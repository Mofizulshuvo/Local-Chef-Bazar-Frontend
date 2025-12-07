import React from 'react';
import { useForm } from 'react-hook-form';

const SignInForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full h-10 px-2 py-1'>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className='border border-gray-300 rounded px-2 py-1'
                    />
                    {errors.email && (
                        <p className='text-red-500 text-sm'>{errors.email.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignInForm;
