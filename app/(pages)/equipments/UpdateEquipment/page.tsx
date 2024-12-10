"use client"
import React, {FormEvent, useState} from 'react';
import InputField from '../../../../components/ui/InputField';
import Button from '@/components/ui/Button';
import { useSearchParams, useRouter } from "next/navigation";

interface FormState {
    name: string;
    description: string;
    category: string;
    images: File | string;
    tags: string[];
    useCases: string;
}
  interface UpdateEquipmentProps {
    closeModal: () => void;
  }

const UpdateEquipment: React.FC<UpdateEquipmentProps> = ({ closeModal }) => {
  const searchParams = useSearchParams();
  const id = searchParams?.get('id');
  const router = useRouter();
  console.log(id);
  const [tag, setTag] = useState<string[]>([]);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    category: '',
    images: '',
    tags: [],
    useCases: ''
  });

  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
   

    if (name === 'tags') {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setTag(tagsArray); // Fix: directly set the array instead of using spread operator
        setForm({...form, tags: tagsArray});
    }else if (name === 'images' && files && files.length>0) {
        const fileArray = Array.from(files);
        setForm({...form, images: fileArray[0]});
    } else{
        setForm({...form, [name]: value }); 
    }
    // console.log(form);
  }


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

  // Append all form fields to FormData
  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("category", form.category);
  // formData.append("tags", JSON.stringify(form.tags));
  form.tags.forEach((tag) => formData.append("tags[]", tag));
  formData.append("useCases", form.useCases);

  // Append the file (if any)
  if (form.images && typeof form.images === "object") {
    formData.append("images", form.images as File);
  }
    console.log(formData);
    
    
    try {
        const response = await fetch(`https://medequip-api.vercel.app/api/equipment/${id}`,{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: formData,
        });
        if (response.ok) {
          //redirect to the email verification page after sucessfull submission
          const responseData = await response.json();
          console.log(responseData);
          router.push("/equipments");
        }else {
          const errorData = await response.json();
          console.error("Error: Failed to submit the form", errorData);
          alert("Failed to update equipment");
        }
      } catch (error) {
        console.error("An error occured:", error);
      }
    
  }

  return (
    <>
      <div className='flex justify-center py-20'>    
        <div className='lg:w-[668px] md:w-[468px] py-8 px-8 bg-white rounded-[40px]'>
          <h2 className='text-center lg:text-[28px] md:text-[28px] sm:text-[28px] text-[23px]'>
            Update an Equipment
          </h2>

          <p className='text-center lg:text-[16px] md:text-[16px] sm:text-[16px] text-[13px] pb-10'>
              Fill out the form below to update equipment
          </p>

          <form className='text-[13px]'>
           <InputField 
             type='text'
             label='name'
             name='name' 
             className='mb-3 text-xs' 
             placeholder='name' required
             value={form.name}
             onChange={handleChange}
           />

            <InputField 
             type='text'
             label='description'
             name='description' 
             className='mb-3 text-xs' 
             placeholder='description' required  
             value={form.description}
             onChange={handleChange}
           />

           <InputField 
             type='text'
             label='category'
             name='category' 
             className='mb-3 text-xs' 
             placeholder='category' required
             value={form.category}
             onChange={handleChange}
           />


            <InputField 
             type='file'
             label='image'
             name='images' 
             className='mb-3 text-xs' 
             placeholder='image' 
             onChange={handleChange}
           />

            <InputField 
             type='text'
             label='tags'
             name='tags' 
             className='mb-3 text-xs' 
             placeholder='tags'  
             value={tag.join(",")}
             onChange={handleChange}
           />

            <InputField 
              type='text'
              label='Use cases'
              name='useCases' 
              className='mb-3 text-xs' 
              placeholder='Use cases'
              minLength={8} required
              value={form.useCases}
              onChange={handleChange}
            />

           <div className="flex justify-between mt-4">
            <Button
              typeProperty="button"
              label="Cancel"
              onClick={closeModal}
              otherStyles="bg-red-500 text-white"
            />

            <Button 
              typeProperty="submit"
              label='Create Equipment'
              otherStyles='w-full'
              onClick={handleSubmit}
            />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}

export default UpdateEquipment;
