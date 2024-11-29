import React from "react";

export interface IconProps {
  src: string;
  alt: string;
}

export const EquipmentIcon = (props: IconProps) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      style={{ height: 200, width: 230, objectFit: "cover" }}
    />
  );
};
