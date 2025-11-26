import Label from "../atoms/Label";
import Select from "../atoms/Select";
import Button from "../atoms/Button";

export default function LanguageSkills({ values, onChange }) {
  const fieldName = "languageSkills";
  const skills = values[fieldName] && values[fieldName].length > 0 ? values[fieldName] : [{ language: "", proficiency: "" }];

  const languageOptions = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Spanish" },
    { value: "french", label: "French" },
    { value: "italian", label: "Italian" },
    { value: "german", label: "German" },
    { value: "other", label: "Other" },
  ];

  const proficiencyOptions = [
    { value: "basic", label: "Basic" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "native", label: "Native / Fluent" },
  ];

  const handleAddLanguage = () => {
    const newSkills = [...skills, { language: "", proficiency: "" }];
    onChange(fieldName, newSkills);
  };

  const handleChange = (index, key, value) => {
    const newSkills = skills.map((s, i) =>
      i === index ? { ...s, [key]: value } : s
    );
    onChange(fieldName, newSkills);
  };

  const handleRemoveLanguage = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    onChange(fieldName, newSkills.length > 0 ? newSkills : [{ language: "", proficiency: "" }]);
  };

  return (
    <div className="language-skills flex flex-col gap-4 col-span-2">
      <Label htmlFor={fieldName}>Languages and proficiency levels</Label>

      {skills.map((skill, index) => (
        <div key={index} className="flex gap-4 items-center">
          <div className="flex-1">
            <Select
              id={`${fieldName}-language-${index}`}
              name={`${fieldName}-language-${index}`}
              value={skill.language}
              onChange={(val) => handleChange(index, "language", val)}
              options={languageOptions}
              placeholder="Select language"
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <Select
              id={`${fieldName}-proficiency-${index}`}
              name={`${fieldName}-proficiency-${index}`}
              value={skill.proficiency}
              onChange={(val) => handleChange(index, "proficiency", val)}
              options={proficiencyOptions}
              placeholder="Select proficiency"
              className="w-full"
            />
          </div>
          {skills.length > 1 && (
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleRemoveLanguage(index)}
            >
              ❌
            </Button>
          )}
        </div>
      ))}

      <Button type="button" className="w-fit self-start" variant="primary" onClick={handleAddLanguage}>
        + Add language
      </Button>
    </div>
  );
}
