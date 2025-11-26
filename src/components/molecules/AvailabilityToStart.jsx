import Label from "../atoms/Label";
import Select from "../atoms/Select";

export default function AvailabilityToStart({ values, onChange }) {
  const fieldName = "availabilityToStart";
  const options = [
    { value: "immediately", label: "Immediately" },
    { value: "1week", label: "In 1 week" },
    { value: "2weeks", label: "In 2 weeks" },
    { value: "1month", label: "In 1 month" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="availability-to-start">
      <Label htmlFor={fieldName}>Availability to start</Label>
      <Select
        id={fieldName}
        name={fieldName}
        value={values[fieldName] || ""}
        onChange={(val) => onChange(fieldName, val)}
        options={options}
      />
    </div>
  );
}
