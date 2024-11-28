"use client";
import React, { FormEvent, useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://medequip-api.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );
      if (response.ok) {
        const { user, accessToken } = await response.json(); //get the access token and user name from the response
        localStorage.setItem("accessToken", accessToken); //store the access token
        localStorage.setItem("user", JSON.stringify(user)); // store the user
        router.push("/"); // redirect to the dashboard
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center py-20">
        <div className="lg:w-[668px] md:w-[468px] py-8 px-8 bg-white rounded-[40px]">
          <h2 className="text-center lg:text-[28px] md:text-[28px] sm:text-[28px] text-[23px]">
            Welcome Back
          </h2>
          <p className="text-center lg:text-[16px] md:text-[16px] sm:text-[16px] text-[13px] pb-10">
            Enter your email and password to continue
          </p>

          <form className="text-[13px]">
            <InputField
              type="email"
              name="email"
              label="Email Address"
              className="mb-3 text-sm"
              placeholder="example@email.com"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <InputField
              type="password"
              name="password"
              label="Password"
              className="mb-3 text-sm"
              placeholder="***************"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <div className="flex-row mb-8">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Remember Me</span>
            </div>

            <Button
              typeProperty="submit"
              label="Sign In"
              otherStyles="w-full"
              onClick={handleSubmit}
            />
          </form>

          <div className="text-center mt-8 text-xs">
            <span>
              Don’t have an account?
              <Link className="underline" href="/sign-up">
                {" "}
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignIn;
