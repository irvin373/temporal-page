import Label from "../atoms/Label";
import FileInput from "../atoms/FileInput";

export default function ResumeUpload({ onChange }) {
  const fieldName = "uploadResume";

  return (
    <div className="resume-upload">
      <Label htmlFor={fieldName} required>
        Updated resume (PDF or Word)
      </Label>
      <FileInput
        id={fieldName}
        name={fieldName}
        accept=".pdf,.doc,.docx"
        onChange={(file) => onChange(fieldName, file)}
      />
    </div>
  );
}
