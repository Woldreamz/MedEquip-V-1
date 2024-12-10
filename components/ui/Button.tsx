import React from "react";
import { FaDev } from "react-icons/fa"; // Adjust with your icon choice

// Define the type for ButtonProps
interface ButtonProps {
  type?: "primary" | "critical";
  icon?: React.ReactNode; // icon can be a React node
  label: string;
  onClick: () => void; // a function with no arguments and no return value
  typeProperty: any;
  otherStyles: string;
}

const Button = ({ type = "primary", icon, label, onClick, typeProperty, otherStyles }: ButtonProps) => {
  return (
    <button
      className={`button ${type === "critical" ? "red" : "teal"} ${otherStyles}`}
      onClick={onClick}
      type={typeProperty} // type property if needed for form submission or other purposes
    >
      {icon && <FaDev className="button-icon" />}
      {label}
    </button>
  );
};

export default Button;
