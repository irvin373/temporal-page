import Label from "../atoms/Label";
import TextArea from "../atoms/TextArea";

export default function ProfessionalSummary({ values, onChange }) {
  const fieldName = "professionalSummary";

  return (
    <div className="professional-summary flex flex-col gap-1">
      <Label htmlFor={fieldName}>
        Short professional summary (2-3 lines)
      </Label>
      <TextArea
        id={fieldName}
        name={fieldName}
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange(fieldName, val)}
        placeholder="Write a brief summary about your professional background"
      />
    </div>
  );
}
