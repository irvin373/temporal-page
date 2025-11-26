import Label from "../atoms/Label"
import TextInput from "../atoms/TextInput"

export default function LinkedIn({ onChange, values }){
  const fieldName = "linkedIn"
  return(
    <div>
      <Label htmlFor={fieldName}>
          LinkedIn profile link    
      </Label>
      <TextInput 
        id={fieldName}
        name={fieldName}
        type="text"
        value={values[fieldName] || ""}
        onChange={(val) => onChange(fieldName, val)}
      />
    </div>
  )
}