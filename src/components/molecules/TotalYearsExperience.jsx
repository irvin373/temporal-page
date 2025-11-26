import Label from "../atoms/Label";
import Select from "../atoms/Select";
import { getInputClassName } from "../../utils/classNames";
import { useFieldValidation } from "../../hooks/useFieldValidation";

export default function TotalYearsExperienceSelect({ values, onChange, errors, touched, setTouched }) {
  const fieldName = "totalYearsExperience";
  const { value, isValid, hasError, wasTouched, errorMessage } = useFieldValidation({
    fieldName,
    values,
    errors,
    touched,
  });

  const inputClassName = getInputClassName({ isValid, hasError, wasTouched });

  const options = [
    { value: "0-2", label: "0 - 2 years" },
    { value: "2-4", label: "2 - 4 years" },
    { value: "4+", label: "4 years or more" },
  ];

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={fieldName} required>Total years of experience</Label>
      <Select
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={(val) => {
          onChange(fieldName, val);
          if (!wasTouched) {
            setTouched(prev => ({ ...prev, [fieldName]: true }));
          }
        }}
        onBlur={() => setTouched(prev => ({ ...prev, [fieldName]: true }))}
        options={options}
        required
        className={inputClassName}
      />
      {wasTouched && hasError && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}
