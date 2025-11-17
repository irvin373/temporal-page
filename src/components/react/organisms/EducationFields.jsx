//                 <!-- Education -->
//                 <div class="Education">
//                     <div id="educationFields">
//                         <div>
//                             <label for="highestEducation">Highest Level of Education Achieved</label>
//                             <input type="text" id="highestEducation" name="highestEducation[]" required>
//                         </div>

//                         <div>
//                             <label for="certification">Relevant Certifications</label>
//                             <input type="text" id="certification" name="certification[]">
//                         </div>
//                     </div>
//                     <button type="button" onclick="addEducationField()">Add More</button>
//                 </div>

// <script type="module">
// function addEducationField() {
//     const container = document.getElementById('educationFields');
//     if (!container) {
//         console.error('Education fields container not found');
//         return;
//     }
//     const newField = document.createElement('div');
//     newField.innerHTML = `
//         <label>Additional Education/Certification</label>
//         <input type="text" name="additionalEducation[]" required>
//     `;
//     container.appendChild(newField);
// }
// </script>
// //este script es un ejemplo de como agregar mas campos de educacion/certificaciones si se desea pero no esta probado, y requiere mas implementaciones para el correcto manejo del dom.
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