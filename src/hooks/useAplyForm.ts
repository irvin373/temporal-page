import { useState } from "react";
import { submitApplication } from "../service/applicationService";

const TOTAL_STEPS = 5;

export function useApplyForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({
    languages: [{ language: "", proficiency: "" }],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (newData: Record<string, any>) => {
    setFormData(newData);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitApplication(formData);
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    updateFormData,
    handleNext,
    handleBack,
    handleSubmit,
    isSubmitting,
    submitError,
    isSubmitted,
  };
}
