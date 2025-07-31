'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

// Define Zod schema for validation
const signUpSchema = z
  .object({
    name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Minimum 6 characters'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUp = () => {
  const router = useRouter();
  const [signupError, setSignupError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      setSignupError('');
      const body = { ...data, role: 'user' };

      const res = await fetch('https://akil-backend.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await res.json();

      if (res.ok) {
        router.push(`/verifyEmail?email=${data.email}`);
      } else {
        setSignupError(result.message || 'Signup failed. Please try again.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSignupError(error.message);
      } else {
        setSignupError('Signup failed. Unknown error.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-blue-950 mb-6">
          Sign Up Today!
        </h1>

        {/* Google button */}
        <button
          className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md mb-4 hover:bg-gray-100 transition"
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <FcGoogle className="text-xl mr-2" />
          Sign in with Google
        </button>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">Or Sign Up with Email</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Error message display */}
        {signupError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-center text-sm font-medium">
            {signupError}
          </div>
        )}

        {/* Sign up form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Full Name</label>
            <input
              type="text"
              {...register('name')}
              placeholder="Enter your full name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Email Address</label>
            <input
              type="email"
              {...register('email')}
              placeholder="Enter email address"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-1">Password</label>
            <input
              type="password"
              {...register('password')}
              placeholder="Enter password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm mb-1">Confirm Password</label>
            <input
              type="password"
              {...register('confirmPassword')}
              placeholder="Confirm password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed w-full rounded-md'
                : 'w-full bg-[#2D298E] text-white py-3 rounded-4xl hover:bg-indigo-700 transition'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </button>
        </form>

        {/* Footer section */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-900 font-semibold hover:underline">
            Login
          </Link>
        </p>

        <p className="text-xs text-center text-gray-400 mt-4">
          By clicking 'Continue', you acknowledge that you have read and accepted our{' '}
          <a href="#" className="text-blue-900 hover:underline">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-blue-900 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
