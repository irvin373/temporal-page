import Label from "../atoms/Label";
import Select from "../atoms/Select";

export default function HighestEducationLevel({ values, onChange }) {
  const fieldName = "highestEducationLevel";

  const options = [
    { value: "associate", label: "Associate degree" },
    { value: "bachelor", label: "Bachelor's degree" },
    { value: "master", label: "Master's degree" },
    { value: "doctorate", label: "Doctorate / Ph.D" },
    { value: "technical", label: "Technical Certification" },
  ];


  return (
    <div className="highest-education-level flex flex-col gap-1 col-span-2">
      <Label htmlFor={fieldName}>Highest level of education achieved</Label>
      <Select
        id={fieldName}
        name={fieldName}
        value={values[fieldName] ?? ""}
        onChange={(val) => onChange(fieldName, val)}
        options={options}
        placeholder="Select your education level"
      />
    </div>
  );
}
