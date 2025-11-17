import React, { useState, useRef } from 'react';
import BasicInfo from '../molecules/BasicInformation';
import ProfessionalProfile from '../molecules/ProfessionalProfile';
import EducationFields from '../organisms/EducationFields';
import JobInterests from '../molecules/JobInterests';
import Attachments from '../molecules/Attachments';
import Button from '../atoms/Button';
import { submitApplication } from '../api/submitApplication';

export default function FormJob() {
  const [form, setForm] = useState({});
  const resumeRef = useRef();

  const handleChange = (name, value) => setForm(s => ({ ...s, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k,v]) => fd.append(k, v));
    if (resumeRef.current?.files?.[0]) fd.append('resume', resumeRef.current.files[0]);
    await submitApplication(fd);
  };

  return (
    <form onSubmit={handleSubmit}>
      <BasicInfo onChange={handleChange} values={form} />
      <ProfessionalProfile onChange={handleChange} values={form} />
      <EducationFields />
      <JobInterests onChange={handleChange} values={form} />
      <Attachments resumeRef={resumeRef} />
      <Button type="submit">Submit Application</Button>
    </form>
  );
}