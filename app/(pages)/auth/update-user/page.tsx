"use client"
import React, {FormEvent, useState, useEffect} from 'react';
import InputField from '../../../../components/ui/InputField';
import Button from '@/components/ui/Button';
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateUser = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    dob: '',
    occupation: '',
    address: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await fetch(`https://medequip-api.vercel.app/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setForm(data); // Assumes the API response matches the form structure
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);


  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prevForm) => ({...prevForm, [name]: value })); 
    console.log(form);  
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (id) {
      
      try {
        const response = await fetch(`https://medequip-api.vercel.app/api/users/${id}`,{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify(form),
        });
        if (response.ok) {
          //redirect to the email verification page after sucessfull submission
          const responseData = await response.json();
          console.log(responseData);
          localStorage.setItem('user', JSON.stringify(responseData));
          alert("User updated  successfully");
          router.push('/');
        }else {
          const errorData = await response.json();
          console.error("Error: Failed to submit the form", errorData);
          alert("Failed to update the user information");
        }
      } catch (error) {
        console.error("An error occured:", error);
      }
    }
 
  }

  return (
    <>
      <div className='flex justify-center py-20'>    
        <div className='lg:w-[668px] md:w-[468px] py-8 px-8 bg-white rounded-[40px]'>
          <h2 className='text-center lg:text-[28px] md:text-[28px] sm:text-[28px] text-[23px]'>
            Update User Information
          </h2>

          <p className='text-center lg:text-[16px] md:text-[16px] sm:text-[16px] text-[13px] pb-10'>
            Fill the specific field to update user
          </p>

          <form className='text-[13px]'>
           <InputField 
             type='text'
             label='First name'
             name='firstname' 
             className='mb-3 text-xs' 
             placeholder='first name'
             value={form.firstname}
             onChange={handleChange}
           />

            <InputField 
             type='text'
             label='Last name'
             name='lastname' 
             className='mb-3 text-xs' 
             placeholder='last name'  
             value={form.lastname}
             onChange={handleChange}
           />

           <InputField 
             type='email'
             label='Email Address'
             name='email' 
             className='mb-3 text-xs' 
             placeholder='example@email.com'
             value={form.email}
             onChange={handleChange}
           />


            <InputField 
             type='text'
             label='Phone Number'
             name='phone' 
             className='mb-3 text-xs' 
             placeholder='phone no.' 
             value={form.phone}
             onChange={handleChange}
           />

            <InputField 
             type='date'
             label='Date of Birth'
             name='dob' 
             className='mb-3 text-xs' 
             placeholder='**/**/****'
             value={form.dob}
             onChange={handleChange}
           />

            <InputField 
             type='text'
             label='Occupation'
             name='occupation' 
             className='mb-3 text-xs' 
             placeholder='Occupation'
             value={form.occupation}
             onChange={handleChange}
           />

            <InputField 
             type='text'
             label='Location'
             name='address' 
             className='mb-3 text-xs' 
             placeholder='City, Country'
             value={form.address}
             onChange={handleChange}
           />

            <Button 
              typeProperty="submit"
              label='Update user'
              otherStyles='w-full'
              onClick={handleSubmit}
            />
          </form>

        </div>
      </div>
    </>
  )
}

export default UpdateUser;
