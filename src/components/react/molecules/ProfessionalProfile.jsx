import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import TextArea from "../atoms/TextArea";

export default function ProfessionalProfile()  {
    return (
        <div className="professional-profile">

            <div className="current-job-title">
                <Label htmlFor="currentJobTitle">Current Job Title</Label>
                <TextInput 
                    id="totalYearsExperience"
                    name="totalYearsExperience"
                    type="number"
                    min="0"
                    value={values.totalYearsExperience ?? ''}
                    onChange={(e) => {
                        const v = e.target.value;
                        // si quieres guardar número en el estado:
                        onChange?.('totalYearsExperience', v === '' ? '' : Number(v));
                    }}
                />
            </div>
            
            <div className="total-years-experience">    
                <Label htmlFor="totalYearsExperience">Years Of Experience</Label>
                <TextInput
                    id="totalYearsExperience"
                    name="totalYearsExperience"
                    type="number"
                    min="0"
                    value={values.totalYearsExperience || ''}
                    onChange={(e) => onChange?.('totalYearsExperience', e.target.value)}
                />
            </div>

            <div className="main-industries-worked-in">
                <Label htmlFor="mainIndustriesWorkedIn">Worked In</Label>
                <TextInput
                    id="mainIndustriesWorkedIn"
                    name="mainIndustriesWorkedIn"
                    value={values.mainIndustriesWorkedIn || ''}
                    onChange={(e) => onChange?.('mainIndustriesWorkedIn', e.target.value)}
                />
            </div>

            <div className="professional-summary">
                <Label htmlFor="professionalSummary">Professional Summary</Label>
                <TextArea
                    id="professionalSummary"
                    name="professionalSummary"
                    value={values.professionalSummary || ''}
                    onChange={(e) => onChange?.('professionalSummary', e.target.value)}
                />
            </div>

        </div>
    )
}