import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";
import { useState } from "react";

export default function EducationFields({ values={}, onChange }) {
    
    const [educationList, setEducationList] = useState(
        values.highestEducation ? 
        (Array.isArray(values.highestEducation) ? values.highestEducation : [values.highestEducation]) 
        : ['']
    );

    const handleEducationChange = (index, newValue) => {
        const updatedList = [...educationList];
        updatedList[index] = newValue;
        setEducationList(updatedList);
        onChange?.('highestEducation', updatedList);
    }

    const addEducationField = () => {
        setEducationList(prev => [...prev, '']);
    }

    return (
        <div className="education-fields">

            {educationList.map((education, index) => (
                <div className="education-entry" key={index}>
                    <Label htmlFor={`highestEducation-${index}`}>Highest Level of Education Achieved {index + 1}</Label>
                    <TextInput
                        id={`highestEducation-${index}`}
                        name="highestEducation[]"
                        value={education}
                        onChange={(e) => handleEducationChange(index, e.target.value)}
                    />
                </div>
            ))}
            <button type="button" onClick={addEducationField}>Add More</button>
        </div>
    )

}