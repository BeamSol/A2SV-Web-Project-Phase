'use client';
import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Nav = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex justify-end items-center p-2 bg-gray-200">
      {status === 'loading' ? (
        <p className="text-gray-500">Loading...</p>
      ) : session ? (
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="px-3 py-2 bg-blue-950 text-white rounded-xl hover:bg-stone-900 transition"
        >
          Sign Out
        </button>
      ) : (
        <Link href="/login" className="px-3 py-2 bg-blue-950 text-white rounded-xl hover:bg-stone-900 transition">
          Login
        </Link>
      )}
    </div>
  );
};

export default Nav;
