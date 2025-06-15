// components/Form/Radio.js
import React from 'react';

const Radio = ({
  label,
  id,
  value,
  onChange,
  options,
  error,
  className = '',
  RadioClass,
  ...props
}) => {
  const baseStyles = 'flex items-center justify-between mb-2 active:bg-[#FFF6E9]'
  const radioStyles = RadioClass ? `${baseStyles} ${RadioClass}` : baseStyles;
  return (
    <div className={`${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      {options.map((option) => (
        <div key={option.value} className={radioStyles}>
          <label
            htmlFor={`${id}-${option.value}`}
            className="ml-2 text-sm text-gray-700"
          >
            {option.heading &&
              <h3 className='font-bold'>{option.heading}</h3>
            }
            {option.label}
          </label>
          <input
            type="radio"
            id={`${id}-${option.value}`}
            name={id}
            value={option.value}
            checked={value === option.value}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            {...props}
          />
        </div>
      ))}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default Radio;