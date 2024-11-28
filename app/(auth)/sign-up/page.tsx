"use client";
import React, { FormEvent, useState } from "react";
import InputField from "../../../components/ui/InputField";
import Button from "../../../components/ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    // console.log(form);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      firstname: form.firstname,
      lastname: form.lastname,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      password: form.password,
    };
    console.log(data);

    if (form.password === form.confirmPassword) {
      try {
        const response = await fetch(
          "https://medequip-api.vercel.app/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          },
        );
        if (response.ok) {
          //redirect to the email verification page after sucessfull submission
          const responseData = await response.json();
          console.log(responseData);
          router.push(`/2FA?email=${encodeURIComponent(data.email)}`);
        } else {
          const errorData = await response.json();
          console.error("Error: Failed to submit the form", errorData);
          alert("Failed to create account");
        }
      } catch (error) {
        console.error("An error occured:", error);
      }
    } else {
      alert("Please make sure your passwords match");
    }
  };

  return (
    <>
      <div className="flex justify-center py-20">
        <div className="lg:w-[668px] md:w-[468px] py-8 px-8 bg-white rounded-[40px]">
          <h2 className="text-center lg:text-[28px] md:text-[28px] sm:text-[28px] text-[23px]">
            Create an Account
          </h2>

          <p className="text-center lg:text-[16px] md:text-[16px] sm:text-[16px] text-[13px] pb-10">
            Create an account to continue
          </p>

          <form className="text-[13px]">
            <InputField
              type="text"
              label="First name"
              name="firstname"
              className="mb-3 text-xs"
              placeholder="first name"
              required
              value={form.firstname}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="text"
              label="Last name"
              name="lastname"
              className="mb-3 text-xs"
              placeholder="last name"
              required
              value={form.lastname}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="email"
              label="Email Address"
              name="email"
              className="mb-3 text-xs"
              placeholder="example@email.com"
              required
              value={form.email}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="text"
              label="Phone Number"
              name="phone"
              className="mb-3 text-xs"
              placeholder="phone no."
              required
              value={form.phone}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="date"
              label="Date of Birth"
              name="dob"
              className="mb-3 text-xs"
              placeholder="**/**/****"
              required
              value={form.dob}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="password"
              label="Create Password"
              name="password"
              className="mb-3 text-xs"
              placeholder="*************"
              minLength={8}
              required
              value={form.password}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <InputField
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              className="mb-3 text-xs"
              placeholder="***************"
              minLength={8}
              required
              value={form.confirmPassword}
              onChange={handleChange}
              otherStyles=""
              itemRef={null}
            />

            <div className="flex-row mb-8">
              <input type="checkbox" className="mr-2" required />
              <span className="text-xs">
                I agree to the terms and conditions
              </span>
            </div>

            <Button
              typeProperty="submit"
              label="Create Account"
              otherStyles="w-full"
              onClick={handleSubmit}
            />
          </form>

          <div className="text-center mt-8 text-xs">
            <span>
              Already have an account?
              <Link className="underline" href="/sign-in">
                {" "}
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
