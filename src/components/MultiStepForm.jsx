import React, { useState } from 'react'
import MultiHeader from './MultiHeader'
import TypeOfAccount from './TypeOfAccount'
import AboutYou from './AboutYou'

const MultiStepForm = () => {
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        country: "",
        accountType: "",
        businessName: "",
        firstName: "",
        lastName: "",
        email: "",
        businessIncorporation: "",
        registrationType: "",
        password: "",
        agreeTerms: false,
        agreePrivacy: false,
      })
    

      const validateStep = () => {
        const newErrors = {};
    
        if (step === 0) {
          if (!formData.country) newErrors.country = "Country is required.";
          if (!formData.accountType) newErrors.accountType = "Account type is required.";
        }
    
        if (step === 1) {
          if (!formData.firstName) newErrors.firstName = "First name is required.";
          if (!formData.lastName) newErrors.lastName = "Last name is required.";
          if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Valid email is required.";
          }
          if (!formData.businessName) newErrors.businessName = "Please enter business name.";
          if (!formData.businessIncorporation) newErrors.updabusinessIncorporationtes = "Please select business incorporation";
          if (!formData.registrationType) newErrors.registrationType = "Registration type is required.";
          if (!formData.password || formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
          }
          if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms.";
          if (!formData.agreePrivacy) newErrors.agreePrivacy = "You must agree to the privacy policy.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const nextStep = () => {
       if (validateStep()) setStep(1);
      };

      const prevStep = () => setStep(0);

      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep()) {
          console.log("Submitted Data:", formData, errors);
        }
      };

      // TODO: handle errors
      // radio button background color
      // checkbox size
      // icons to specify radio button
      // clean up and understand the code

  return (
    <div>
        <MultiHeader
        prevStep={prevStep}
        step={step}
         />
        <form
         className='py-20'
         onSubmit={handleSubmit}
        >
            <div className='flex justify-center items-center'>
                <div className='max-w-[660px] w-[90%]'>
                    {
                        step === 0 ? (
                            <TypeOfAccount
                             formData={formData}
                             onChange={handleChange} 
                             setStep={setStep}
                             nextStep={nextStep}
                           />
                        )
                        : (
                           <AboutYou
                             formData={formData}
                             onChange={handleChange}
                             step={step}
                             setStep={setStep}
                           /> 
                        )
                    }
                </div>
            </div>
        </form>
    </div>
  )
}

export default MultiStepForm