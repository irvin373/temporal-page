import HighestEducationLevel from "../molecules/HighestEducationLevel";
import Certifications from "../molecules/Certifications";
import TechnicalCompetencies from "../molecules/TechnicalCompetencies";
import LanguageSkills from "../molecules/LanguageSkills";

export default function EducationFields({ values, onChange }) {
  return (
    <section className="education-fields grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 w-full max-w-full">
      <span className="text-bold col-span-2">Education & Skills</span>

      <HighestEducationLevel values={values} onChange={onChange} />
      <Certifications values={values} onChange={onChange} />
      <TechnicalCompetencies values={values} onChange={onChange} />
      <LanguageSkills values={values} onChange={onChange} /> {/*needs refactoring but working*/}
    </section>
  );
}
