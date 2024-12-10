import React from 'react'
import { Bar, BarFull } from './bar'



export const EquipmentProgressBar = ({progress}:{progress: number}) => {
    const b = [Bar, Bar, Bar, Bar, Bar, Bar]
    const f = [BarFull, BarFull, BarFull, BarFull, BarFull, BarFull]
  return (
    <div className='flex flex-row w-3/4 m-auto gap-2'>
        {f.slice(0, progress).map((Item, index) => (
            <Item key={index}/>
        ))
        }
        {b.slice(0, b.length - progress).map((Item, index) => (
            <Item key={index} />
        ))
        }
    </div>
  )
}
