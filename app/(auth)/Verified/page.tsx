"use client"
import React from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const Verified = () => {

  const router = useRouter();
  const handleClick = () => {
    router.push("/sign-in");
  };
  return (
    <>
      <div className="pt-16 pb-28 flex justify-center">
        <div className="text-center">
          <h2 className="lg:text-[32px] md:text-[32px] text-[28px] mb-10">Verification Successful</h2>
          <Image 
            className="mb-10 max-w-[100%]" 
            src="/Images/Frame.svg" 
            alt="verification successful" 
            width={100} height={100} layout="responsive"
          />

          <Button 
            typeProperty="button"
            label="Proceed"
            otherStyles="lg:w-[240px] md:w-[240px] sm:w-[200px] w-[140px]"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};
export default Verified;
