import React, { useState } from 'react';
import Stepper from './Stepper';
import Step1BasicInfo from './steps/Step1BasicInfo';
import Step2Professional from './steps/Step2Professional';
import Step3Education from './steps/Step3Education';
import Step4JobInterests from './steps/Step4JobInterests';
import Step5Attachments from './steps/Step5Attachments';

export default function ApplyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [formData, setFormData] = useState({
    languages: [{ language: '', proficiency: '' }]
  });

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Validate form based on HTML required fields if needed
    // Assuming button handles form submission for native validation
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    alert("Application submitted successfully!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2Professional formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3Education formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4JobInterests formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step5Attachments formData={formData} updateFormData={updateFormData} />;
      default:
        return <Step1BasicInfo formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          Apply Now
        </h1>
        <p className="text-lg sm:text-xl text-gray-500 text-center mb-10">
          Ready to join our team? Submit your application and we'll get back to you soon.
        </p>

        <Stepper currentStep={currentStep} totalSteps={totalSteps} />

        <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-10 mb-8 max-w-3xl mx-auto min-h-[400px]">
            {renderStep()}
          </div>

          <div className="max-w-3xl mx-auto flex items-center mb-8">
            <div className={`w-full flex ${currentStep > 1 ? 'justify-between' : 'justify-center'} items-center`}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>
              )}

              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                {currentStep === totalSteps ? 'Submit' : 'Next'}
                {currentStep !== totalSteps && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>

        <p className="text-sm text-gray-500 text-center max-w-lg mx-auto leading-relaxed">
          * Required fields. Applications are reviewed on a rolling basis. <br />
          We will contact qualified candidates within 2 weeks.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}} />
    </div>
  );
}
