import Label from "../atoms/Label";
import Textarea from "../atoms/TextArea";

export default function CoverLetter({ values, onChange }) {
  const fieldName = "coverLetter";

  return (
    <div className="cover-letter">
      <Label htmlFor={fieldName}>
        Cover letter (optional)
      </Label>
      <Textarea
        id={fieldName}
        name={fieldName}
        placeholder="Write your cover letter here..."
        value={values[fieldName] || ""}
        onChange={(val) => onChange(fieldName, val)}
      />
    </div>
  );
}
