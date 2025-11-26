import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

export default function TechnicalCompetencies({ values, onChange }) {
  const fieldName = "technicalCompetencies";

  return (
    <div className="technical-competencies flex flex-col gap-1 col-span-2">
      <Label htmlFor={fieldName}>
        Technical competencies (e.g., safety programs, risk assessments, compliance, training)
      </Label>
      <TextInput
        id={fieldName}
        name={fieldName}
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange(fieldName, val)}
        placeholder="List your technical skills, e.g. safety programs, risk assessments, compliance, training"
      />
    </div>
  );
}
