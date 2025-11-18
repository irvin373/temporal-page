// logic for handling the job application form
import { useFormState } from '../../../hooks/useFormState'; // custom hook for form state management
import { useFormValidation } from '../../../hooks/useFormValidation'; // custom hook for form validation
import React, { useRef } from 'react';
import { submitApplication } from '../../../api/submitApplication';


// components that make up the form structure
import BasicInfo from '../molecules/BasicInformation';
import ProfessionalProfile from '../molecules/ProfessionalProfile';
import EducationFields from '../organisms/EducationFields';
import JobInterests from '../molecules/JobInterests';
import Attachments from '../molecules/Attachments';
import Button from '../atoms/Button';

export default function FormJob() {
  const { formData, updateField, resetForm } = useFormState();
  const resumeInputRef = useRef();

  const validationSchema = {
    fullName: (val) => !val ? 'Full name is required' : null,
    emailAddress: (val) => /\S+@\S+\.\S+/.test(val) ? null : 'Invalid email',
    phoneNumber: (val) => /^\+?[0-9\s\-]+$/.test(val) ? null : 'Invalid phone number',
    city: (val) => !val ? 'City is required' : null,
    state: (val) => !val ? 'State is required' : null,
    country: (val) => !val ? 'Country is required' : null,
  };

  const { errors, isValid } = useFormValidation(formData, validationSchema);


  const handleFormSubmit = async (event/*React.FormEvent*/) => {
    event.preventDefault();

    const applicationPayload = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      applicationPayload.append(key, value);
    }

    const resumeFile = resumeInputRef.current?.files?.[0];
    if (resumeFile) {
      applicationPayload.append('resume', resumeFile);
    }

    await submitApplication(applicationPayload);
    resetForm(); // opcional: limpiar el formulario después de enviar
  };

  return (
    <section className="form">
      <form onSubmit={handleFormSubmit}>
        <BasicInfo onChange={updateField} values={formData} errors={errors}/>
        <ProfessionalProfile onChange={updateField} values={formData} />
        <EducationFields />
        <JobInterests onChange={updateField} values={formData} />
        <Attachments resumeRef={resumeInputRef} />
        <Button type="submit" disabled={!isValid}>Submit Application</Button>
      </form>
    </section>
  );
}
