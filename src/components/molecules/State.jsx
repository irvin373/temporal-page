import Label from "../atoms/Label"
import TextInput from "../atoms/TextInput"

export default function State( { values, onChange, errors } ){
    return(
    <div className="">
      <Label htmlFor="State">State</Label>
        <TextInput
            id="State"
            name="State"
            value={values.state || ''}
            onChange={val => onChange('State', val)}
            required
            error={errors?.state}
          />
    </div>
  )
}