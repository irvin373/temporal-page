import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default function CurrentJobTitle({ values, onChange }) {
  const fieldName = "currentJobTitle";

  return (
    <div className="current-job-title flex flex-col gap-1">
      <Label htmlFor={fieldName}>Current or most recent job title</Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        type="text"
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange?.(fieldName, val)}
        placeholder="Enter your job title"
      />
    </div>
  );
}
