import React from 'react'
import { FormGroup } from '../formGroup'
import { InputBtn } from '../input'
import {FormEvent, useState} from 'react';

export interface Details {
  name: string
  category: string
  description: string
  age: string
  gender: string
  length: string
  width: string
  keywords: string[]
}

const EquipmentDetail = (props: Details) => {
  // const AddKeyword = (event) => {
  //   if(event.key === 'Enter'){
  //     setReg((PrevArray) => ({
  //       ...PrevArray,
  //       keywords:  [...PrevArray.keywords, event.target.value]
 //     }))
  //   }
    
  // }

  // const removeKeywords = (keyword) => {
  // setReg((prevData) => ({
  //     ...prevData,
  //     keywords: prevData.keywords.filter(name => name !== keyword)
  // }));
  // };
  const [tag, setTag] = useState<string[]>([]);
  const [form, setForm] = useState<Details>({
    name: '',
    description: '',
    category: '',
    keywords: [],
    gender: '',
    length: '',
    width: '',
    age: '',
  });

  function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
   

    if (name === 'keywords') {
        const tagsArray = value.split(',').map((tag) => tag.trim());
        setTag(tagsArray); // Fix: directly set the array instead of using spread operator
        setForm({...form, keywords: tagsArray});
    }else{
        setForm({...form, [name]: value }); 
    }
    // console.log(form);
  }

  const update = async () => {
    try {
      const response = await fetch('https://medequip-api.vercel.app/api/equipment/',{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: form,
      });
      if (response.ok) {
        //redirect to the email verification page after sucessfull submission
        const responseData = await response.json();
        console.log(responseData);
      }else {
        const errorData = await response.json();
        console.error("Error: Failed to submit the form", errorData);
        alert("Failed to create equipment");
      }
    } catch (error) {
      console.error("An error occured:", error);
    }
  }
  return (
    <form className='w-3/4 p-6 m-auto bg-white rounded-lg shadow-md flex flex-col gap-6'>
        <FormGroup heading='Basic Information'>
            <div className='w-[48%]'>
              <label htmlFor="name">Name</label>
              <InputBtn name='name' value={props.name}  onChange={handleChange}/>
            </div>
            <div className='w-[48%]'>
              <label htmlFor='category'>Category</label>
              <InputBtn name='category' value={props.category} onChange={handleChange}/>
            </div>
            <div className='w-[97%]'>
              <label htmlFor='description'>Product Description</label>
              <textarea  id='description' className='focus:outline-teal-600 w-full h-30 resize-none' value={props.description} onChange={handleChange} ></textarea>
            </div>
        </FormGroup>
        <FormGroup heading='Specifications & Keywords'>
            <div className='w-[48%]'>
              <label htmlFor='age'>Age</label>
              <InputBtn name='age' value={props.age} onChange={handleChange}/>
            </div>
            <div className='w-[48%]'>
              <label htmlFor='gender'>Gender</label>
              <InputBtn name='gender' value={props.gender} onChange={handleChange}/>
            </div>
            <div className='w-[48%]'>
              <label htmlFor='length'>Length</label>
              <InputBtn name='length' value={props.length} onChange={handleChange}/>
            </div>
            <div className='w-[48%]'>
              <label htmlFor='width'>Width</label>
              <InputBtn name='width' value={props.width} onChange={handleChange}/>
            </div>
            <div className='w-[97%]'>
              <label htmlFor='keywords'>Keywords</label>
              <input value={props.keywords.map((item) => item)} className='focus:outline-teal-600 rounded border border-solid w-full' type='text' id='keywords' name='keywords' onChange={handleChange}/>
            </div>
        </FormGroup>
    </form>
  )
}

export default EquipmentDetail