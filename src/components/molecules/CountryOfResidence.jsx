import Label from "../atoms/Label"
import Select from "../atoms/Select"

export default function CountryOfResidence(){
  return(
    <div className="country-of-residence">
      <Label htmlFor={CountryOfResidence}>Country of residence</Label>
      <Select id={CountryOfResidence}/>
    </div>
  )
}