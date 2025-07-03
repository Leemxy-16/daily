import React from "react";

export const CustomButton = ({ title, type, disabled, className = "" }) => {
  return (
    <button
      type={type}
      disabled ={disabled ?? false}
      className={`bg-buttons rounded-[8px] cursor-pointer text-light-text focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      {title}
    </button>
  );
};