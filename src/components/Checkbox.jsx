// components/Form/Checkbox.js
import React from 'react';

const Checkbox = ({
  label,
  id,
  checked,
  onChange,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          {...props}
        />
        {label && (
          <label htmlFor={id} className="ml-2 text-sm text-gray-700">
            {label}
          </label>
        )}
      </div>
      {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
    </div>
  );
};

export default Checkbox;