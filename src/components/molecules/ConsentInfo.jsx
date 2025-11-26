import Label from "../atoms/Label";
import CheckBoxInput from "../atoms/CheckBox";

export default function ConsentInfo({
  values,
  onChange,
}) {
  const fieldName = "consentInfo";

  return (
    <div className="flex items-center gap-2">
      <CheckBoxInput
        id={fieldName}
        name={fieldName}
        checked={values[fieldName] || false}
        onChange={val => onChange(fieldName, val)}
      />
      <Label htmlFor={fieldName} required>
        I agree to the collection and processing of my personal data for employment purposes.
      </Label>
    </div>
  );
}