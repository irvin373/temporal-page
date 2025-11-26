import Label from "../atoms/Label"
import TextInput from "../atoms/TextInput"

import { getInputClassName } from "../../utils/classNames" 
import { useFieldValidation } from "../../hooks/useFieldValidation" 

export default function EmailAddress( {values, onChange, errors, touched, setTouched} ){
  const fieldName = "EmailAddress";
  const {value, hasError, wasTouched, isValid, errorMessage} = useFieldValidation({
    fieldName,
    values,
    errors,
    touched,
  });

  const inputClassName = getInputClassName({ isValid, hasError, wasTouched });
  
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={fieldName} required>Email</Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={val => {
          onChange(fieldName, val);
          if (!wasTouched) {
            setTouched(prev => ({ ...prev, [fieldName]: true }));
          }
        }}
        onBlur={() => setTouched(prev => ({ ...prev, [fieldName]: true }))}
        placeholder="Enter your Email"
        className={inputClassName}
      />
      {wasTouched && hasError && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}