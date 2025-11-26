import { StrictMode } from "react";
import { useState } from "react";
import { useFormState } from "../../hooks/useFormState";
import { useFormValidation } from "../../hooks/useFormValidation";
import { validationSchema } from "../../utils/validationSchema";

import BasicInformation from "../organisms/BasicInformation";
import ProfessionalProfile from "../organisms/ProfessionalProfile";
import EducationFields from "./EducationFields";
import JobInterests from "./JobInterests";
import Attachments from "./Attachments";

export function Apply() {
  const { formData, updateField, resetForm } = useFormState({
    FullName: "",
    EmailAddress: "",
    PhoneNumber: "",
    currentJobTitle: "",
    totalYearsExperience: "",
    mainIndustriesWorkedIn: "",
    professionalSummary: "",
  });

  const footerSpanColor = "#4B5666";
  const footerSpanStyle = { color: footerSpanColor };

  const [touched, setTouched] = useState({});
  const [step, setStep] = useState(1);

  const stepSchemas = {
    1: {
      FullName: validationSchema.FullName,
      EmailAddress: validationSchema.EmailAddress,
      PhoneNumber: validationSchema.PhoneNumber,
    },
    2: {
      totalYearsExperience: validationSchema.totalYearsExperience,
    },
  };

  // Usamos el esquema del paso actual
  const { errors, isValid } = useFormValidation(formData, stepSchemas[step] || {});

  function renderStep() {
    switch (step) {
      case 1: return (<BasicInformation     onChange={updateField} values={formData} touched={touched} setTouched={setTouched} errors={errors}/>);
      case 2: return (<ProfessionalProfile  onChange={updateField} values={formData} touched={touched} setTouched={setTouched} errors={errors} />);
      case 3: return (<EducationFields      onChange={updateField} values={formData}/>);
      case 4: return (<JobInterests         onChange={updateField} values={formData}/>);
      case 5: return (<Attachments          onChange={updateField} values={formData}/>);
      default:
        return null;
    }
  }

  function handleNext() {
    if (step < 5) setStep(step + 1);
  }
  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <StrictMode>
      <form className="apply flex flex-col items-center justify-center min-h-screen bg-white gap-y-[30px]">
        <header className="text-center space-y-2">
          <h2 className="apply__title text-[42px] text-3xl font-bold text-gray-800 mb-2">
            Apply Now
          </h2>
          <span className="apply__title-text text-[24px] text-lg text-gray-600">
            Ready to join our team? Submit your application and we'll get back to you soon.
          </span>
        </header>

        <div className="apply__steps flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`w-8 h-8 flex items-center justify-center rounded-full font-medium ${
                step === n ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
              }`}
            >
              {n}
            </span>
          ))}
        </div>

        <section className="carousel shadow-md rounded-lg px-8 py-10 w-full max-w-[1095px] space-y-6">
          <header>
            <span className="carousel component px-2 text-[#1E63F8] bg-[#CBDCFF] rounded-md">
              {`STEP ${step} OF 5`}
            </span>
          </header>

          <div className="carousel">{renderStep()}</div>
        </section>

        <div className="margin-reference-for-buttons flex flex-col gap-y-[30px] items-center">
          <div className="buttonsCarousel w-full flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className="w-[180px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              &lt; Back
            </button>
            <button
              type={step >= 5 ? "submit" : "button"}
              disabled={!isValid}
              onClick={handleNext}
              className="w-[180px] px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {step === 5 ? "Submit" : "Next >"}
            </button>
          </div>

          <footer className="apply__footer flex flex-col items-center">
            <span style={footerSpanStyle} className="apply__footer-text text-[21.26px]">
              * Required fields. Applications are reviewed on a rolling basis.
            </span>
            <span style={footerSpanStyle} className="apply__footer-text text-[21.26px]">
              We will contact qualified candidates within 2 weeks.
            </span>
          </footer>
        </div>
      </form>
    </StrictMode>
  );
}
