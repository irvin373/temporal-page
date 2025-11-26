import Label from "../atoms/Label";
import CheckBoxInput from "../atoms/CheckBox";

export default function WillingnessRelocateTravel({
  values,
  onChange,
}) {
  const fieldName = "willingnessRelocateTravel";

  return (
    <div className="flex items-center gap-2">
      <CheckBoxInput
        id={fieldName}
        name={fieldName}
        checked={values[fieldName] || false}
        onChange={val => onChange(fieldName, val)}
      />
      <Label htmlFor={fieldName}>
        Willingness to relocate or travel?
      </Label>
    </div>
  );
}
