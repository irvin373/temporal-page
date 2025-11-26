import Label from "../atoms/Label";
import Select from "../atoms/Select";

export default function PreferredWorkArrangement( { values, onChange } ){
  const fieldName = 'preferredWorkArrangement';
  const options = [
    { value: 'onsite', label: 'onsite' },
    { value: 'hybrid', label: 'hybrid' },
    { value: 'remote', label: 'remote' }
  ];

  return(
    <div className="preferred-work-arrangement">
      <Label htmlFor={fieldName}>Preferred work arrangement (onsite, hybrid, remote)</Label>
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