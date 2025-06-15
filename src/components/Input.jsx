// components/Form/Input.js
import React from 'react';

const Input = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
        {...props}
      />
      {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
    </div>
  );
};

export default Input;