import React from 'react'
import Image, {StaticImageData} from 'next/image'


export interface IconProps {
    src: string; 
    alt: string;
}

export const EquipmentIcon = (props:IconProps) => {
  return (
    // <div className='rounded border-teal w-75 w-50 p-1'>
        <Image height={300} width={230} src={props.src} alt={props.alt} />
    // </div>
  )
}
