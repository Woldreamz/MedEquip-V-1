import React from "react";

// Define prop types for InputField
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string; // Optional, defaults to "text"
  otherStyles: string;
  itemRef: any;
}

const InputField = ({ label, otherStyles, itemRef, type = "text", ...props }: InputFieldProps) => {
  return (
    <div className={`input-field ${otherStyles}`}>
      <label className="font-semibold">{label}</label>
      <input ref={itemRef} type={type} {...props} />
    </div>
  );
};

export default InputField;
