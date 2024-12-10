import React from 'react'
import { FormGroup } from '../formGroup'
import { InputBtn } from '../input'

interface Details {
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

  return (
    <form className='w-3/4 p-6 m-auto bg-white rounded-lg shadow-md flex flex-col gap-6'>
        <FormGroup heading='Basic Information'>
            <div className='w-[48%]'>
              <label htmlFor="name">Name</label>
              <InputBtn name='name' value={props.name}  />
            </div>
            <div className='w-[48%]'>
              <label htmlFor='category'>Category</label>
              <InputBtn name='category' value={props.category} />
            </div>
            <div className='w-[97%]'>
              <label htmlFor='description'>Product Description</label>
              <textarea  id='description' className='focus:outline-teal-600 w-full h-30 resize-none' value={props.description} readOnly></textarea>
            </div>
        </FormGroup>
        <FormGroup heading='Specifications & Keywords'>
            <div className='w-[48%]'>
              <label htmlFor='age'>Age</label>
              <InputBtn name='age' value={props.age} />
            </div>
            <div className='w-[48%]'>
              <label htmlFor='gender'>Gender</label>
              <InputBtn name='gender' value={props.gender} />
            </div>
            <div className='w-[48%]'>
              <label htmlFor='length'>Length</label>
              <InputBtn name='length' value={props.length}/>
            </div>
            <div className='w-[48%]'>
              <label htmlFor='width'>Width</label>
              <InputBtn name='width' value={props.width}/>
            </div>
            <div className='w-[97%]'>
              <label htmlFor='keywords'>Keywords</label>
              <input value={props.keywords.map((item) => item)} className='focus:outline-teal-600 rounded border border-solid w-full' type='text' id='keywords' name='keywords' readOnly/>
            </div>
        </FormGroup>
    </form>
  )
}

export default EquipmentDetail