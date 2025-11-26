import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default function SalaryExpectations({ values, onChange }) {
  const fieldName = "salaryExpectations";

  return (
    <div className="salary-expectations">
      <Label htmlFor={fieldName}>Salary Expectations</Label>
        <TextInput
        id={fieldName}
        name={fieldName}
        type="number"
        min="0"
        step="0.01"
        placeholder="e.g. 50000 or 50000.00"
        value={values[fieldName] || ""}
        onChange={(val) => onChange(fieldName, val)}
        />
    </div>
  );
}
