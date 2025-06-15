// components/Button.js
import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'sm',
  className = '',
  ...props
}) => {
  const baseStyles = 'font-[500] rounded transition duration-300';

  const variants = {
    primary: 'bg-[#FF9B00] hover:bg-[#CC7C00] text-black',
    secondary: 'bg-gray-500 hover:bg-gray-700 text-white',
    outline: 'border border-[#FF9B00] text-black hover:bg-[#FF9B00] hover:text-black',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button type={type} className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;