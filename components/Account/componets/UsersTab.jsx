/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { auth } from "@/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import InputField from "./InputComponent";

const CreateUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    try {
      // Input validation
      if (!email || !password || !confirmPassword) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setError("");
      setSuccess("User Created Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(`Error creating account: ${error.message}`);
    }
  };

  return (
    <div className="flex  items-start  h-screen w-auto">
      <div className="">
        <h2 className="text-xl font-semibold mb-5">Create User Account</h2>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-600 mb-4">{success}</div>}
        <form onSubmit={handleSignUp}>
          <InputField
            label={"Email"}
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label={"Confirm Password"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label={"Confirm Password"}
            type={"password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {loading ? (
            <div>
              <img
                src="assets/images/loading.svg"
                alt="Loader Icon"
                className="animate-spin-slow h-7 w-7 mt-5"
                onClick={null}
              />
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSignUp}
                className="ml-2 bg-black text-green-500 px-8 py-2 rounded-md text-sm mt-5 "
              >
                Create Account
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
