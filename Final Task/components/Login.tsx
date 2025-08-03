'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Define Zod schema
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Minimum 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [loginError, setLoginError] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setLoginError('');

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
      console.log('Login successful data:', res);
    } else if (res?.error === 'CredentialsSignin') {
      setLoginError('Invalid email or password.');
    } else {
      setLoginError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-white">
      <div className='w-1/3 bg-gray-300'> </div>
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl text-blue-950 font-main text-center font-bold pb-3 mb-10 border-b border-gray-200 ">
          Welcome Back,
        </h1>

        {/* Error Message Display */}
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm font-medium">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-base mb-2 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-600 text-base mb-2 font-semibold">
              Password
            </label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-3 rounded-4xl text-white font-bold w-full ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#110f47] hover:bg-indigo-700 transition'
            }`}
          >
            {isSubmitting ? 'Logging...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-indigo-950 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
