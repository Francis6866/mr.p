import React from 'react'

const ButtonGroup = ({
    children,
  type = 'button',
  variant = 'tetiary',
  size = 'sm',
  className = '',
  icon,
  start = false,
  ...props
}) => {

    const baseStyles = 'font-[500] rounded transition duration-300 flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-green-600 hover:bg-green-800 text-white',
        secondary: 'bg-blue-400 hover:bg-blue-600 text-white',
        tetiary: 'bg-blue-100 hover:bg-blue-300 text-black',
        outline: 'border border-[#FF9B00] text-black hover:bg-[#FF9B00] hover:text-black',
      };

      const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
      };

      const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  return (
    <div className={`${buttonStyles}`} {...props}>
        {
            start 
            ? <>
               {icon}
               <button>{children}</button>
              </>
            : <>
               <button>{children}</button>
               {icon}
              </>
        }
        
    </div>
  )
}

export default ButtonGroup