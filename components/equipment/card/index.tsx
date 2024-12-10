import React from "react";
import { EquipmentIcon } from "../image";
import { StaticImageData } from "next/image";
import shears from '@/public/Images/shears.png'
import { useRouter } from "next/navigation";

export interface CardProps {
  name: string;
  category: string;
  id: number;
  images: StaticImageData;
}

const EquipmentCard = (props: CardProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-around w-[23%] h-50 p-3 bg-white rounded-xl">
      <EquipmentIcon src={shears} alt={props.name} />
      <p>
        <strong>Name: </strong>
        {props.name}
      </p>
      <p>
        <strong>Category: </strong>
        {props.category}
      </p>
      <button
        type="button"
        onClick={() =>
          router.push(`/equipments/details?id=${encodeURIComponent(props.id)}`)
        }
        className="rounded border border-solid border-teal-600 h-10 w-full text-teal-600 hover:text-white justify-center items-center p-4 bg-transparent flex"
      >
        View details
      </button>
    </div>
  );
};

export default EquipmentCard;
