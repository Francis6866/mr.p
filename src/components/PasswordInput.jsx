// components/Form/Input.js
import React from 'react';
import { FiEye, FiEyeOff } from "react-icons/fi";

{/* <FiEye /> */}
{/* <FiEyeOff /> */}



const PasswordInput = ({
  label,
  type = 'text',
  id,
  value,
  onChange,
  error,
  className = '',
  handlePwView,
  ...props
}) => {
  return (
    <>
        <div className={`mb-4 `}>
          {label && (
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
          )}
          <div className={`mb-4 flex justify-between items-center border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${error ? 'border-red-500' : ''} px-2`}>
            <input
              type={type}
              id={id}
              value={value}
              onChange={onChange}
              className={`w-auto p-2 outline-0 border-0 flex-1`}
              {...props}
            />
            <div>
              {
                  type === 'password'
                  ? <button type='button' onClick={handlePwView}>
                      <FiEye size={20}/>
                  </button>
                  : <button type='button' onClick={handlePwView}>
                  <FiEyeOff size={20}/>
              </button>
              }
            </div>
          </div>
        </div>
        {/* {error && <p className="text-red-500 text-sm mt-2">{error}</p>} */}
    </>
  );
};

export default PasswordInput;