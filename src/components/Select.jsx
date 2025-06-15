// components/Form/Select.js
import React from 'react';

const Select = ({
  label,
  id,
  value,
  onChange,
  options,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
    </div>
  );
};

export default Select;