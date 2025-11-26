import { useEffect, useState } from 'react';

type FormData = Record<string, any>;
type ValidationRule = (value: any) => string | null;
type ValidationSchema = Record<string, ValidationRule>;
type ValidationResult = {
  errors: Record<string, string>;
  isValid: boolean;
};

export function useFormValidation(formData: FormData, schema: ValidationSchema): ValidationResult {
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const newErrors: Record<string, string> = {};

    for (const field in schema) {
      const rule = schema[field];
      const error = rule(formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
  }, [formData, schema]);

  const isValid = Object.keys(errors).length === 0;
  return { errors, isValid };
}

