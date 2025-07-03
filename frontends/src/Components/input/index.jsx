// components/CustomInput.js

import React from "react";
import PropTypes from "prop-types";

export const CustomInput = ({
  placeholder,
  value,
  onChange,
  type = "text",
  name,
  className = "",
  rightIcon,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange || (() => {})}
        className={`bg-input w-full p-3 rounded-[8px] text-btn-text focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {rightIcon}
        </span>
      )}
    </div>
  );
};

CustomInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  rightIcon: PropTypes.node, // ✅ Optional by default
};