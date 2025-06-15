// components/Form/CheckboxGroup.js
import React from 'react';

const CheckboxGroup = ({
  label,
  options,
  value,
  onChange,
  error,
  className = '',
  ...props
}) => {
  const handleChange = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((val) => val !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {options.map((option) => (
        <div key={option.value} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`${option.value}`}
            checked={value.includes(option.value)}
            onChange={() => handleChange(option.value)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor={`${option.value}`}
            className="ml-2 text-sm text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default CheckboxGroup;