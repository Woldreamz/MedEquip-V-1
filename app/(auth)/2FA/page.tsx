"use client"
import React, {FormEvent} from 'react';
import InputField from '../../../components/ui/InputField';
import Button from '@/components/ui/Button';
import { useSearchParams } from "next/navigation";
import { useVerification } from "../../../context/VerificationContext";
import { useRouter } from 'next/navigation';

const AuthCode = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { verificationStatus } = useVerification();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://medequip-api.vercel.app/api/auth/resend-verification',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
    });

    const responseData = await response.json();
    console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }

  const redirectTo = () => {
    if (verificationStatus === "success") {
      router.push("/verified")
    }else {
      alert("Please verify your email address before you continue.");
    }
  };
  
  return (
    <>
      <div className='flex justify-center py-20'>    
        <div className='lg:w-[668px] md:w-[568px] sm:w-[468px] w-[368px] py-8 px-8 
         bg-white rounded-[40px]'>

          <h2 className='text-center lg:text-[28px] md:text-[28px] sm:text-[28px] text-[23px]'>
            Verify your Account
          </h2>

          <p className='text-center lg:text-[18px] md:text-[18px] sm:text-[16px] text-[14px] pt-4 pb-10'>
            Click on the link sent to the email account you registered to verify your account
          </p>

          <div className='text-center mb-8'>
            <p className='lg:text-[16px] md:text-[16px] sm:text-[16px] text-[12px]'>
                Click the link below to resend verification email?
            </p>

            <InputField  
              type='submit'
              label='' 
              className='text-sm border-0 underline text-[#319898]' 
              placeholder='Resend verification email'
              value="Resend verification email"
              onClick={handleSubmit}
            />
          </div>

          <Button 
            typeProperty="submit"
            label='Continue'
            otherStyles='w-full mb-2'
            onClick={redirectTo}
          />
    

        </div>
      </div>
    </>
  )
}

export default AuthCode;
