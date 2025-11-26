import { useState } from 'react';

type FormData = Record<string, any>;

type UseFormStateReturn = {
  formData: FormData;
  updateField: (fieldName: string, value: any) => void;
  resetForm: () => void;
};

export function useFormState(initialState: FormData = {}): UseFormStateReturn {
  const [formData, setFormData] = useState<FormData>(initialState);

  const updateField = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    updateField,
    resetForm,
  };
}