import { useMemo } from "react";

type UseFieldValidationProps = {
  fieldName: string;
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
};

export function useFieldValidation({
  fieldName,
  values,
  errors,
  touched,
}: UseFieldValidationProps) {
  return useMemo(() => {
    const value = values[fieldName] ?? "";
    const hasError = !!errors?.[fieldName];
    const wasTouched = !!touched?.[fieldName];
    const isValid = wasTouched && !hasError && value !== "";

    return { value, hasError, wasTouched, isValid, errorMessage: errors[fieldName] };
  }, [fieldName, values, errors, touched]);
}
