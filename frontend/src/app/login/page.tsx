"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useMutation } from "@tanstack/react-query";
import { signIn, signUp } from "@/util/user-requests";
import { useRouter } from "next/navigation";
import { FetchError } from "@/types/custom-error";

export default function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: () => signUp({ email, password }),
    onSuccess: (data) => {
      setErrorMessage("");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: (err: FetchError) => {
      setErrorMessage(err.info?.message || "Sign up failed");
    },
  });

  const signinMutation = useMutation({
    mutationFn: () => signIn({ email, password }),
    onSuccess: (data) => {
      setErrorMessage("");
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: (err: FetchError) => {
      setErrorMessage(err.info?.message || "Sign in failed");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      signupMutation.mutate();
    } else {
      signinMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-white text-gray-900">
      <div className="w-full max-w-md p-8 rounded-xl shadow-md bg-white text-gray-900">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignup ? "Sign Up" : "Sign In"}
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {(signinMutation.isPending || signupMutation.isPending) && (
            <p className="text-gray-600 text-center">Loading...</p>
          )}

          <Button type="submit" full>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 hover:underline"
            onClick={() => {
              setErrorMessage("");
              setIsSignup(!isSignup);
            }}
          >
            {isSignup ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
