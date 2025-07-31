"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") || "";

  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [countdown, setCountdown] = useState(30);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    const verificationCode = code.join("");

    if (!verificationCode) {
      setError("Verification code is required.");
      return;
    }

    if (verificationCode.length !== 4) {
      setError("Verification code must be 4 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://akil-backend.onrender.com/verify-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, OTP: verificationCode }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Email verified successfully! You can now log in.");
        router.push("/login");
      } else {
        setError(data.message || "Verification failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = () => {
    setError("");
    setResendMessage("Please check your inbox or spam folder for the verification code.");
    setCountdown(30);
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus to next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-5">
      <div className="max-w-md w-full ">
        <h1 className="text-3xl font-main font-bold text-center text-gray-900 mb-10">
          Verify Email
        </h1>
        <p className="text-gray-600 text-center mb-16">
          We've sent a verification code to the email address you
          provided. To complete the verification process, please
          enter the code here.
        </p>

        {(error || resendMessage) && (
          <div
            className={`mb-4 p-3 rounded text-center text-sm ${
              error ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {error || resendMessage}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center space-x-11 ">
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                placeholder="0"
                inputMode="numeric"
                maxLength={1}
                value={code[index]}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-14 h-14 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm mb-16">
            You can request to{" "}
            <button
              type="button"
              className={`font-semibold ${countdown > 0 ? "text-gray-400 cursor-not-allowed" : "text-blue-600 hover:underline"}`}
              onClick={handleResend}
              disabled={countdown > 0}
            >
              Resend code
            </button>{" "}
            {countdown > 0 && `in ${countdown}s`}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-600 text-white py-3 rounded-3xl hover:bg-gray-700 transition font-medium"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;