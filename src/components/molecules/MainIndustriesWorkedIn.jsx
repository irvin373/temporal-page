import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default function MainIndustriesWorkedIn({ values, onChange }) {
  const fieldName = "mainIndustriesWorkedIn";

  return (
    <div className="main-industries-worked-in flex flex-col gap-1">
      <Label htmlFor={fieldName}>
        Main industries worked in (e.g., construction, healthcare, hospitality, data centers, etc.)
      </Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange(fieldName, val)}
        placeholder="Enter industries you have worked in"
      />
    </div>
  );
}
