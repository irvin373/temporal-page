import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default function Certifications({ values, onChange }) {
  const fieldName = "certifications";

  return (
    <div className="certifications flex flex-col gap-1 col-span-2">
      <Label htmlFor={fieldName}>
        Relevant certifications (e.g., OSHA, PMP, ISO, NEBOSH)
      </Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange(fieldName, val)}
        placeholder="List your safety certifications (CSP, CHST, PMP, ISO, NEBOSH, OSHT, OSHA 30/10, etc.)"
      />
    </div>
  );
}
