
import React from 'react'
import EquipmentCard, { CardProps } from '../card';


interface List {
  data: CardProps[]
}

const EquipmentList = (props:List) => {

  return (
    <section className='flex flex-wrap w-[90%] lg:pl-[10%] lg:pt-10 m-auto bg-transparent justify-start gap-4'>
        {props.data.map((item, index) => (
            <EquipmentCard key={index} 
             name={item.name} 
             category={item.category} 
             images={item.images}
             id={item.id} 
            />
        ))
        }
    </section>
  )
}

export default EquipmentList;