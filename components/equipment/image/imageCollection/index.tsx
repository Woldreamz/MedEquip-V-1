import React from "react";
import { EquipmentIcon, IconProps } from "../index";

interface ImageList {
  list: IconProps[];
}

export const EquipmentImageList = (props: ImageList) => {
  return (
    <section className="bg-white rounded-lg p-4 h-max">
      <h4 className="text-black text-lg">Images</h4>
      <div className="flex flex-col gap-4 rounded border-none">
        {props.list.map((item, index) => (
          <EquipmentIcon key={index} src={item.src ? item.src: item} alt={item.alt} />
        ))}
      </div>
    </section>
  );
};
