import Label from "../atoms/Label"
import TextInput from "../atoms/TextInput"

export default function City( { values, onChange, errors } ){
  return(
    <div className="">
      <Label htmlFor="city">City</Label>
      <TextInput
      id="city"
      name="city"
      value={values.state || ''}
      onChange={val => onChange('city', val)}
      required
      error={errors?.state}
      />
    </div>
  )
}