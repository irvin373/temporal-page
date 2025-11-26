import Label from "../atoms/Label";
import Select from "../atoms/Select";

export default function DesiredPosition( { values, onChange } ){
  const fieldName = 'desiredPosition';
  const options = [
    { value: 'HSE Manager', label: 'HSE Manager' },
    { value: 'Coordinator', label: 'Coordinator' },
    { value: 'Supervisor', label: 'Supervisor' }
  ];

  return(
    <div className="desired-position">
      <Label htmlFor={fieldName}>Desired position (e.g., HSE Manager, Coordinator, Supervisor)</Label>
      <Select
        id={fieldName}
        name={fieldName}
        value={values[fieldName] || ''}
        onChange={(val) => onChange(fieldName, val)}
        options={options}
      />
    </div>
  )
}